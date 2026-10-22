// @ts-check
/**
 * Revisa los links internos del sitio construido en dist/: que cada href, src y
 * ancla (#id) apunte a algo que existe. No toca la red.
 *
 * Uso: node scripts/check-links.mjs   (después de `npm run build`)
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');

function* archivos(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) yield* archivos(p);
    else yield p;
  }
}

/** Resuelve una ruta del sitio a un archivo en dist (con o sin barra, con index.html). */
function existe(ruta) {
  const limpia = decodeURIComponent(ruta.split('?')[0]).replace(/\/$/, '');
  const candidatos = [
    path.join(DIST, limpia),
    path.join(DIST, limpia, 'index.html'),
    path.join(DIST, `${limpia}.html`),
  ];
  return candidatos.some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

const ids = new Map(); // archivo → Set(ids)
const paginas = [];
for (const f of archivos(DIST)) {
  if (!f.endsWith('.html')) continue;
  const src = fs.readFileSync(f, 'utf8');
  const rel = '/' + path.relative(DIST, f).replace(/\\/g, '/').replace(/\/index\.html$/, '').replace(/\.html$/, '');
  ids.set(rel === '/index' ? '/' : rel, new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  paginas.push({ rel: rel === '/index' ? '/' : rel, src });
}

let errores = 0;
let revisados = 0;
const externos = new Set();

for (const { rel, src } of paginas) {
  for (const m of src.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(mailto:|tel:|data:|javascript:)/.test(u)) continue;
    if (/^https?:\/\//.test(u)) {
      externos.add(u);
      continue;
    }
    revisados++;
    if (u.startsWith('#')) {
      const id = u.slice(1);
      if (id && !ids.get(rel)?.has(id)) {
        errores++;
        console.log(`✗ ${rel}: ancla #${id} no existe en la página`);
      }
      continue;
    }
    const [ruta, hash] = u.split('#');
    const absoluta = ruta.startsWith('/') ? ruta : path.posix.join(path.posix.dirname(rel), ruta);
    if (!existe(absoluta)) {
      errores++;
      console.log(`✗ ${rel}: ${u} no existe`);
      continue;
    }
    if (hash) {
      const destino = absoluta.replace(/\/$/, '') || '/';
      const set = ids.get(destino);
      if (set && !set.has(hash)) {
        errores++;
        console.log(`✗ ${rel}: ${u} apunta a un ancla inexistente`);
      }
    }
  }
}

console.log(`Páginas: ${paginas.length} · links internos revisados: ${revisados} · externos (no revisados acá): ${externos.size}`);
if (errores) {
  console.log(`✗ ${errores} link(s) roto(s)`);
  process.exit(1);
}
console.log('✓ Sin links internos rotos');
