import type { APIRoute } from 'astro';
import { getEpisodios, picosDe } from '@/lib/contenido';

/** Picos de la waveform del episodio, para la barra del reproductor. Estático. */
export async function getStaticPaths() {
  const episodios = await getEpisodios();
  return episodios.map((ep) => ({ params: { slug: ep.id } }));
}

export const GET: APIRoute = async ({ params }) => {
  const picos = await picosDe(params.slug!);
  return new Response(JSON.stringify({ picos: picos ?? [] }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
};
