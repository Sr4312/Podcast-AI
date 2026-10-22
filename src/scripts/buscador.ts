/**
 * Búsqueda con Pagefind (índice estático generado tras el build).
 * Monta sobre [data-buscador]: un <input type="search"> y un #resultados-busqueda.
 * Muestra el fragmento donde aparece el término y, cuando el resultado es una
 * sección de transcripción, el link lleva al capítulo exacto.
 *
 * En `astro dev` no hay índice: se avisa en el propio cuadro.
 */
type Pagefind = {
  init: () => Promise<void>;
  search: (q: string) => Promise<{ results: { id: string; data: () => Promise<Resultado> }[] }>;
  debouncedSearch: (q: string, opts?: unknown, ms?: number) => Promise<{ results: { id: string; data: () => Promise<Resultado> }[] } | null>;
};
type Sub = { title: string; url: string; excerpt: string };
type Resultado = { url: string; excerpt: string; meta: { title?: string; numero?: string; formato?: string }; sub_results: Sub[] };

let pagefind: Pagefind | null | undefined;

async function cargarPagefind(): Promise<Pagefind | null> {
  if (pagefind !== undefined) return pagefind;
  try {
    // La ruta se resuelve en runtime; Vite no debe intentar empaquetarla.
    const mod = await import(/* @vite-ignore */ `${location.origin}/pagefind/pagefind.js`);
    await mod.init();
    pagefind = mod as Pagefind;
  } catch {
    pagefind = null;
  }
  return pagefind;
}

function limpiarUrl(u: string) {
  const [ruta, hash] = u.split('#');
  const limpia = ruta.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  return hash ? `${limpia}#${hash}` : limpia;
}

function initBuscador() {
  document.querySelectorAll<HTMLElement>('[data-buscador]').forEach((cont) => {
    if (cont.dataset.listo) return;
    cont.dataset.listo = '1';
    const input = cont.querySelector<HTMLInputElement>('input[type="search"]');
    const salida = cont.querySelector<HTMLElement>('#resultados-busqueda');
    if (!input || !salida) return;
    const lista = document.querySelector<HTMLElement>('[data-filtros]');
    const listaEpisodios = document.querySelector<HTMLElement>('#lista-episodios');
    const vacio = document.querySelector<HTMLElement>('[data-vacio]');

    const mostrarLista = (si: boolean) => {
      if (lista) lista.hidden = !si;
      if (listaEpisodios) listaEpisodios.hidden = !si;
      if (!si && vacio) vacio.hidden = true;
    };

    let ultimo = '';
    const buscar = async () => {
      const q = input.value.trim();
      ultimo = q;
      if (q.length < 2) {
        salida.innerHTML = '';
        mostrarLista(true);
        return;
      }
      const pf = await cargarPagefind();
      if (!pf) {
        salida.innerHTML = '<p class="meta">La búsqueda se activa en el sitio publicado (el índice se genera al hacer el build).</p>';
        return;
      }
      const res = await pf.debouncedSearch(q, {}, 200);
      if (!res || ultimo !== q) return;
      const datos = await Promise.all(res.results.slice(0, 12).map((r) => r.data()));
      mostrarLista(false);
      if (datos.length === 0) {
        salida.innerHTML = `<p class="meta">Nada para “${q}”. Probá con otra palabra o <a href="/glosario">mirá el glosario</a>.</p>`;
        return;
      }
      salida.innerHTML = `
        <p class="meta">${datos.length === 1 ? '1 resultado' : `${datos.length} resultados`} para “${q}”</p>
        <ol class="lista-editorial mt-2 resultados">
          ${datos
            .map((d) => {
              const titulo = d.meta.title ?? limpiarUrl(d.url);
              const subs = d.sub_results.filter((s) => s.url.includes('#')).slice(0, 3);
              return `<li>
                <a href="${limpiarUrl(d.url)}" class="resultado__titulo">${titulo}</a>
                ${d.meta.numero ? `<span class="meta"> · Episodio ${d.meta.numero}${d.meta.formato ? ` · ${d.meta.formato}` : ''}</span>` : ''}
                <p class="resultado__frag mt-1">${d.excerpt}</p>
                ${
                  subs.length
                    ? `<ul class="resultado__subs mt-2">${subs
                        .map((s) => `<li><a href="${limpiarUrl(s.url)}">${s.title}</a>: <span class="resultado__frag">${s.excerpt}</span></li>`)
                        .join('')}</ul>`
                    : ''
                }
              </li>`;
            })
            .join('')}
        </ol>`;
    };

    input.addEventListener('input', buscar);
    input.addEventListener('focus', () => void cargarPagefind());
    const q = new URLSearchParams(location.search).get('q');
    if (q) {
      input.value = q;
      void buscar();
    }
  });
}

initBuscador();
document.addEventListener('astro:page-load', initBuscador);
