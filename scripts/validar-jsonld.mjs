// @ts-check
/**
 * Valida el JSON-LD de las páginas construidas en dist/:
 *   - que parsee
 *   - que cada tipo tenga las propiedades que exigimos
 *   - que lo que dice coincida con lo visible (título h1, número de episodio, nombre de persona)
 *
 * Con --remoto, además envía cada bloque al Schema Markup Validator (validator.schema.org).
 *
 * Uso: node scripts/validar-jsonld.mjs [--remoto]
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const REMOTO = process.argv.includes('--remoto');

const REQUERIDAS = {
  PodcastSeries: ['name', 'description', 'url', 'image', 'webFeed', 'author'],
  PodcastEpisode: ['name', 'description', 'url', 'datePublished', 'episodeNumber', 'partOfSeries', 'image', 'associatedMedia'],
  AudioObject: ['contentUrl', 'duration'],
  Person: ['name'],
  BreadcrumbList: ['itemListElement'],
};

function* html(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) yield* html(p);
    else if (f.name.endsWith('.html')) yield p;
  }
}

const decodificar = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();

let errores = 0;
let bloques = 0;
const porTipo = {};

for (const archivo of html(DIST)) {
  const src = fs.readFileSync(archivo, 'utf8');
  const rel = path.relative(DIST, archivo).replace(/\\/g, '/');
  const h1 = decodificar((/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(src)?.[1] ?? '').replace(/<[^>]+>/g, ''));
  for (const m of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    bloques++;
    let datos;
    try {
      datos = JSON.parse(m[1]);
    } catch (e) {
      errores++;
      console.log(`✗ ${rel}: JSON-LD inválido (${e.message})`);
      continue;
    }
    const lista = Array.isArray(datos) ? datos : datos['@graph'] ?? [datos];
    for (const nodo of lista) {
      const tipo = nodo['@type'];
      porTipo[tipo] = (porTipo[tipo] ?? 0) + 1;
      for (const prop of REQUERIDAS[tipo] ?? []) {
        if (nodo[prop] === undefined || nodo[prop] === '' || (Array.isArray(nodo[prop]) && nodo[prop].length === 0)) {
          errores++;
          console.log(`✗ ${rel}: ${tipo} sin "${prop}"`);
        }
      }
      if (tipo === 'PodcastEpisode') {
        if (h1 && nodo.name !== h1) {
          errores++;
          console.log(`✗ ${rel}: PodcastEpisode.name "${nodo.name}" ≠ h1 "${h1}"`);
        }
        const am = nodo.associatedMedia;
        for (const prop of REQUERIDAS.AudioObject) {
          if (!am?.[prop]) {
            errores++;
            console.log(`✗ ${rel}: AudioObject sin "${prop}"`);
          }
        }
        if (am?.duration && !/^PT(\d+H)?(\d+M)?(\d+S)?$/.test(am.duration)) {
          errores++;
          console.log(`✗ ${rel}: duration no es ISO 8601: ${am.duration}`);
        }
        const nVisible = /Episodio (\d+)/.exec(decodificar(src.replace(/<[^>]+>/g, ' ')))?.[1];
        if (nVisible && Number(nVisible) !== nodo.episodeNumber) {
          errores++;
          console.log(`✗ ${rel}: episodeNumber ${nodo.episodeNumber} ≠ visible ${nVisible}`);
        }
      }
      if (tipo === 'Person' && h1 && rel.startsWith('invitados/') && nodo.name !== h1) {
        errores++;
        console.log(`✗ ${rel}: Person.name "${nodo.name}" ≠ h1 "${h1}"`);
      }
      if (tipo === 'BreadcrumbList') {
        nodo.itemListElement.forEach((it, i) => {
          if (it.position !== i + 1 || !it.name) {
            errores++;
            console.log(`✗ ${rel}: BreadcrumbList posición ${i + 1} inválida`);
          }
        });
      }
    }
    if (REMOTO) {
      try {
        const r = await fetch('https://validator.schema.org/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ html: `<script type="application/ld+json">${m[1]}</script>` }),
        });
        const texto = (await r.text()).replace(/^\)\]\}'\n?/, '');
        const json = JSON.parse(texto);
        const errs = (json.tripleGroups ?? []).flatMap((g) => g.nodes ?? []).flatMap((n) => n.errors ?? []).filter((e) => e.errorType !== 'WARNING');
        if (errs.length) {
          errores += errs.length;
          console.log(`✗ ${rel}: Schema Markup Validator: ${errs.map((e) => e.args?.join(' ') ?? e.errorType).join('; ')}`);
        } else {
          console.log(`  ✓ ${rel}: validador remoto OK`);
        }
      } catch (e) {
        console.log(`  aviso ${rel}: no se pudo consultar el validador remoto (${e.message})`);
      }
    }
  }
}

console.log(`\nBloques JSON-LD: ${bloques} · ${Object.entries(porTipo).map(([t, n]) => `${t}: ${n}`).join(' · ')}`);
if (errores) {
  console.log(`✗ ${errores} error(es)`);
  process.exit(1);
}
console.log('✓ JSON-LD válido y coincidente con lo visible');
