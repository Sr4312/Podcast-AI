// @ts-check
/**
 * Calcula ~400 picos del audio de un episodio y los guarda en src/data/peaks/{slug}.json.
 * Es la waveform real que usa la home, el archivo, el reproductor, las OG y el kit de redes.
 *
 * Uso:
 *   npm run peaks -- 001-puede-una-ia-asesorar-a-un-senador
 *   npm run peaks -- --todos
 *
 * Lee `audio.url` del frontmatter: si empieza con "/" busca en public/, si no, ffmpeg
 * descarga la URL directamente. Requiere ffmpeg en el PATH.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const N_PICOS = 400;
const SAMPLE_RATE = 8000;
const DIR_EPISODIOS = path.resolve('src/content/episodios');
const DIR_PEAKS = path.resolve('src/data/peaks');

function leerFrontmatter(slug) {
  for (const ext of ['md', 'mdx']) {
    const ruta = path.join(DIR_EPISODIOS, `${slug}.${ext}`);
    if (!fs.existsSync(ruta)) continue;
    const raw = fs.readFileSync(ruta, 'utf8');
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!m) throw new Error(`Sin frontmatter: ${ruta}`);
    return parseYaml(m[1]);
  }
  throw new Error(`No existe el episodio "${slug}" en src/content/episodios`);
}

function decodificar(fuente) {
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-v', 'error', '-nostdin',
      '-i', fuente,
      '-vn', '-ac', '1', '-ar', String(SAMPLE_RATE),
      '-f', 's16le', '-acodec', 'pcm_s16le', 'pipe:1',
    ]);
    /** @type {Buffer[]} */
    const trozos = [];
    let err = '';
    ff.stdout.on('data', (d) => trozos.push(d));
    ff.stderr.on('data', (d) => (err += d));
    ff.on('error', reject);
    ff.on('close', (code) => {
      if (code !== 0) return reject(new Error(`ffmpeg salió con ${code}: ${err}`));
      resolve(Buffer.concat(trozos));
    });
  });
}

/** @param {Buffer} pcm */
function calcularPicos(pcm) {
  const muestras = new Int16Array(pcm.buffer, pcm.byteOffset, Math.floor(pcm.byteLength / 2));
  const total = muestras.length;
  const porBucket = total / N_PICOS;
  /** @type {number[]} */
  const picos = [];
  for (let i = 0; i < N_PICOS; i++) {
    const ini = Math.floor(i * porBucket);
    const fin = Math.min(total, Math.floor((i + 1) * porBucket));
    let suma = 0;
    let max = 0;
    for (let j = ini; j < fin; j++) {
      const v = Math.abs(muestras[j]) / 32768;
      suma += v * v;
      if (v > max) max = v;
    }
    const rms = fin > ini ? Math.sqrt(suma / (fin - ini)) : 0;
    // Mezcla RMS (cuerpo) y pico (detalle): se lee mejor que cualquiera de los dos solo.
    picos.push(0.7 * rms + 0.3 * max);
  }
  const maximo = Math.max(...picos, 1e-6);
  return {
    picos: picos.map((p) => Number((p / maximo).toFixed(3))),
    duracion: Number((total / SAMPLE_RATE).toFixed(2)),
  };
}

async function procesar(slug) {
  const fm = leerFrontmatter(slug);
  const url = fm?.audio?.url;
  if (!url) throw new Error(`"${slug}" no tiene audio.url en el frontmatter`);
  const fuente = url.startsWith('/') ? path.resolve('public', url.slice(1)) : url;
  if (url.startsWith('/') && !fs.existsSync(fuente)) {
    throw new Error(`No existe ${fuente}. Si es contenido de ejemplo, corré: npm run audio:ejemplo`);
  }
  process.stdout.write(`→ ${slug} … `);
  const pcm = await decodificar(fuente);
  const { picos, duracion } = calcularPicos(pcm);
  fs.mkdirSync(DIR_PEAKS, { recursive: true });
  const salida = path.join(DIR_PEAKS, `${slug}.json`);
  fs.writeFileSync(
    salida,
    JSON.stringify({ slug, version: 1, n: N_PICOS, duracion, picos }),
  );
  console.log(`✓ ${N_PICOS} picos, ${duracion}s → ${path.relative(process.cwd(), salida)}`);
}

const args = process.argv.slice(2).filter((a) => a !== '--');
if (args.length === 0) {
  console.error('Uso: npm run peaks -- <slug> | --todos');
  process.exit(1);
}
const slugs = args.includes('--todos')
  ? fs.readdirSync(DIR_EPISODIOS).filter((f) => /\.mdx?$/.test(f)).map((f) => f.replace(/\.mdx?$/, ''))
  : args;

let fallos = 0;
for (const slug of slugs) {
  try {
    await procesar(slug);
  } catch (e) {
    fallos++;
    console.error(`\n✗ ${slug}: ${e instanceof Error ? e.message : e}`);
  }
}
process.exit(fallos ? 1 : 0);
