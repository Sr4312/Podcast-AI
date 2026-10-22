/**
 * Eventos de analytics sin cookies. Un solo punto de entrada: si cambia el
 * proveedor, se toca este archivo. Nunca rompe si el script no cargó.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (evento: string, opts?: { props?: Props }) => void;
    umami?: { track: (evento: string, props?: Props) => void };
  }
}

export function evento(nombre: string, props: Props = {}) {
  try {
    if (typeof window === 'undefined') return;
    if (window.plausible) window.plausible(nombre, { props });
    else if (window.umami) window.umami.track(nombre, props);
    else if (import.meta.env.DEV) console.debug('[analytics]', nombre, props);
  } catch {}
}
