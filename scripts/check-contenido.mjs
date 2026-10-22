// @ts-check
/**
 * Valida el contenido más allá del esquema Zod (que ya corre en `astro build`):
 *
 *   - slug de episodio con formato NNN-titulo-corto y numero coincidente
 *   - capítulos ordenados, el primero en 00:00:00, ninguno posterior a la duración
 *   - frase.t dentro de la duración
 *   - invitados, conductores, temas y glosario referenciados que existen
 *   - timestamps de la transcripción ordenados y dentro de la duración
 *   - audio local presente y peaks generados
 *   - imágenes Markdown sin alt
 *   - con --links: links de fuentes y plataformas que respondan (HEAD/GET, 2xx/3xx)
 *
 * Uso: npm run check:contenido [-- --links]
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const RAIZ = process.cwd();
const C = (sub) => path.join(RAIZ, 'src/content', sub);
const CON_LINKS = process.argv.includes('--links');

const RE_SLUG_EP = /^(\d{3})-[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RE_TS_LINEA = /^\[(\d{2}):([0-5]\d):([0-5]\d)\]/;

/** @type {string[]} */
const errores = [];
/** @type {string[]} */
const avisos = [];
const error = (m) => errores.push(m);
const aviso = (m) => avisos.push(m);

function hms(s) {
  const m = /^(\d{2}):([0-5]\d):([0-5]\d)$/.exec(s || '');
  return m ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) : NaN;
}

function leerColeccion(nombre) {
  const dir = C(nombre);
  if (!fs.existsSync(dir)) return new Map();
  const mapa = new Map();
  for (const f of fs.readdirSync(dir)) {
    if (!/\.mdx?$/.test(f)) continue;
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
    if (!m) {
      error(`${nombre}/${f}: sin frontmatter`);
      continue;
    }
    let fm;
    try {
      fm = parseYaml(m[1]);
    } catch (e) {
      error(`${nombre}/${f}: YAML inválido (${e instanceof Error ? e.message : e})`);
      continue;
    }
    mapa.set(f.replace(/\.mdx?$/, ''), { fm, cuerpo: m[2], archivo: `${nombre}/${f}` });
  }
  return mapa;
}

const episodios = leerColeccion('episodios');
const invitados = leerColeccion('invitados');
const conductores = leerColeccion('conductores');
const temas = leerColeccion('temas');
const glosario = leerColeccion('glosario');

/** @type {Set<string>} */
const urls = new Set();

for (const [slug, { fm, cuerpo, archivo }] of episodios) {
  const m = RE_SLUG_EP.exec(slug);
  if (!m) error(`${archivo}: el slug "${slug}" no tiene formato NNN-titulo-corto`);
  else if (Number(m[1]) !== fm.numero) error(`${archivo}: el slug empieza con ${m[1]} pero numero es ${fm.numero}`);

  const dur = hms(fm.duracion);
  if (Number.isNaN(dur)) error(`${archivo}: duracion inválida "${fm.duracion}"`);

  // Capítulos
  const caps = Array.isArray(fm.capitulos) ? fm.capitulos : [];
  if (caps.length) {
    if (hms(caps[0].t) !== 0) error(`${archivo}: el primer capítulo debe empezar en 00:00:00`);
    let prev = -1;
    for (const c of caps) {
      const t = hms(c.t);
      if (Number.isNaN(t)) error(`${archivo}: capítulo "${c.titulo}" con tiempo inválido "${c.t}"`);
      if (t <= prev) error(`${archivo}: capítulos desordenados o repetidos en "${c.titulo}"`);
      if (!Number.isNaN(dur) && t >= dur) error(`${archivo}: capítulo "${c.titulo}" (${c.t}) está después de la duración`);
      prev = t;
    }
  }

  if (fm.frase?.t && !Number.isNaN(dur) && hms(fm.frase.t) >= dur) {
    error(`${archivo}: frase.t (${fm.frase.t}) está después de la duración`);
  }

  // Referencias
  for (const inv of fm.invitados || []) if (!invitados.has(inv)) error(`${archivo}: invitado "${inv}" no existe en invitados/`);
  for (const con of fm.conductores || []) if (!conductores.has(con)) error(`${archivo}: conductor "${con}" no existe en conductores/`);
  for (const t of fm.temas || []) if (!temas.has(t)) error(`${archivo}: tema "${t}" no existe en temas/`);

  // Transcripción
  const tiempos = [];
  for (const linea of cuerpo.split(/\r?\n/)) {
    const mt = RE_TS_LINEA.exec(linea);
    if (mt) tiempos.push(Number(mt[1]) * 3600 + Number(mt[2]) * 60 + Number(mt[3]));
  }
  if (fm.estado === 'publicado' && tiempos.length === 0) error(`${archivo}: episodio publicado sin transcripción con timestamps`);
  for (let i = 1; i < tiempos.length; i++) {
    if (tiempos[i] < tiempos[i - 1]) {
      error(`${archivo}: timestamps de transcripción desordenados cerca de ${tiempos[i]}s`);
      break;
    }
  }
  if (!Number.isNaN(dur) && tiempos.some((t) => t >= dur)) error(`${archivo}: hay timestamps posteriores a la duración`);

  // Imágenes sin alt
  for (const im of cuerpo.matchAll(/!\[([^\]]*)\]\(/g)) if (!im[1].trim()) error(`${archivo}: imagen sin alt`);

  // Audio y peaks
  if (fm.audio?.url) {
    if (fm.audio.url.startsWith('/')) {
      const ruta = path.join(RAIZ, 'public', fm.audio.url);
      if (!fs.existsSync(ruta)) aviso(`${archivo}: falta el audio local ${fm.audio.url} (npm run audio:ejemplo)`);
    } else {
      urls.add(fm.audio.url);
    }
    if (!fs.existsSync(path.join(RAIZ, 'src/data/peaks', `${slug}.json`))) {
      error(`${archivo}: faltan los picos (npm run peaks -- ${slug})`);
    }
  }

  for (const f of fm.fuentes || []) if (f.url) urls.add(f.url);
  for (const u of Object.values(fm.plataformas || {})) if (u) urls.add(String(u));
}

for (const [slug, { fm, archivo }] of temas) {
  for (const g of fm.glosario || []) if (!glosario.has(g)) error(`${archivo}: término "${g}" no existe en glosario/`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) error(`${archivo}: slug inválido`);
}
for (const [, { fm, archivo }] of glosario) {
  for (const g of fm.relacionados || []) if (!glosario.has(g)) error(`${archivo}: relacionado "${g}" no existe`);
}

// Links
if (CON_LINKS) {
  console.log(`Comprobando ${urls.size} links…`);
  const ctrl = (ms) => AbortSignal.timeout(ms);
  for (const u of urls) {
    try {
      let r = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: ctrl(10000) });
      if (r.status === 405 || r.status === 403 || r.status === 404) {
        r = await fetch(u, { method: 'GET', redirect: 'follow', signal: ctrl(15000) });
      }
      if (!r.ok) error(`link ${u} → HTTP ${r.status}`);
    } catch (e) {
      error(`link ${u} → ${e instanceof Error ? e.message : e}`);
    }
  }
}

console.log(`Episodios: ${episodios.size} · Invitados: ${invitados.size} · Temas: ${temas.size} · Glosario: ${glosario.size}`);
for (const a of avisos) console.log(`  aviso  ${a}`);
for (const e of errores) console.log(`  ERROR  ${e}`);
if (errores.length) {
  console.log(`\n✗ ${errores.length} error(es)`);
  process.exit(1);
}
console.log(`\n✓ Contenido válido${avisos.length ? ` (${avisos.length} aviso/s)` : ''}`);
