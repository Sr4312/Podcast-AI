/**
 * Cableado global del reproductor (se carga una vez desde Base.astro):
 *  - clics en [data-reproducir] → cargar/alternar el episodio sin navegar
 *  - aria-pressed en esos botones según qué episodio suena
 *  - clics en .ts[data-t] y en links a #cap-N dentro de una página de episodio → saltar
 *  - clics en .copiar-t → copiar link con ?t=
 *  - clics en [data-plataforma] → evento de analytics
 */
import { $episodio, $reproduciendo, cargarEpisodio, irA, type EpisodioCarga } from '@/stores/reproductor';
import { evento } from '@/lib/analytics';

function datosDe(boton: HTMLElement): EpisodioCarga | null {
  try {
    return JSON.parse(boton.dataset.episodio || 'null');
  } catch {
    return null;
  }
}

function cargaDePagina(): EpisodioCarga | null {
  const raiz = document.querySelector<HTMLElement>('[data-pagina-episodio]');
  if (!raiz) return null;
  try {
    return JSON.parse(raiz.dataset.episodio || 'null');
  } catch {
    return null;
  }
}

let avisoCopiado: HTMLElement | null = null;
function avisar(texto: string) {
  if (!avisoCopiado) {
    avisoCopiado = document.createElement('div');
    avisoCopiado.className = 'sr-only';
    avisoCopiado.setAttribute('role', 'status');
    avisoCopiado.setAttribute('aria-live', 'polite');
    document.body.appendChild(avisoCopiado);
  }
  avisoCopiado.textContent = '';
  window.setTimeout(() => {
    if (avisoCopiado) avisoCopiado.textContent = texto;
  }, 50);
}

document.addEventListener('click', (e) => {
  const objetivo = e.target as HTMLElement | null;
  if (!objetivo) return;

  const btn = objetivo.closest<HTMLElement>('[data-reproducir]');
  if (btn) {
    const datos = datosDe(btn);
    if (!datos) return;
    e.preventDefault();
    const t = btn.dataset.desde ? Number(btn.dataset.desde) : undefined;
    cargarEpisodio(datos, { t, autoplay: true });
    delete btn.dataset.desde;
    return;
  }

  const ts = objetivo.closest<HTMLElement>('.ts[data-t]');
  if (ts) {
    const datos = cargaDePagina();
    if (!datos) return;
    const t = Number(ts.dataset.t);
    cargarEpisodio(datos, { t, autoplay: true });
    return;
  }

  const cap = objetivo.closest<HTMLAnchorElement>('a[href^="#cap-"]');
  if (cap) {
    const datos = cargaDePagina();
    const t = Number(cap.getAttribute('href')!.slice(5));
    if (datos && Number.isFinite(t)) {
      cargarEpisodio(datos, { t, autoplay: true });
      evento('capitulo', { episodio: datos.id, t });
    }
    // Dejamos que el ancla haga scroll a la sección.
    return;
  }

  const copiar = objetivo.closest<HTMLElement>('.copiar-t[data-t]');
  if (copiar) {
    const url = `${location.origin}${location.pathname}?t=${copiar.dataset.t}`;
    navigator.clipboard?.writeText(url).then(
      () => {
        avisar('Link copiado');
        copiar.classList.add('copiado');
        window.setTimeout(() => copiar.classList.remove('copiado'), 1200);
      },
      () => avisar('No se pudo copiar el link'),
    );
    return;
  }

  const plat = objetivo.closest<HTMLElement>('[data-plataforma]');
  if (plat) {
    evento('plataforma', { plataforma: plat.dataset.plataforma || '', episodio: plat.dataset.episodioId || '' });
  }
});

function actualizarBotones() {
  const ep = $episodio.get();
  const suena = $reproduciendo.get();
  document.querySelectorAll<HTMLElement>('[data-reproducir]').forEach((b) => {
    const activo = !!ep && b.dataset.reproducir === ep.id && suena;
    b.setAttribute('aria-pressed', String(activo));
    // Si el episodio ya está sonando, la oferta "Seguir desde / Reproducir desde" se consumió.
    if (activo) delete b.dataset.desde;
    const texto = b.querySelector<HTMLElement>('.texto');
    if (!texto) return;
    if (activo) texto.textContent = 'Pausar';
    else if (!b.dataset.desde) texto.textContent = texto.dataset.original || 'Reproducir';
  });
}
$episodio.subscribe(actualizarBotones);
$reproduciendo.subscribe(actualizarBotones);
document.addEventListener('astro:page-load', actualizarBotones);
