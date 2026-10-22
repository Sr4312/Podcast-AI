import type { APIRoute } from 'astro';
import { getEpisodios, picosDe } from '@/lib/contenido';
import { plantillaPortada, renderizarPNG, respuestaPNG } from '@/lib/imagenes';

/** OG por defecto del sitio: usa la waveform del último episodio. */
export const GET: APIRoute = async () => {
  const [ultimo] = await getEpisodios();
  const picos = ultimo ? await picosDe(ultimo.id) : null;
  return respuestaPNG(await renderizarPNG(plantillaPortada(picos), 1200, 630));
};
