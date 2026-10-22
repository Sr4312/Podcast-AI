import type { APIRoute } from 'astro';
import { SITIO } from '@/config/sitio';
import { getEpisodios, capitulosDe } from '@/lib/contenido';

export async function getStaticPaths() {
  const episodios = await getEpisodios();
  return episodios.map((ep) => ({ params: { slug: ep.id }, props: { ep } }));
}

/**
 * Capítulos en formato JSON Chapters (Podcasting 2.0), para referenciar desde el
 * RSS del hosting con <podcast:chapters url="…" type="application/json+chapters"/>.
 * Fuente única de verdad: el frontmatter del episodio.
 */
export const GET: APIRoute = async ({ props }) => {
  const ep = props.ep as Awaited<ReturnType<typeof getEpisodios>>[number];
  const cuerpo = {
    version: '1.2.0',
    title: ep.data.titulo,
    podcastName: SITIO.nombre,
    author: SITIO.nombre,
    fileName: `${ep.id}.json`,
    chapters: capitulosDe(ep).map((c) => ({
      startTime: c.segundos,
      title: c.titulo,
      url: `${SITIO.url}/episodios/${ep.id}?t=${c.segundos}`,
    })),
  };
  return new Response(JSON.stringify(cuerpo, null, 2), {
    headers: { 'Content-Type': 'application/json+chapters; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
  });
};
