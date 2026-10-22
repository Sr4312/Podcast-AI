import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITIO } from '@/config/sitio';
import { getEpisodios, duracionSegundos } from '@/lib/contenido';

/**
 * Feed de novedades de la WEB (no el del podcast: ese lo sirve el hosting y vive en /feed).
 * Sirve para seguir las páginas de episodio, con resumen, fuentes y transcripción.
 */
export async function GET(context: APIContext) {
  const episodios = await getEpisodios();
  return rss({
    title: `${SITIO.nombre} (novedades de la web)`,
    description: `${SITIO.descripcionCorta} Este feed anuncia las páginas de cada episodio: resumen, fuentes y transcripción. El feed de audio es ${SITIO.hosting.rss}.`,
    site: context.site ?? SITIO.url,
    items: episodios.map((ep) => ({
      title: `${ep.data.numero}. ${ep.data.titulo}`,
      description: ep.data.bajada,
      pubDate: ep.data.fecha,
      link: `/episodios/${ep.id}`,
      categories: ep.data.temas.map((t) => t.id),
      content: ep.data.resumen
        ? `<p>${ep.data.bajada}</p><ul>${ep.data.resumen.puntos.map((p) => `<li>${p}</li>`).join('')}</ul><p>${ep.data.resumen.contexto}</p><p>Duración: ${Math.round(duracionSegundos(ep) / 60)} minutos.</p>`
        : `<p>${ep.data.bajada}</p>`,
    })),
    customData: `<language>es-AR</language><link rel="alternate" type="application/rss+xml" href="${SITIO.hosting.rss}" />`,
  });
}
