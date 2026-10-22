import { getCollection, type CollectionEntry } from 'astro:content';
import { aSegundos } from './tiempo';

export type Episodio = CollectionEntry<'episodios'>;

/** Episodios visibles: publicados siempre; borradores solo en desarrollo. */
export async function getEpisodios(): Promise<Episodio[]> {
  const todos = await getCollection('episodios', ({ data }) =>
    import.meta.env.PROD ? data.estado === 'publicado' : true,
  );
  return todos.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime() || b.data.numero - a.data.numero);
}

export async function getEpisodio(slug: string): Promise<Episodio | undefined> {
  return (await getEpisodios()).find((e) => e.id === slug);
}

export function duracionSegundos(ep: Episodio): number {
  return aSegundos(ep.data.duracion);
}

/** Capítulos con segundos ya calculados. */
export function capitulosDe(ep: Episodio) {
  return ep.data.capitulos.map((c) => ({ ...c, segundos: aSegundos(c.t) }));
}

/** Picos de la waveform, si fueron generados con `npm run peaks`. */
const peaksGlob = import.meta.glob<{ default: { picos: number[]; duracion: number } }>('../data/peaks/*.json');

export async function picosDe(slug: string): Promise<number[] | null> {
  const ruta = `../data/peaks/${slug}.json`;
  const cargar = peaksGlob[ruta];
  if (!cargar) return null;
  const mod = await cargar();
  return mod.default.picos;
}

/** 3 episodios relacionados por temas compartidos (desempate: más reciente). */
export function relacionados(ep: Episodio, todos: Episodio[], n = 3): Episodio[] {
  const temas = new Set(ep.data.temas.map((t) => t.id));
  return todos
    .filter((e) => e.id !== ep.id)
    .map((e) => ({ e, score: e.data.temas.filter((t) => temas.has(t.id)).length }))
    .sort((a, b) => b.score - a.score || b.e.data.fecha.getTime() - a.e.data.fecha.getTime())
    .slice(0, n)
    .map((x) => x.e);
}

export function fechaLarga(d: Date): string {
  return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}

export function fechaCorta(d: Date): string {
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(d)
    .replace('.', '');
}

export function fechaISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}
