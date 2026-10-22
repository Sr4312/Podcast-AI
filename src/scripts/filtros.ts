/**
 * Filtros genéricos con estado en la URL.
 *
 * Contenedor: <div data-filtros="#lista">
 *   <select data-filtro="eje">…</select>  (valor "" = todos)
 * Ítems de la lista: data-eje="a b" (varios valores separados por espacio) o data-eje="a".
 * El estado se escribe como ?eje=economia&formato=debate y se lee al cargar.
 * Un <output data-conteo> muestra cuántos quedan; [data-vacio] se muestra si no queda ninguno.
 */
function initFiltros() {
  document.querySelectorAll<HTMLElement>('[data-filtros]').forEach((cont) => {
    if (cont.dataset.listo) return;
    cont.dataset.listo = '1';
    const lista = document.querySelector<HTMLElement>(cont.dataset.filtros!);
    if (!lista) return;
    const selects = Array.from(cont.querySelectorAll<HTMLSelectElement>('[data-filtro]'));
    const conteo = document.querySelector<HTMLElement>('[data-conteo]');
    const vacio = document.querySelector<HTMLElement>('[data-vacio]');
    const limpiar = cont.querySelector<HTMLButtonElement>('[data-limpiar]');
    const items = () => Array.from(lista.children) as HTMLElement[];

    const leerURL = () => {
      const p = new URLSearchParams(location.search);
      selects.forEach((s) => {
        const v = p.get(s.dataset.filtro!) ?? '';
        if (Array.from(s.options).some((o) => o.value === v)) s.value = v;
      });
    };

    const aplicar = (escribir = true) => {
      const activos = selects.filter((s) => s.value).map((s) => ({ clave: s.dataset.filtro!, valor: s.value }));
      let visibles = 0;
      items().forEach((it) => {
        const pasa = activos.every(({ clave, valor }) => (it.dataset[clave] ?? '').split(/\s+/).includes(valor));
        it.hidden = !pasa;
        if (pasa) visibles++;
      });
      if (conteo) conteo.textContent = visibles === 1 ? '1 episodio' : `${visibles} ${conteo.dataset.plural || 'resultados'}`;
      if (vacio) vacio.hidden = visibles > 0;
      if (limpiar) limpiar.hidden = activos.length === 0;
      if (escribir) {
        const p = new URLSearchParams();
        activos.forEach(({ clave, valor }) => p.set(clave, valor));
        const q = p.toString();
        history.replaceState(null, '', `${location.pathname}${q ? '?' + q : ''}${location.hash}`);
      }
    };

    selects.forEach((s) => s.addEventListener('change', () => aplicar()));
    limpiar?.addEventListener('click', () => {
      selects.forEach((s) => (s.value = ''));
      aplicar();
    });
    leerURL();
    aplicar(false);
  });
}

initFiltros();
document.addEventListener('astro:page-load', initFiltros);
