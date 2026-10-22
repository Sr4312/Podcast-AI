// @ts-check
/**
 * Convierte una transcripción (VTT, SRT o JSON de Whisper/WhisperX/AssemblyAI) en
 * párrafos `[hh:mm:ss] **Orador:** texto`, los agrupa bajo los capítulos del
 * frontmatter (## Título) y reemplaza el cuerpo del episodio.
 *
 * Uso: npm run importar-transcripcion -- archivo.vtt 004-slug-del-episodio [--oradores "A=Lucía Ferreyra,B=Invitada"]
 *
 * Reglas de armado:
 *   - une segmentos consecutivos del mismo orador si la pausa es < 1,5 s y el párrafo
 *     no supera ~90 palabras; corta siempre cuando cambia el orador
 *   - saca muletillas evidentes al inicio de frase (eh, ehh, em, mmm, este…) y repeticiones
 *     inmediatas de una palabra ("que que")
 *   - mantiene puntuación y mayúsculas; no "mejora" el texto: eso lo hace una persona
 *   - si el archivo no trae oradores, usa "Orador" y queda para corregir a mano
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const PAUSA_MAX = 1.5;
const PALABRAS_MAX = 90;

const [archivo, slug, ...resto] = process.argv.slice(2).filter((a) => a !== '--');
if (!archivo || !slug) {
  console.error('Uso: npm run importar-transcripcion -- archivo.(vtt|srt|json) slug [--oradores "A=Nombre,B=Nombre"]');
  process.exit(1);
}
const mapaOradores = new Map();
const iOr = resto.indexOf('--oradores');
if (iOr >= 0 && resto[iOr + 1]) {
  for (const par of resto[iOr + 1].split(',')) {
    const [k, v] = par.split('=').map((s) => s.trim());
    if (k && v) mapaOradores.set(k.toLowerCase(), v);
  }
}

const rutaEp = ['md', 'mdx'].map((e) => path.resolve('src/content/episodios', `${slug}.${e}`)).find((p) => fs.existsSync(p));
if (!rutaEp) {
  console.error(`✗ No existe el episodio "${slug}" en src/content/episodios`);
  process.exit(1);
}

/* ---------- Lectura ---------- */

function aSeg(t) {
  // 00:01:02.345 | 01:02.345 | 00:01:02,345 | 62.3
  const s = String(t).trim().replace(',', '.');
  if (/^\d+(\.\d+)?$/.test(s)) return Number(s);
  const partes = s.split(':').map(Number);
  if (partes.some(Number.isNaN)) return NaN;
  return partes.reduce((acc, v) => acc * 60 + v, 0);
}

/** @returns {{inicio:number, fin:number, orador:string, texto:string}[]} */
function leerVttSrt(src) {
  const bloques = src.replace(/\r/g, '').replace(/^WEBVTT[^\n]*\n(?:[^\n]*\n)*?\n/, '').split(/\n\s*\n/);
  const segs = [];
  for (const b of bloques) {
    const lineas = b.split('\n').filter((l) => l.trim() !== '');
    const iT = lineas.findIndex((l) => l.includes('-->'));
    if (iT < 0) continue;
    const [a, z] = lineas[iT].split('-->').map((x) => x.trim().split(' ')[0]);
    let texto = lineas.slice(iT + 1).join(' ').trim();
    if (!texto || /^NOTE\b/.test(lineas[0])) continue;
    let orador = '';
    const v = /^<v\s+([^>]+)>/.exec(texto);
    if (v) {
      orador = v[1].trim();
      texto = texto.replace(/^<v\s+[^>]+>/, '').replace(/<\/v>/g, '');
    } else {
      const m = /^([A-ZÁÉÍÓÚÑ][\w .áéíóúñ-]{1,40}):\s+/.exec(texto);
      if (m) {
        orador = m[1].trim();
        texto = texto.slice(m[0].length);
      }
    }
    texto = texto.replace(/<[^>]+>/g, '').trim();
    segs.push({ inicio: aSeg(a), fin: aSeg(z), orador, texto });
  }
  return segs;
}

function leerJson(src) {
  const datos = JSON.parse(src);
  const lista = Array.isArray(datos) ? datos : datos.segments ?? datos.utterances ?? datos.results ?? [];
  return lista
    .map((s) => ({
      inicio: Number(s.start ?? s.inicio ?? (s.offset ?? 0) / 1000),
      fin: Number(s.end ?? s.fin ?? ((s.offset ?? 0) + (s.duration ?? 0)) / 1000),
      orador: String(s.speaker ?? s.orador ?? s.speaker_label ?? ''),
      texto: String(s.text ?? s.texto ?? '').trim(),
    }))
    .filter((s) => s.texto);
}

const src = fs.readFileSync(path.resolve(archivo), 'utf8');
const ext = path.extname(archivo).toLowerCase();
let segmentos = ext === '.json' ? leerJson(src) : leerVttSrt(src);
segmentos = segmentos.filter((s) => Number.isFinite(s.inicio)).sort((a, b) => a.inicio - b.inicio);
if (segmentos.length === 0) {
  console.error('✗ No se encontraron segmentos con tiempo y texto');
  process.exit(1);
}

/* ---------- Limpieza ---------- */

const MULETILLAS = /^(?:(?:eh+|em+|mm+|hm+|ah+|este|bueno|o sea|digamos)[,.…]*\s+)+/i;

function limpiar(texto) {
  let t = texto.replace(/\s+/g, ' ').trim();
  t = t.replace(MULETILLAS, '');
  // Muletillas también al inicio de una oración interna: "…la invitación. Este, el trámite" → "…la invitación. El trámite"
  t = t.replace(/([.!?…]\s+)(?:(?:eh+|em+|mm+|hm+|este|bueno)[,.…]*\s+)+(\p{L})/giu, (_, sep, letra) => sep + letra.toUpperCase());
  t = t.replace(/\b(\p{L}+)(\s+\1\b)+/giu, '$1'); // "que que" → "que"
  t = t.replace(/\s+([,.;:!?])/g, '$1');
  if (t && /^\p{Ll}/u.test(t)) t = t[0].toUpperCase() + t.slice(1);
  return t;
}

function nombreOrador(crudo) {
  const k = crudo.trim().toLowerCase();
  if (!k) return 'Orador';
  if (mapaOradores.has(k)) return mapaOradores.get(k);
  const m = /^(?:speaker|spk|hablante|orador)[\s_-]*([a-z0-9]+)$/i.exec(crudo.trim());
  if (m) return mapaOradores.get(m[1].toLowerCase()) ?? `Orador ${m[1].toUpperCase()}`;
  return crudo.trim();
}

/* ---------- Agrupado en párrafos ---------- */

const parrafos = [];
for (const s of segmentos) {
  const texto = limpiar(s.texto);
  if (!texto) continue;
  const orador = nombreOrador(s.orador);
  const ultimo = parrafos[parrafos.length - 1];
  const mismoOrador = ultimo && ultimo.orador === orador;
  const pausaCorta = ultimo && s.inicio - ultimo.fin < PAUSA_MAX;
  const cabe = ultimo && ultimo.texto.split(/\s+/).length + texto.split(/\s+/).length <= PALABRAS_MAX;
  if (mismoOrador && pausaCorta && cabe) {
    ultimo.texto += (/[.!?…]$/.test(ultimo.texto) ? ' ' : ' ') + texto;
    ultimo.fin = s.fin;
  } else {
    parrafos.push({ inicio: s.inicio, fin: s.fin, orador, texto });
  }
}

/* ---------- Capítulos del frontmatter ---------- */

const raw = fs.readFileSync(rutaEp, 'utf8');
const m = /^(---\r?\n[\s\S]*?\r?\n---\r?\n?)([\s\S]*)$/.exec(raw);
if (!m) {
  console.error('✗ El episodio no tiene frontmatter');
  process.exit(1);
}
const frontmatter = m[1];
const fm = parseYaml(frontmatter.replace(/^---\r?\n/, '').replace(/\r?\n---\r?\n?$/, ''));
const capitulos = (fm.capitulos ?? []).map((c) => ({ t: aSeg(c.t), titulo: c.titulo })).sort((a, b) => a.t - b.t);

function hms(seg) {
  const s = Math.max(0, Math.floor(seg));
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0')).join(':');
}

const lineas = [];
let iCap = 0;
if (capitulos.length === 0) lineas.push('## Transcripción', '');
for (const p of parrafos) {
  while (iCap < capitulos.length && capitulos[iCap].t <= p.inicio) {
    lineas.push(`## ${capitulos[iCap].titulo}`, '');
    iCap++;
  }
  lineas.push(`[${hms(p.inicio)}] **${p.orador}:** ${p.texto}`, '');
}
while (iCap < capitulos.length) {
  lineas.push(`## ${capitulos[iCap].titulo}`, '');
  iCap++;
}

const yaHabia = m[2].trim().length > 0 && !/^<!--[\s\S]*-->\s*$/.test(m[2].trim());
if (yaHabia && !resto.includes('--forzar')) {
  console.error('✗ El episodio ya tiene transcripción. Usá --forzar para reemplazarla.');
  process.exit(1);
}

fs.writeFileSync(rutaEp, frontmatter.replace(/\r?\n?$/, '\n') + '\n' + lineas.join('\n'));
const oradores = [...new Set(parrafos.map((p) => p.orador))];
console.log(`✓ ${parrafos.length} párrafos desde ${segmentos.length} segmentos → ${path.relative(process.cwd(), rutaEp)}`);
console.log(`  Oradores: ${oradores.join(', ')}${oradores.some((o) => /^Orador( |$)/.test(o)) ? '  (renombralos con --oradores "A=Nombre,B=Nombre" o a mano)' : ''}`);
console.log(`  Capítulos insertados: ${capitulos.length}${capitulos.length ? '' : ' (agregalos al frontmatter y volvé a importar con --forzar, o editá los ## a mano)'}`);
console.log('  Revisá nombres propios, cifras y siglas: es donde más falla la transcripción automática.');
