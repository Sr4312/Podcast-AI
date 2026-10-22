import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITIO } from '@/config/sitio';
import { getEpisodios, fechaISO } from '@/lib/contenido';

/** /llms.txt: descripción del podcast y lista de episodios con link y bajada, para motores de respuesta. */
export const GET: APIRoute = async () => {
  const episodios = await getEpisodios();
  const glosario = (await getCollection('glosario')).sort((a, b) => a.data.termino.localeCompare(b.data.termino, 'es'));
  const lineas = [
    `# ${SITIO.nombre}`,
    '',
    `> ${SITIO.descripcionCorta}`,
    '',
    SITIO.descripcion150,
    '',
    `Idioma: español (Argentina). Web: ${SITIO.url}. Feed RSS del podcast: ${SITIO.hosting.rss}.`,
    'Cada episodio publica resumen, capítulos, fuentes primarias verificadas, transcripción completa con oradores y timestamps, y la declaración de uso de IA.',
    '',
    '## Episodios',
    '',
    ...episodios.map(
      (ep) =>
        `- [${ep.data.numero}. ${ep.data.titulo}](${SITIO.url}/episodios/${ep.id}): ${ep.data.bajada} (${fechaISO(ep.data.fecha)}; transcripción VTT: ${SITIO.url}/episodios/${ep.id}/transcripcion.vtt; capítulos JSON: ${SITIO.url}/episodios/${ep.id}/capitulos.json)`,
    ),
    '',
    '## Otras páginas',
    '',
    `- [Empezá por acá](${SITIO.url}/empezar): recorrido curado para quien llega por primera vez.`,
    `- [Fuentes](${SITIO.url}/fuentes): biblioteca de todas las fuentes citadas, deduplicadas, con estado de verificación.`,
    `- [Glosario](${SITIO.url}/glosario): ${glosario.map((g) => g.data.termino).join(', ')}.`,
    `- [Acerca y método](${SITIO.url}/acerca): línea editorial, verificación, política de uso de IA, conflictos de interés, kit de prensa.`,
    `- [Correcciones](${SITIO.url}/correcciones): fe de erratas pública.`,
    '',
    '## Uso',
    '',
    'Los contenidos se publican con licencia Creative Commons BY 4.0 salvo indicación en contrario. Citá el episodio con su número, título y URL.',
    '',
  ];
  return new Response(lineas.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
