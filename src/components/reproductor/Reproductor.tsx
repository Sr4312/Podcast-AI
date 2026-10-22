import { useEffect, useRef, useState, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import {
  $episodio,
  $reproduciendo,
  $tiempo,
  $duracion,
  $velocidad,
  $cargando,
  $error,
  $picos,
  $orden,
  $capituloActual,
  $progreso,
  togglePlay,
  saltar,
  irA,
  siguienteVelocidad,
  setVelocidad,
  guardarPosicion,
  velocidadGuardada,
} from '@/stores/reproductor';
import { formatoCorto, duracionAccesible } from '@/lib/tiempo';
import { evento } from '@/lib/analytics';

const BARRAS = 120;
const HITOS = [25, 50, 75, 95];

function remuestrear(src: number[], n: number): number[] {
  if (src.length === 0) return [];
  if (src.length <= n) return src;
  const out: number[] = [];
  const paso = src.length / n;
  for (let i = 0; i < n; i++) {
    const a = Math.floor(i * paso);
    const b = Math.max(a + 1, Math.floor((i + 1) * paso));
    let s = 0;
    let max = 0;
    for (let j = a; j < b; j++) {
      s += src[j];
      if (src[j] > max) max = src[j];
    }
    out.push(0.6 * (s / (b - a)) + 0.4 * max);
  }
  const m = Math.max(...out, 1e-6);
  return out.map((v) => v / m);
}

function Icono({ nombre }: { nombre: 'play' | 'pausa' | 'atras' | 'adelante' }) {
  const comun = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
  switch (nombre) {
    case 'play':
      return <svg {...comun}><polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" /></svg>;
    case 'pausa':
      return <svg {...comun}><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none" /></svg>;
    case 'atras':
      return (
        <svg {...comun}>
          <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v4h4" />
          <text x="12" y="15.5" fontSize="7.5" fontFamily="system-ui,sans-serif" fontWeight="600" textAnchor="middle" fill="currentColor" stroke="none">15</text>
        </svg>
      );
    case 'adelante':
      return (
        <svg {...comun}>
          <path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v4h-4" />
          <text x="12" y="15.5" fontSize="7.5" fontFamily="system-ui,sans-serif" fontWeight="600" textAnchor="middle" fill="currentColor" stroke="none">30</text>
        </svg>
      );
  }
}

export default function Reproductor() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const contRef = useRef<HTMLDivElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);
  const seekPendiente = useRef<{ t: number; autoplay: boolean } | null>(null);
  const hitos = useRef<Set<number>>(new Set());
  const ultimaSerie = useRef(0);

  const ep = useStore($episodio);
  const reproduciendo = useStore($reproduciendo);
  const tiempo = useStore($tiempo);
  const duracion = useStore($duracion);
  const velocidad = useStore($velocidad);
  const cargando = useStore($cargando);
  const error = useStore($error);
  const picos = useStore($picos);
  const orden = useStore($orden);
  const capitulo = useStore($capituloActual);
  const progreso = useStore($progreso);

  const [hover, setHover] = useState<{ x: number; t: number; titulo: string | null } | null>(null);
  const [arrastrando, setArrastrando] = useState(false);

  /* ---- Velocidad guardada ---- */
  useEffect(() => {
    setVelocidad(velocidadGuardada());
  }, []);
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = velocidad;
  }, [velocidad]);

  /* ---- Órdenes desde las páginas ---- */
  useEffect(() => {
    const a = audioRef.current;
    if (!a || orden.serie === ultimaSerie.current) return;
    ultimaSerie.current = orden.serie;
    const e = $episodio.get();
    const intentarPlay = () =>
      a.play().then(
        () => $error.set(null),
        () => $error.set('No se pudo reproducir el audio. Probá de nuevo.'),
      );
    switch (orden.tipo) {
      case 'cargar': {
        if (!e) return;
        hitos.current = new Set();
        a.pause();
        a.src = e.url;
        a.playbackRate = $velocidad.get();
        seekPendiente.current = { t: orden.valor ?? 0, autoplay: orden.autoplay ?? true };
        a.load();
        if (orden.autoplay) {
          evento('play', { episodio: e.id, desde: Math.floor(orden.valor ?? 0) });
          intentarPlay();
        } else {
          // Con preload="none", para mostrar el tiempo pedido sin reproducir alcanza con el store.
          $tiempo.set(orden.valor ?? 0);
        }
        break;
      }
      case 'play':
        intentarPlay();
        break;
      case 'pausa':
        a.pause();
        break;
      case 'toggle':
        if (a.paused) {
          if (!a.currentSrc && e) {
            a.src = e.url;
            seekPendiente.current = { t: $tiempo.get(), autoplay: true };
            a.load();
          }
          evento('play', { episodio: e?.id ?? '', desde: Math.floor($tiempo.get()) });
          intentarPlay();
        } else a.pause();
        break;
      case 'ir': {
        const t = orden.valor ?? 0;
        if (a.readyState >= 1) {
          a.currentTime = t;
          $tiempo.set(t);
          if (orden.autoplay && a.paused) intentarPlay();
        } else {
          if (!a.currentSrc && e) a.src = e.url;
          seekPendiente.current = { t, autoplay: orden.autoplay ?? true };
          $tiempo.set(t);
          a.load();
          if (orden.autoplay) intentarPlay();
        }
        break;
      }
      case 'saltar': {
        const t = Math.max(0, Math.min((a.duration || $duracion.get()) - 1, a.currentTime + (orden.valor ?? 0)));
        if (a.readyState >= 1) a.currentTime = t;
        $tiempo.set(t);
        break;
      }
    }
  }, [orden]);

  /* ---- Eventos del <audio> ---- */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onMeta = () => {
      if (Number.isFinite(a.duration)) $duracion.set(a.duration);
      const p = seekPendiente.current;
      if (p) {
        seekPendiente.current = null;
        if (p.t > 0 && p.t < a.duration) a.currentTime = p.t;
      }
    };
    const onTime = () => {
      $tiempo.set(a.currentTime);
      const e = $episodio.get();
      if (!e || !a.duration) return;
      const pct = (a.currentTime / a.duration) * 100;
      for (const h of HITOS) {
        if (pct >= h && !hitos.current.has(h)) {
          hitos.current.add(h);
          evento('escuchado', { episodio: e.id, porcentaje: h });
        }
      }
    };
    const onPlay = () => $reproduciendo.set(true);
    const onPause = () => {
      $reproduciendo.set(false);
      const e = $episodio.get();
      if (e) guardarPosicion(e.id, a.currentTime, a.duration);
    };
    const onWaiting = () => $cargando.set(true);
    const onCanPlay = () => $cargando.set(false);
    const onEnded = () => {
      $reproduciendo.set(false);
      const e = $episodio.get();
      if (e) guardarPosicion(e.id, a.duration, a.duration);
    };
    const onError = () => {
      $cargando.set(false);
      $error.set('No se pudo cargar el audio.');
    };
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('waiting', onWaiting);
    a.addEventListener('playing', onCanPlay);
    a.addEventListener('canplay', onCanPlay);
    a.addEventListener('ended', onEnded);
    a.addEventListener('error', onError);
    return () => {
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('waiting', onWaiting);
      a.removeEventListener('playing', onCanPlay);
      a.removeEventListener('canplay', onCanPlay);
      a.removeEventListener('ended', onEnded);
      a.removeEventListener('error', onError);
    };
  }, []);

  /* ---- Posición guardada cada 5 s ---- */
  useEffect(() => {
    if (!reproduciendo) return;
    const id = window.setInterval(() => {
      const a = audioRef.current;
      const e = $episodio.get();
      if (a && e) guardarPosicion(e.id, a.currentTime, a.duration);
    }, 5000);
    return () => window.clearInterval(id);
  }, [reproduciendo]);

  /* ---- Picos del episodio ---- */
  useEffect(() => {
    if (!ep) return;
    let vivo = true;
    fetch(`${ep.ruta}/picos.json`)
      .then((r) => (r.ok ? r.json() : { picos: [] }))
      .then((d) => {
        if (vivo && Array.isArray(d.picos) && d.picos.length) $picos.set(d.picos);
      })
      .catch(() => {});
    return () => {
      vivo = false;
    };
  }, [ep?.id]);

  /* ---- Media Session ---- */
  useEffect(() => {
    if (!ep || !('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    ms.metadata = new MediaMetadata({
      title: ep.titulo,
      artist: ep.podcast,
      album: `Episodio ${ep.numero}`,
      artwork: [{ src: `${location.origin}/img/portada-512.png`, sizes: '512x512', type: 'image/png' }],
    });
    const a = audioRef.current;
    ms.setActionHandler('play', () => a?.play());
    ms.setActionHandler('pause', () => a?.pause());
    ms.setActionHandler('seekbackward', (d) => saltar(-(d.seekOffset ?? 15)));
    ms.setActionHandler('seekforward', (d) => saltar(d.seekOffset ?? 30));
    ms.setActionHandler('seekto', (d) => {
      if (d.seekTime !== undefined) irA(d.seekTime, false);
    });
    return () => {
      for (const acc of ['play', 'pause', 'seekbackward', 'seekforward', 'seekto'] as MediaSessionAction[]) {
        try {
          ms.setActionHandler(acc, null);
        } catch {}
      }
    };
  }, [ep?.id]);
  useEffect(() => {
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = reproduciendo ? 'playing' : 'paused';
  }, [reproduciendo]);
  useEffect(() => {
    if (!('mediaSession' in navigator) || !duracion) return;
    try {
      navigator.mediaSession.setPositionState({ duration: duracion, playbackRate: velocidad, position: Math.min(tiempo, duracion) });
    } catch {}
  }, [Math.floor(tiempo), duracion, velocidad]);

  /* ---- Teclado global ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!$episodio.get()) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target instanceof HTMLElement ? e.target : null;
      const tag = t?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t?.isContentEditable) return;
      if (t?.closest('[role="slider"]')) return; // el slider maneja sus flechas
      switch (e.key) {
        case ' ':
          if (tag === 'BUTTON' || tag === 'A') return; // dejá que el botón enfocado actúe
          e.preventDefault();
          togglePlay();
          break;
        case 'k':
        case 'K':
          e.preventDefault();
          togglePlay();
          break;
        case 'j':
        case 'J':
        case 'ArrowLeft':
          e.preventDefault();
          saltar(-15);
          break;
        case 'l':
        case 'L':
        case 'ArrowRight':
          e.preventDefault();
          saltar(30);
          break;
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ---- Alto del mini-reproductor → padding del body ---- */
  useEffect(() => {
    const el = contRef.current;
    const raiz = document.documentElement;
    if (!ep || !el) {
      raiz.style.removeProperty('--alto-reproductor');
      return;
    }
    const aplicar = () => raiz.style.setProperty('--alto-reproductor', `${el.offsetHeight}px`);
    aplicar();
    const ro = new ResizeObserver(aplicar);
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [ep?.id]);

  /* ---- Barra: clic, arrastre, hover, teclado ---- */
  const total = duracion || ep?.duracion || 0;
  const tiempoDeX = useCallback(
    (clientX: number) => {
      const r = barraRef.current?.getBoundingClientRect();
      if (!r || r.width === 0) return 0;
      const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      return ratio * total;
    },
    [total],
  );
  const capituloEn = (t: number) => {
    if (!ep?.capitulos.length) return null;
    let c = ep.capitulos[0];
    for (const x of ep.capitulos) {
      if (x.t <= t) c = x;
      else break;
    }
    return c.titulo;
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (!ep) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setArrastrando(true);
    $tiempo.set(tiempoDeX(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const t = tiempoDeX(e.clientX);
    const r = barraRef.current?.getBoundingClientRect();
    if (r) setHover({ x: e.clientX - r.left, t, titulo: capituloEn(t) });
    if (arrastrando) $tiempo.set(t);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!arrastrando) return;
    setArrastrando(false);
    irA(tiempoDeX(e.clientX), reproduciendo);
  };
  const onKeyBarra = (e: React.KeyboardEvent) => {
    const paso = e.shiftKey ? 30 : 5;
    let t: number | null = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') t = tiempo - paso;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') t = tiempo + paso;
    if (e.key === 'Home') t = 0;
    if (e.key === 'End') t = total - 1;
    if (e.key === 'PageDown') t = tiempo - 60;
    if (e.key === 'PageUp') t = tiempo + 60;
    if (t === null) return;
    e.preventDefault();
    irA(Math.max(0, Math.min(total, t)), reproduciendo);
  };

  const barras = picos ? remuestrear(picos, BARRAS) : null;
  const limite = Math.round(progreso * BARRAS);

  return (
    <>
      <audio ref={audioRef} preload="none" />
      {ep && (
        <div ref={contRef} className="repro" role="region" aria-label="Reproductor">
          <div className="repro__fila contenedor">
            <div className="repro__controles">
              <button
                type="button"
                className="repro__play"
                onClick={() => togglePlay()}
                aria-label={reproduciendo ? 'Pausar' : 'Reproducir'}
                aria-pressed={reproduciendo}
                data-cargando={cargando || undefined}
              >
                {reproduciendo ? <Icono nombre="pausa" /> : <Icono nombre="play" />}
              </button>
              <button type="button" className="repro__salto" onClick={() => saltar(-15)} aria-label="Retroceder 15 segundos">
                <Icono nombre="atras" />
              </button>
              <button type="button" className="repro__salto" onClick={() => saltar(30)} aria-label="Adelantar 30 segundos">
                <Icono nombre="adelante" />
              </button>
            </div>

            <div className="repro__info">
              <a href={ep.ruta} className="repro__titulo">
                <span className="repro__n">{ep.numero}</span> {ep.titulo}
              </a>
              <p className="repro__capitulo" aria-live="off">
                {error ? <span className="repro__error">{error}</span> : capitulo ? capitulo.titulo : ep.podcast}
              </p>
            </div>

            <div className="repro__barra-zona">
              <div
                ref={barraRef}
                className="repro__barra"
                role="slider"
                tabIndex={0}
                aria-label="Posición en el episodio"
                aria-valuemin={0}
                aria-valuemax={Math.round(total)}
                aria-valuenow={Math.round(tiempo)}
                aria-valuetext={`${duracionAccesible(tiempo)} de ${duracionAccesible(total)}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => setArrastrando(false)}
                onPointerLeave={() => setHover(null)}
                onKeyDown={onKeyBarra}
                data-arrastrando={arrastrando || undefined}
              >
                {barras ? (
                  <svg className="repro__onda" viewBox={`0 0 ${BARRAS} 100`} preserveAspectRatio="none" aria-hidden="true">
                    {barras.map((p, i) => {
                      const h = Math.max(4, p * 96);
                      return <rect key={i} x={i + 0.2} y={50 - h / 2} width={0.6} height={h} className={i < limite ? 'barra barra--hecha' : 'barra'} />;
                    })}
                  </svg>
                ) : (
                  <div className="repro__linea">
                    <div className="repro__linea-hecha" style={{ transform: `scaleX(${progreso})` }} />
                  </div>
                )}
                {ep.capitulos.slice(1).map((c) => (
                  <span key={c.t} className="repro__marca" style={{ left: `${total ? (c.t / total) * 100 : 0}%` }} aria-hidden="true" />
                ))}
                <span className="repro__cursor" style={{ left: `${progreso * 100}%` }} aria-hidden="true" />
                {hover && (
                  <span className="repro__tooltip" style={{ left: hover.x }} aria-hidden="true">
                    <span className="mono">{formatoCorto(hover.t)}</span>
                    {hover.titulo && <span className="repro__tooltip-cap">{hover.titulo}</span>}
                  </span>
                )}
              </div>
            </div>

            <div className="repro__tiempos">
              <span className="mono">
                <span aria-hidden="true">{formatoCorto(tiempo)}</span>
                <span className="sr-only">{duracionAccesible(tiempo)}</span>
                {' / '}
                <span aria-hidden="true">{formatoCorto(total)}</span>
                <span className="sr-only">{duracionAccesible(total)}</span>
              </span>
              <button
                type="button"
                className="repro__velocidad mono"
                onClick={() => {
                  siguienteVelocidad();
                  evento('velocidad', { episodio: ep.id, velocidad: $velocidad.get() });
                }}
                aria-label={`Velocidad ${velocidad.toString().replace('.', ',')}. Cambiar velocidad`}
              >
                {velocidad.toString().replace('.', ',')}×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
