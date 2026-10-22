// @ts-check
/**
 * Crea el archivo de un episodio nuevo desde la plantilla, con estado: borrador.
 *
 * Uso interactivo:   npm run nuevo-episodio
 * Sin preguntas:     npm run nuevo-episodio -- --numero 4 --titulo "El título del episodio"
 *
 * El slug sale del número (3 dígitos) y del título (minúsculas, sin acentos, máx. 6 palabras).
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const DIR = path.resolve('src/content/episodios');
const PLANTILLA = path.resolve('plantillas/episodio.md');

function slugify(texto, maxPalabras = 6) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0)
    .slice(0, maxPalabras)
    .join('-');
}

function leerArg(nombre) {
  const i = process.argv.indexOf(`--${nombre}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function proximoNumero() {
  if (!fs.existsSync(DIR)) return 1;
  const nums = fs
    .readdirSync(DIR)
    .map((f) => /^(\d{3})-/.exec(f)?.[1])
    .filter(Boolean)
    .map(Number);
  return nums.length ? Math.max(...nums) + 1 : 1;
}

async function preguntar(rl, texto, porDefecto) {
  const r = (await rl.question(porDefecto !== undefined ? `${texto} [${porDefecto}]: ` : `${texto}: `)).trim();
  return r || porDefecto;
}

async function main() {
  let numero = leerArg('numero');
  let titulo = leerArg('titulo');
  let temporada = leerArg('temporada');

  if (!numero || !titulo) {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    numero = numero ?? (await preguntar(rl, 'Número de episodio', String(proximoNumero())));
    titulo = titulo ?? (await preguntar(rl, 'Título'));
    temporada = temporada ?? (await preguntar(rl, 'Temporada', '1'));
    rl.close();
  }

  const n = Number(numero);
  if (!Number.isInteger(n) || n <= 0) throw new Error(`Número inválido: "${numero}"`);
  if (!titulo || titulo.length < 5) throw new Error('El título necesita al menos 5 caracteres');

  const slug = `${String(n).padStart(3, '0')}-${slugify(titulo)}`;
  const destino = path.join(DIR, `${slug}.md`);
  if (fs.existsSync(destino)) throw new Error(`Ya existe ${path.relative(process.cwd(), destino)}`);
  const repetido = fs.readdirSync(DIR).find((f) => f.startsWith(`${String(n).padStart(3, '0')}-`));
  if (repetido) throw new Error(`Ya hay un episodio con el número ${n}: ${repetido}`);

  const hoy = new Date().toISOString().slice(0, 10);
  const plantilla = fs.readFileSync(PLANTILLA, 'utf8');
  const contenido = plantilla
    .replaceAll('{{numero}}', String(n))
    .replaceAll('{{temporada}}', String(temporada ?? 1))
    .replaceAll('{{titulo}}', titulo.replace(/"/g, '\\"'))
    .replaceAll('{{fecha}}', hoy)
    .replaceAll('{{slug}}', slug);

  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(destino, contenido);
  console.log(`✓ Creado ${path.relative(process.cwd(), destino)} (estado: borrador)`);
  console.log('\nPróximos pasos:');
  console.log(`  1. Completá bajada, fecha, duración, formato, ejes, temas, invitados, audio y plataformas.`);
  console.log(`  2. npm run importar-transcripcion -- archivo.vtt ${slug}`);
  console.log(`  3. npm run peaks -- ${slug}`);
  console.log(`  4. Resumen, capítulos, fuentes y bloque ia (podés pedírselo al skill nuevo-episodio).`);
  console.log(`  5. npm run check:contenido · cambiá estado a "publicado" · npm run build`);
}

main().catch((e) => {
  console.error(`✗ ${e.message}`);
  process.exit(1);
});
