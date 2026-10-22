/**
 * Disparadores de animación (las reglas viven en animacion.css):
 *  - waveforms: se "dibujan" cuando entran en pantalla (una vez)
 *  - secciones por debajo del pliegue: aparecen una vez al hacer scroll
 * Lo que ya está en pantalla al cargar no se toca, salvo la waveform del hero,
 * que se dibuja después del primer pintado. Con movimiento reducido todo se
 * resuelve con fundidos cortos definidos en CSS.
 */
const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function dibujarOnda(svg: Element) {
  svg.classList.add('dibujar');
  const fin = () => svg.classList.add('dibujada');
  // Cuando termina la última barra, dejamos el estado final sin animación pendiente.
  window.setTimeout(fin, reducido() ? 200 : 650);
}

function initAnimacion() {
  const ondas = Array.from(document.querySelectorAll<SVGElement>('.waveform:not(.dibujada):not(.dibujar):not(.repro__onda)'));
  const secciones = Array.from(document.querySelectorAll<HTMLElement>('main .seccion:not(.revelado):not(.revelable)'));

  if (!('IntersectionObserver' in window)) {
    ondas.forEach((o) => o.classList.add('dibujada'));
    return;
  }

  // Solo las secciones que todavía no se ven se marcan como revelables (sin parpadeo arriba).
  const alto = window.innerHeight;
  const revelables = secciones.filter((s) => s.getBoundingClientRect().top > alto);
  revelables.forEach((s) => s.classList.add('revelable'));

  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        if (el.classList.contains('waveform')) dibujarOnda(el);
        else if (el.classList.contains('revelable')) el.classList.add('revelado');
        io.unobserve(el);
      }
    },
    // Margen superior enorme: lo que ya quedó por encima del viewport (salto con ancla, scroll rápido)
    // cuenta como visto y se revela igual. Abajo, un 8 % de margen para que no aparezca pegado al borde.
    { rootMargin: '10000px 0px -8% 0px', threshold: 0.01 },
  );

  ondas.forEach((o) => io.observe(o));
  revelables.forEach((s) => io.observe(s));
}

initAnimacion();
document.addEventListener('astro:page-load', initAnimacion);
