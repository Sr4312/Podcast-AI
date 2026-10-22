import type { APIRoute } from 'astro';
import { getEpisodios, duracionSegundos } from '@/lib/contenido';

export async function getStaticPaths() {
  const episodios = await getEpisodios();
  return episodios.map((ep) => ({ params: { slug: ep.id }, props: { ep } }));
}

const RE_PARRAFO = /^\[(\d{2}):([0-5]\d):([0-5]\d)\]\s*(?:\*\*([^*]+?):?\*\*\s*)?([\s\S]*)$/;

function vttTiempo(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${r.toFixed(3).padStart(6, '0')}`;
}

/** Quita Markdown inline básico (negritas, cursivas, links) para el VTT. */
function limpiar(texto: string): string {
  return texto
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Transcripción en WebVTT, para <podcast:transcript url="…" type="text/vtt"/>.
 * Cada párrafo [hh:mm:ss] **Orador:** es un cue que dura hasta el párrafo siguiente.
 */
export const GET: APIRoute = async ({ props }) => {
  const ep = props.ep as Awaited<ReturnType<typeof getEpisodios>>[number];
  const total = duracionSegundos(ep);
  const bloques = (ep.body ?? '').split(/\r?\n\s*\r?\n/);
  const cues: { t: number; orador: string; texto: string }[] = [];
  for (const b of bloques) {
    const m = RE_PARRAFO.exec(b.trim());
    if (!m) continue;
    cues.push({
      t: Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]),
      orador: (m[4] ?? '').trim(),
      texto: limpiar(m[5] ?? ''),
    });
  }
  const lineas = ['WEBVTT', `NOTE Transcripción de "${ep.data.titulo}". Generada desde la transcripción revisada del episodio.`, ''];
  cues.forEach((c, i) => {
    const fin = i + 1 < cues.length ? cues[i + 1].t : Math.max(c.t + 1, total);
    lineas.push(String(i + 1), `${vttTiempo(c.t)} --> ${vttTiempo(fin)}`, c.orador ? `<v ${c.orador}>${c.texto}` : c.texto, '');
  });
  return new Response(lineas.join('\n'), {
    headers: { 'Content-Type': 'text/vtt; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
  });
};
