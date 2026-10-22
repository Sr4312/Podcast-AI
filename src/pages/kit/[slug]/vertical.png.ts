import type { APIRoute } from 'astro';
import { getEpisodios, picosDe } from '@/lib/contenido';
import { plantillaVertical, renderizarPNG, respuestaPNG } from '@/lib/imagenes';

export async function getStaticPaths() {
  const episodios = await getEpisodios();
  return episodios.map((ep) => ({ params: { slug: ep.id }, props: { ep } }));
}

/** Pieza vertical del kit de redes: 1080×1350. */
export const GET: APIRoute = async ({ props }) => {
  const ep = props.ep as Awaited<ReturnType<typeof getEpisodios>>[number];
  const picos = await picosDe(ep.id);
  return respuestaPNG(await renderizarPNG(plantillaVertical({ ep, picos }), 1080, 1350));
};
