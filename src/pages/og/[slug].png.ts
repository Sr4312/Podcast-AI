import type { APIRoute } from 'astro';
import { getEpisodios, picosDe } from '@/lib/contenido';
import { plantillaOG, renderizarPNG, respuestaPNG } from '@/lib/imagenes';

export async function getStaticPaths() {
  const episodios = await getEpisodios();
  return episodios.map((ep) => ({ params: { slug: ep.id }, props: { ep } }));
}

export const GET: APIRoute = async ({ props }) => {
  const ep = props.ep as Awaited<ReturnType<typeof getEpisodios>>[number];
  const picos = await picosDe(ep.id);
  return respuestaPNG(await renderizarPNG(plantillaOG({ ep, picos }), 1200, 630));
};
