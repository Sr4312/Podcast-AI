// @ts-check
/**
 * Plugin de remark para transcripciones.
 *
 * Entrada (cuerpo del .md de un episodio):
 *
 *   ## El proyecto de ley
 *
 *   [00:04:12] **Conductor:** Texto…
 *
 * Salida:
 *
 *   <h2 id="cap-252" data-t="252" data-capitulo>El proyecto de ley</h2>
 *
 *   <p id="t-252" data-t="252" data-orador="Conductor" class="parrafo">
 *     <button type="button" class="ts" data-t="252" aria-label="Saltar a 00:04:12">00:04:12</button>
 *     <button type="button" class="copiar-t" data-t="252" aria-label="Copiar link a este momento">…</button>
 *     <strong class="orador">Conductor:</strong> Texto…
 *   </p>
 *
 * Cada `##` queda vinculado al primer timestamp que lo sigue (id="cap-{segundos}").
 * Si no hay timestamp después, mantiene un id derivado del texto.
 */
import { visit } from 'unist-util-visit';

const RE_TS = /^\[(\d{2}):([0-5]\d):([0-5]\d)\]\s*/;

function aSegundos(h, m, s) {
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
}

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function textoDe(nodo) {
  if (!nodo) return '';
  if (nodo.type === 'text') return nodo.value;
  return (nodo.children || []).map(textoDe).join('');
}

function botonTimestamp(hms, segundos) {
  return {
    type: 'timestampBoton',
    data: {
      hName: 'button',
      hProperties: {
        type: 'button',
        className: ['ts'],
        'data-t': segundos,
        'aria-label': `Saltar a ${hms}`,
      },
      hChildren: [{ type: 'text', value: hms }],
    },
  };
}

function botonCopiar(segundos) {
  return {
    type: 'copiarBoton',
    data: {
      hName: 'button',
      hProperties: {
        type: 'button',
        className: ['copiar-t'],
        'data-t': segundos,
        'aria-label': 'Copiar link a este momento',
        title: 'Copiar link a este momento',
      },
      hChildren: [
        {
          type: 'element',
          tagName: 'svg',
          properties: {
            width: 16,
            height: 16,
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'aria-hidden': 'true',
          },
          children: [
            { type: 'element', tagName: 'path', properties: { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }, children: [] },
            { type: 'element', tagName: 'path', properties: { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' }, children: [] },
          ],
        },
      ],
    },
  };
}

/** @returns {import('unified').Plugin<[], import('mdast').Root>} */
export function remarkTranscripcion() {
  return (tree, file) => {
    /** @type {{nodo: any, pendiente: boolean}|null} */
    let capituloAbierto = null;
    const vistos = new Set();

    for (let i = 0; i < tree.children.length; i++) {
      const nodo = tree.children[i];

      if (nodo.type === 'heading' && nodo.depth === 2) {
        const titulo = textoDe(nodo);
        // En la página, la transcripción vive bajo un h2 ("Transcripción completa"): los capítulos son h3.
        nodo.depth = 3;
        nodo.data = nodo.data || {};
        nodo.data.hProperties = {
          ...(nodo.data.hProperties || {}),
          id: `cap-${slugify(titulo)}`,
          'data-capitulo': '',
        };
        capituloAbierto = { nodo, pendiente: true };
        continue;
      }

      if (nodo.type !== 'paragraph' || !nodo.children?.length) continue;
      const primero = nodo.children[0];
      if (primero.type !== 'text') continue;
      const m = RE_TS.exec(primero.value);
      if (!m) continue;

      const segundos = aSegundos(m[1], m[2], m[3]);
      const hms = `${m[1]}:${m[2]}:${m[3]}`;
      primero.value = primero.value.slice(m[0].length);
      if (primero.value === '') nodo.children.shift();

      // Orador: **Nombre:** al inicio.
      let orador = '';
      const posibleOrador = nodo.children[0];
      if (posibleOrador?.type === 'strong') {
        orador = textoDe(posibleOrador).replace(/:\s*$/, '').trim();
        posibleOrador.data = posibleOrador.data || {};
        posibleOrador.data.hProperties = { className: ['orador'] };
      }

      if (vistos.has(segundos)) {
        file.message(`Timestamp repetido en la transcripción: ${hms}`, nodo);
      }
      vistos.add(segundos);

      nodo.data = nodo.data || {};
      nodo.data.hProperties = {
        id: `t-${segundos}`,
        className: ['parrafo'],
        'data-t': segundos,
        ...(orador ? { 'data-orador': orador } : {}),
      };
      nodo.children.unshift(botonTimestamp(hms, segundos), botonCopiar(segundos));

      if (capituloAbierto?.pendiente) {
        capituloAbierto.nodo.data.hProperties.id = `cap-${segundos}`;
        capituloAbierto.nodo.data.hProperties['data-t'] = segundos;
        capituloAbierto.pendiente = false;
      }
    }

    // Timestamps fuera de lugar (no al inicio de un párrafo) se dejan como texto; solo avisamos.
    visit(tree, 'text', (n) => {
      if (/\[\d{2}:\d{2}:\d{2}\]/.test(n.value) && !RE_TS.test(n.value)) {
        file.message('Hay un [hh:mm:ss] que no está al inicio de un párrafo', n);
      }
    });
  };
}
