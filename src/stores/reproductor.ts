/**
 * Estado del reproductor persistente. Vive en un módulo: sobrevive a las
 * navegaciones con View Transitions porque los módulos no se recargan.
 *
 * La isla <Reproductor /> es la única que toca el <audio>. El resto del sitio
 * (botones de las páginas, timestamps, capítulos) solo despacha acciones.
 */
import { atom, computed, map } from 'nanostores';

export interface CapituloCarga {
  t: number;
  titulo: string;
}

/** Lo mínimo que una página tiene que pasar para cargar un episodio. */
export interface EpisodioCarga {
  id: string;
  numero: number;
  titulo: string;
  url: string;
  duracion: number;
  ruta: string;
  capitulos: CapituloCarga[];
  /** Nombre del podcast, para Media Session. */
  podcast: string;
}

export const VELOCIDADES = [0.8, 1, 1.25, 1.5, 1.75, 2] as const;

export const $episodio = atom<EpisodioCarga | null>(null);
export const $reproduciendo = atom(false);
export const $tiempo = atom(0);
export const $duracion = atom(0);
export const $velocidad = atom<number>(1);
export const $cargando = atom(false);
export const $error = atom<string | null>(null);
/** Picos del episodio actual (se cargan aparte, no bloquean el play). */
export const $picos = atom<number[] | null>(null);

/** Orden pendiente para la isla: lo escriben las páginas, lo consume el <audio>. */
export const $orden = map<{ tipo: 'ninguna' | 'cargar' | 'play' | 'pausa' | 'toggle' | 'ir' | 'saltar'; valor?: number; autoplay?: boolean; serie: number }>({
  tipo: 'ninguna',
  serie: 0,
});

let serie = 0;
function ordenar(tipo: typeof $orden.value.tipo, extra: { valor?: number; autoplay?: boolean } = {}) {
  serie += 1;
  $orden.set({ tipo, serie, ...extra });
}

export const $capituloActual = computed([$episodio, $tiempo], (ep, t) => {
  if (!ep || ep.capitulos.length === 0) return null;
  let actual = ep.capitulos[0];
  for (const c of ep.capitulos) {
    if (c.t <= t) actual = c;
    else break;
  }
  return actual;
});

export const $progreso = computed([$tiempo, $duracion, $episodio], (t, d, ep) => {
  const total = d || ep?.duracion || 0;
  return total > 0 ? Math.min(1, Math.max(0, t / total)) : 0;
});

/* ---------- Acciones que usan las páginas ---------- */

/**
 * Carga un episodio. Si es el mismo que ya está cargado, solo actúa sobre el tiempo.
 * `t`: segundos donde posicionar. Si no se pasa, retoma la posición guardada.
 * `autoplay`: true para los botones Reproducir; false para deep links.
 */
export function cargarEpisodio(ep: EpisodioCarga, opts: { t?: number; autoplay?: boolean } = {}) {
  const { t, autoplay = true } = opts;
  const mismo = $episodio.get()?.id === ep.id;
  if (!mismo) {
    $episodio.set(ep);
    $duracion.set(ep.duracion);
    $picos.set(null);
    $error.set(null);
    const inicio = t ?? leerPosicion(ep.id) ?? 0;
    $tiempo.set(inicio);
    ordenar('cargar', { valor: inicio, autoplay });
    return;
  }
  if (t !== undefined) {
    ordenar('ir', { valor: t, autoplay });
  } else if (autoplay) {
    ordenar('toggle');
  }
}

export function togglePlay() {
  if ($episodio.get()) ordenar('toggle');
}
export function play() {
  if ($episodio.get()) ordenar('play');
}
export function pausa() {
  ordenar('pausa');
}
export function irA(segundos: number, autoplay = true) {
  if ($episodio.get()) ordenar('ir', { valor: Math.max(0, segundos), autoplay });
}
export function saltar(delta: number) {
  if ($episodio.get()) ordenar('saltar', { valor: delta });
}
export function setVelocidad(v: number) {
  $velocidad.set(v);
  try {
    localStorage.setItem('velocidad', String(v));
  } catch {}
}
export function siguienteVelocidad() {
  const i = VELOCIDADES.indexOf($velocidad.get() as (typeof VELOCIDADES)[number]);
  setVelocidad(VELOCIDADES[(i + 1) % VELOCIDADES.length]);
}

/* ---------- Posición guardada ---------- */

const CLAVE = (id: string) => `pos:${id}`;

export function leerPosicion(id: string): number | null {
  try {
    const raw = localStorage.getItem(CLAVE(id));
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n > 10 ? n : null;
  } catch {
    return null;
  }
}

export function guardarPosicion(id: string, segundos: number, duracion: number) {
  try {
    // Si quedan menos de 30 s, se considera terminado y se borra.
    if (duracion && duracion - segundos < 30) localStorage.removeItem(CLAVE(id));
    else localStorage.setItem(CLAVE(id), String(Math.floor(segundos)));
  } catch {}
}

export function velocidadGuardada(): number {
  try {
    const v = Number(localStorage.getItem('velocidad'));
    return (VELOCIDADES as readonly number[]).includes(v) ? v : 1;
  } catch {
    return 1;
  }
}
