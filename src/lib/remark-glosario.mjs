// @ts-check
/**
 * Enlaza la PRIMERA aparición de cada término del glosario dentro del cuerpo
 * de un episodio con <a href="/glosario/{slug}" class="glosario" data-def="…">.
 *
 * Lee los .md de src/content/glosario en el arranque (frontmatter: termino,
 * sinonimos, definicion). No toca títulos, código, links ya existentes ni los
 * botones de timestamp. Solo actúa en archivos dentro de /episodios/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';
import { parse as parseYaml } from 'yaml';

const DIR_GLOSARIO = path.resolve('src/content/glosario');

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cargarGlosario() {
  if (!fs.existsSync(DIR_GLOSARIO)) return [];
  const terminos = [];
  for (const archivo of fs.readdirSync(DIR_GLOSARIO)) {
    if (!archivo.endsWith('.md')) continue;
    const slug = archivo.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(DIR_GLOSARIO, archivo), 'utf8');
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!m) continue;
    const fm = parseYaml(m[1]);
    const variantes = [fm.termino, ...(fm.sinonimos || [])].filter(Boolean);
    terminos.push({ slug, termino: fm.termino, definicion: fm.definicion, variantes });
  }
  // Variantes más largas primero para que "modelo de lenguaje" gane a "modelo".
  const todas = terminos
    .flatMap((t) => t.variantes.map((v) => ({ v, t })))
    .sort((a, b) => b.v.length - a.v.length);
  if (todas.length === 0) return { terminos, re: null, porVariante: new Map() };
  const re = new RegExp(
    `(?<![\\p{L}\\p{N}-])(${todas.map((x) => escapeRegex(x.v)).join('|')})(?![\\p{L}\\p{N}-])`,
    'iu',
  );
  const porVariante = new Map(todas.map((x) => [x.v.toLowerCase(), x.t]));
  return { terminos, re, porVariante };
}

/** @returns {import('unified').Plugin<[], import('mdast').Root>} */
export function remarkGlosario() {
  let cache = null;
  return (tree, file) => {
    const ruta = String(file.path || file.history?.[0] || '').replace(/\\/g, '/');
    if (!ruta.includes('/content/episodios/')) return;
    cache = cache || cargarGlosario();
    if (!cache.re) return;

    const enlazados = new Set();
    const padresProhibidos = new Set(['heading', 'link', 'linkReference', 'inlineCode', 'code', 'strong']);

    visit(tree, 'text', (nodo, indice, padre) => {
      if (!padre || indice === undefined || indice === null) return;
      if (padresProhibidos.has(padre.type)) return;
      if (enlazados.size >= cache.terminos.length) return;

      const partes = [];
      let resto = nodo.value;
      let hubo = false;

      while (resto.length) {
        const m = cache.re.exec(resto);
        if (!m) break;
        const termino = cache.porVariante.get(m[1].toLowerCase());
        if (!termino || enlazados.has(termino.slug)) {
          // Ya enlazado: dejamos el texto y seguimos buscando más adelante.
          const corte = m.index + m[0].length;
          partes.push({ type: 'text', value: resto.slice(0, corte) });
          resto = resto.slice(corte);
          continue;
        }
        enlazados.add(termino.slug);
        hubo = true;
        if (m.index > 0) partes.push({ type: 'text', value: resto.slice(0, m.index) });
        partes.push({
          type: 'link',
          url: `/glosario/${termino.slug}`,
          data: {
            hProperties: {
              className: ['glosario'],
              'data-termino': termino.termino,
              'data-def': termino.definicion,
            },
          },
          children: [{ type: 'text', value: m[1] }],
        });
        resto = resto.slice(m.index + m[0].length);
      }

      if (!hubo) return;
      if (resto.length) partes.push({ type: 'text', value: resto });
      padre.children.splice(indice, 1, ...partes);
      return indice + partes.length;
    });
  };
}
