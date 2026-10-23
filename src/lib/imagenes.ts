/**
 * Imágenes generadas en build con satori + resvg: OG (1200×630), kit de redes
 * (1080×608 y 1080×1350) y portada. Misma identidad que el sitio: papel, tinta,
 * naranja señal (marca), azul (acento) y la waveform real del episodio. Sin ilustraciones.
 */
import fs from 'node:fs';
import { createRequire } from 'node:module';
import satori, { type SatoriOptions } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITIO, FORMATOS } from '@/config/sitio';
import type { Episodio } from './contenido';
import { aSegundos, duracionLegible } from './tiempo';

const require = createRequire(import.meta.url);

const PAPEL = '#f4f3ef';
const TINTA = '#14161c';
const TINTA2 = '#4d505a';
const MARCA = '#ff5f2e';
const ACENTO = '#2343b0';
const ONDA = '#9a9aa2';

let fuentes: SatoriOptions['fonts'] | null = null;
function cargarFuentes(): SatoriOptions['fonts'] {
  if (fuentes) return fuentes;
  const leer = (pkg: string, archivo: string) => fs.readFileSync(require.resolve(`${pkg}/files/${archivo}`));
  fuentes = [
    { name: 'Newsreader', data: leer('@fontsource/newsreader', 'newsreader-latin-500-normal.woff'), weight: 500, style: 'normal' },
    { name: 'Public Sans', data: leer('@fontsource/public-sans', 'public-sans-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Public Sans', data: leer('@fontsource/public-sans', 'public-sans-latin-600-normal.woff'), weight: 600, style: 'normal' },
    { name: 'IBM Plex Mono', data: leer('@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
  ];
  return fuentes;
}

function remuestrear(src: number[], n: number): number[] {
  if (src.length <= n) return src;
  const out: number[] = [];
  const paso = src.length / n;
  for (let i = 0; i < n; i++) {
    const a = Math.floor(i * paso);
    const b = Math.max(a + 1, Math.floor((i + 1) * paso));
    let s = 0;
    let max = 0;
    for (let j = a; j < b; j++) {
      s += src[j];
      if (src[j] > max) max = src[j];
    }
    out.push(0.6 * (s / (b - a)) + 0.4 * max);
  }
  const m = Math.max(...out, 1e-6);
  return out.map((v) => v / m);
}

type Nodo = { type: string; props: Record<string, unknown> };

/** Waveform como fila de divs centrados (satori maqueta con flex). */
function onda(picos: number[] | null, barras: number, alto: number, color = ONDA, acento?: { hasta: number; color: string }): Nodo {
  const datos = picos ? remuestrear(picos, barras) : Array.from({ length: barras }, (_, i) => 0.3 + 0.5 * Math.abs(Math.sin(i / 3)));
  const anchoBarra = `${((100 / barras) * 0.55).toFixed(3)}%`;
  return {
    type: 'div',
    props: {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: alto, flexShrink: 0 },
      children: datos.map((p, i) => ({
        type: 'div',
        props: {
          style: {
            width: anchoBarra,
            height: Math.min(alto, Math.max(3, Math.round(p * alto))),
            backgroundColor: acento && i < acento.hasta ? acento.color : color,
            borderRadius: 1,
            flexShrink: 0,
          },
        },
      })),
    },
  };
}

function marca(tamano = 22): Nodo {
  return {
    type: 'div',
    props: {
      style: { display: 'flex', alignItems: 'center', gap: 12 },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: tamano * 1.3, height: tamano * 1.3, backgroundColor: MARCA, borderRadius: tamano * 0.3, padding: 4 },
            children: [0.35, 0.65, 1, 0.5, 0.8, 0.4].map((h) => ({
              type: 'div',
              props: { style: { width: 2, height: `${h * 100}%`, backgroundColor: TINTA } },
            })),
          },
        },
        { type: 'div', props: { style: { fontFamily: 'Newsreader', fontSize: tamano * 1.25, color: TINTA }, children: SITIO.nombre } },
      ],
    },
  };
}

function texto(contenido: string, estilo: Record<string, unknown>): Nodo {
  return { type: 'div', props: { style: { display: 'flex', ...estilo }, children: contenido } };
}

function fila(izquierda: Nodo, derecha: Nodo): Nodo {
  return {
    type: 'div',
    props: {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 },
      children: [izquierda, derecha],
    },
  };
}

/**
 * Lienzo de tamaño fijo. El marco se hace con márgenes en un contenedor interior
 * (satori mide el padding de la raíz como content-box y desborda el lienzo).
 */
function lienzo(ancho: number, alto: number, margen: string, children: Nodo[]): Nodo {
  return {
    type: 'div',
    props: {
      style: { display: 'flex', width: ancho, height: alto, backgroundColor: PAPEL, fontFamily: 'Public Sans', color: TINTA, overflow: 'hidden' },
      children: {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, margin: margen, minWidth: 0 },
          children,
        },
      },
    },
  };
}

export interface DatosImagen {
  ep: Episodio;
  picos: number[] | null;
}

/** OG 1200×630: número, título, waveform, nombre del podcast. */
export function plantillaOG({ ep, picos }: DatosImagen) {
  const tituloLargo = ep.data.titulo.length > 48;
  return lienzo(1200, 630, '56px 64px', [
    fila(marca(22), texto(`Episodio ${ep.data.numero} · ${FORMATOS[ep.data.formato].nombre} · ${duracionLegible(aSegundos(ep.data.duracion))}`, { fontSize: 24, color: TINTA2 })),
    texto(ep.data.titulo, { fontFamily: 'Newsreader', fontSize: tituloLargo ? 60 : 72, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1040 }),
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 18 },
        children: [onda(picos, 120, 110), texto(SITIO.dominio, { fontSize: 22, color: ACENTO, fontWeight: 600 })],
      },
    },
  ]);
}

/** Kit horizontal 1080×608: título, frase destacada y waveform. */
export function plantillaHorizontal({ ep, picos }: DatosImagen) {
  const frase = ep.data.frase;
  const hasta = frase ? Math.round((aSegundos(frase.t) / aSegundos(ep.data.duracion)) * 110) : 0;
  return lienzo(1080, 608, '48px 56px', [
    fila(marca(20), texto(`Episodio ${ep.data.numero}`, { fontSize: 22, color: TINTA2 })),
    frase
      ? {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 16, borderLeft: `5px solid ${MARCA}`, paddingLeft: 28 },
            children: [
              texto(`“${frase.texto}”`, { fontFamily: 'Newsreader', fontSize: frase.texto.length > 120 ? 36 : 44, lineHeight: 1.18, letterSpacing: -0.5 }),
              texto(`${frase.autor} · ${frase.t}`, { fontSize: 22, color: TINTA2 }),
            ],
          },
        }
      : texto(ep.data.titulo, { fontFamily: 'Newsreader', fontSize: 56, lineHeight: 1.1 }),
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 14 },
        children: [onda(picos, 110, 70, ONDA, { hasta, color: MARCA }), texto(ep.data.titulo, { fontSize: 22, fontWeight: 600 })],
      },
    },
  ]);
}

/** Kit vertical 1080×1350. */
export function plantillaVertical({ ep, picos }: DatosImagen) {
  const frase = ep.data.frase;
  const hasta = frase ? Math.round((aSegundos(frase.t) / aSegundos(ep.data.duracion)) * 90) : 0;
  return lienzo(1080, 1350, '72px 72px', [
    fila(marca(24), texto(`Episodio ${ep.data.numero}`, { fontSize: 26, color: TINTA2 })),
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 40 },
        children: [
          texto(ep.data.titulo, { fontFamily: 'Newsreader', fontSize: 64, lineHeight: 1.08, letterSpacing: -1 }),
          frase
            ? {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', gap: 18, borderLeft: `6px solid ${MARCA}`, paddingLeft: 32 },
                  children: [
                    texto(`“${frase.texto}”`, { fontFamily: 'Newsreader', fontSize: frase.texto.length > 120 ? 40 : 48, lineHeight: 1.2 }),
                    texto(`${frase.autor} · ${frase.t}`, { fontSize: 26, color: TINTA2 }),
                  ],
                },
              }
            : texto(ep.data.bajada, { fontSize: 32, lineHeight: 1.4, color: TINTA2 }),
        ],
      },
    },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 20 },
        children: [
          onda(picos, 90, 160, ONDA, { hasta, color: MARCA }),
          texto(`${SITIO.dominio} · ${FORMATOS[ep.data.formato].nombre} · ${duracionLegible(aSegundos(ep.data.duracion))}`, { fontSize: 26, color: ACENTO, fontWeight: 600 }),
        ],
      },
    },
  ]);
}

/** Portada genérica del podcast (OG por defecto), 1200×630. */
export function plantillaPortada(picos: number[] | null) {
  return lienzo(1200, 630, '56px 64px', [
    marca(24),
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 20 },
        children: [
          texto(SITIO.nombre, { fontFamily: 'Newsreader', fontSize: 92, letterSpacing: -2 }),
          texto(SITIO.descripcionCorta, { fontSize: 30, lineHeight: 1.35, color: TINTA2, maxWidth: 980 }),
        ],
      },
    },
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', gap: 18 },
        children: [onda(picos, 120, 110), texto(SITIO.dominio, { fontSize: 22, color: ACENTO, fontWeight: 600 })],
      },
    },
  ]);
}

export async function renderizarPNG(arbol: unknown, ancho: number, alto: number): Promise<Uint8Array> {
  const svg = await satori(arbol as never, { width: ancho, height: alto, fonts: cargarFuentes() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: ancho } }).render().asPng();
}

export const respuestaPNG = (png: Uint8Array) =>
  new Response(png as BodyInit, { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=604800' } });
