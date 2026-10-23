# Brief para Claude Code — Web del podcast [NOMBRE DEL PODCAST]

> **Cómo usar este archivo**
> 1. Completá la sección 0 (todo lo que está entre `[corchetes]`).
> 2. Guardalo en una carpeta vacía.
> 3. Abrí Claude Code en esa carpeta y escribí:
>    `Leé BRIEF-web-podcast.md completo. Ejecutalo fase por fase (sección 12). Al terminar cada fase frená, mostrame capturas y esperá mi OK.`

---

## 0. Datos a completar

| Dato | Valor |
|---|---|
| Nombre del podcast | `[NOMBRE]` |
| Dominio | `[dominio.com]` |
| Skill de animación web (nombre exacto) | `[NOMBRE-DEL-SKILL]` |
| Hosting del audio | `[Spotify for Creators / Transistor / Buzzsprout / otro]` |
| Feed RSS del podcast | `[URL]` |
| Links del show | YouTube `[ ]` · Spotify `[ ]` · Apple Podcasts `[ ]` · Ivoox `[opcional]` |
| Newsletter | `[Buttondown / Substack / Beehiiv / ninguno por ahora]` |
| Analytics | `[Plausible / Umami / Cloudflare Web Analytics]` |
| Conductor/es | `[nombre + bio de 2 líneas]` |
| Color de acento | `[hex, o "proponé vos"]` |

Si un dato falta: usá un placeholder visible `TODO:` y seguí. **Nunca inventes URLs, nombres ni cifras.**

---

## 1. Qué estás construyendo

La web de un podcast sobre **inteligencia artificial aplicada a problemas de política pública, sociedad y economía**, con foco en Argentina y América Latina. No es un podcast de novedades tecnológicas: cada episodio toma un problema público concreto (una ley, un trámite, un mercado de trabajo, un servicio municipal) y analiza qué cambia —y qué no— con IA.

**Audiencia:** funcionarios, legisladores y asesores, periodistas, investigadores, gente de ONG y público informado no técnico.

**Idioma:** español rioplatense con voseo en toda la interfaz ("Escuchalo", "Suscribite", "Empezá por acá"). `lang="es-AR"`.

**Tono:** sobrio, riguroso, evidencia primero. La web tiene que transmitir "acá se chequea todo".

**Lo que la web tiene que lograr, en orden:**
1. Que alguien nuevo pruebe un episodio en un clic.
2. Que suscribirse en su plataforma no tenga fricción.
3. Que cada episodio sea un documento consultable: resumen, capítulos, fuentes y transcripción.
4. Que todo sea indexable por buscadores y por motores de respuesta de IA.
5. Que publicar un episodio nuevo sea agregar un archivo y correr dos comandos.

---

## 2. Reglas de trabajo

- Trabajá por fases (sección 12). Al cierre de cada una: `npm run build` sin errores ni warnings, capturas con Playwright a 390 px y 1440 px (modo claro y oscuro), resumen de 5 líneas de lo hecho, y **esperá mi OK**.
- Antes de instalar una dependencia que no esté en este brief, justificala en una línea.
- Un commit por bloque lógico, mensajes en español.
- Si algo del brief choca con una buena práctica técnica, decímelo y proponé una alternativa; no lo resuelvas en silencio.
- Si existen los skills `frontend-design` o `anti-slop-audit` en mi máquina, cargalos en las fases 2 y 7.

---

## 3. Stack

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Astro 6**, salida estática | Resúmenes y transcripciones llegan como HTML renderizado (indexable); JS solo en islas. Requiere Node ≥ 22.12: verificá con `node -v`. Instalá con `npm create astro@latest` y usá la última versión estable. |
| Contenido | **Content Collections** con esquemas Zod (`src/content.config.ts`, loader `glob`), archivos `.md` / `.mdx` | Un episodio = un archivo validado. MDX permite embeber un gráfico interactivo cuando un episodio use datos. |
| Navegación | `<ClientRouter />` (View Transitions) + `transition:persist` | El reproductor sigue sonando al cambiar de página. Re-inicializá scripts en `astro:page-load`. |
| Interactividad | Islas React solo donde haga falta (reproductor, filtros). Estado compartido con `nanostores`. | |
| Animación | Lo que indique mi skill (sección 7). Si usa Motion / framer-motion: `motion/react` dentro de islas y la API vanilla de `motion` (`animate`, `inView`, `scroll`) en scripts de Astro. Si usa GSAP, en scripts de Astro. | |
| Estilos | Tailwind CSS v4 con tokens en `@theme` | |
| Fuentes | Self-hosted (API de fuentes de Astro o Fontsource), subset latino | Nada de Google Fonts en runtime. |
| Búsqueda | **Pagefind** (índice estático post-build) | Busca dentro de las transcripciones sin backend. |
| Imágenes OG y kit de redes | `satori` + `@resvg/resvg-js` en build | |
| Video | `lite-youtube-embed` (fachada: el iframe carga recién al hacer clic) | Performance. |
| Feeds | `@astrojs/rss`, `@astrojs/sitemap` | |
| Newsletter y formularios | Componente aislado que postea al proveedor de la sección 0 | Cambiar de proveedor = tocar un solo archivo. |
| Analytics | Sin cookies, el de la sección 0 | |
| Deploy | Cloudflare Pages (alternativa: Vercel / Netlify) | |

---

## 4. Arquitectura de información

### Rutas

| Ruta | Qué es |
|---|---|
| `/` | Home |
| `/episodios` | Archivo con filtros y búsqueda |
| `/episodios/[slug]` | Página de episodio (núcleo del sitio) |
| `/temas/[tema]` | Página por tema |
| `/invitados/[slug]` | Página por invitado |
| `/empezar` | "Empezá por acá": recorrido curado para quien llega por primera vez |
| `/fuentes` | Biblioteca de todas las fuentes citadas |
| `/glosario`, `/glosario/[termino]` | Glosario de IA para no técnicos |
| `/acerca` | Quiénes somos, método, uso de IA, conflictos de interés, contacto, kit de prensa |
| `/correcciones` | Fe de erratas pública |
| `/suscribirse` | Todas las plataformas + newsletter |
| `/proponer-un-caso` | Formulario: la audiencia propone problemas públicos para analizar |
| `/kit/[slug]` | Kit de redes del episodio (`noindex`) |
| `/estilo` | Guía de estilo viva (`noindex`) |
| `/feed` | Redirección 301 al RSS del hosting |
| `/rss.xml` | Feed de la web (novedades) |
| `/llms.txt`, `/sitemap-index.xml`, `/robots.txt` | |
| `/episodios/[slug]/capitulos.json` | Capítulos en formato JSON Chapters (Podcasting 2.0) |
| `/episodios/[slug]/transcripcion.vtt` | Transcripción en WebVTT |
| `/og/[slug].png` | Imagen para previews de links, 1200×630 |
| `/kit/[slug]/horizontal.png` y `/kit/[slug]/vertical.png` | Piezas para redes, **1080×608** y **1080×1350** |

**Navegación:** Episodios · Temas · Fuentes · Acerca · botón **Suscribite**. Máximo 5 ítems. Header simple fijo arriba (no una píldora flotante que tape contenido); todas las anclas con `scroll-margin-top`.

### Home (en este orden)

1. **Último episodio como protagonista**: "Episodio 12", título grande, bajada, fecha, duración, formato, botón **Reproducir** (carga el reproductor persistente) y fila "Escuchalo en": YouTube · Spotify · Apple Podcasts · RSS. Como visual, la waveform real del episodio (sección 8).
2. **Qué es el podcast** en una o dos oraciones. Nada de manifiesto largo.
3. **Episodios recientes** (6) como lista editorial, no como grilla de cards iguales: número, título, bajada de una línea, formato, duración, play inline.
4. **Tres ejes** —Política pública · Sociedad · Economía— como puertas de entrada a los temas, con el conteo real de episodios de cada uno.
5. **Empezá por acá**: 3 a 5 episodios elegidos a mano (campo `destacado` en el contenido).
6. **Newsletter**: una línea + campo de email.
7. **Footer**: plataformas, RSS, redes, método, correcciones, contacto.

### Archivo `/episodios`

- Orden cronológico inverso. Filtros por eje, formato, tema, invitado y año; el estado vive en la URL (`?eje=economia&formato=debate`) para poder compartir la vista.
- Búsqueda full-text con Pagefind que incluya transcripciones y muestre el fragmento donde aparece el término.
- Cada fila: n.º, título, bajada, fecha, duración, formato, invitados y botón play que carga el episodio en el reproductor **sin navegar**.

### Página de episodio (en este orden)

1. **Migas**: Episodios / N.º 12.
2. **Encabezado**: "Temporada 1 · Episodio 12", título (`h1`), bajada, fecha, duración, formato, eje, invitados con link.
3. **Reproducir**: botón grande que carga el episodio en el reproductor persistente. Debajo, "Ver en video" con `lite-youtube` (no carga nada hasta el clic).
4. **Escuchalo en**: links **al episodio específico** en cada plataforma (no al show).
5. **En 2 minutos** (el resumen): 3 a 5 puntos de "qué te llevás" + un párrafo de contexto de 150–250 palabras. Al pie, legible: "Resumen redactado con asistencia de IA y revisado por [nombre]".
6. **Frase destacada**: una cita textual del episodio con autor y timestamp; botón "Compartir" que abre las piezas 1080×1350 / 1080×608.
7. **Capítulos**: timestamps clicables que saltan el audio; mientras suena, el capítulo en curso queda resaltado.
8. **Fuentes y datos citados**: agrupadas por tipo (Ley o norma · Dataset · Paper · Documento oficial · Nota periodística), con organismo, fecha, link y qué dato sale de cada una. Cada fuente marcada como *verificada* o *pendiente de verificación*.
9. **Cómo usamos IA en este episodio**: qué hizo la IA (p. ej., transcripción, borrador del resumen), qué no hizo (p. ej., elegir fuentes, sacar conclusiones) y quién revisó.
10. **Invitados**: foto, bio corta, links y conflictos de interés declarados (o "Sin conflictos declarados").
11. **¿Qué pasó después?** (opcional): seguimiento del tema con fecha de actualización (el proyecto se aprobó, el programa se discontinuó, etc.).
12. **Transcripción completa**:
    - **Siempre visible en el HTML inicial.** Nada de esconderla tras un colapsable, `display:none` o un "ver más" con `max-height`.
    - Índice de capítulos *sticky* en desktop.
    - Oradores identificados, timestamp clicable al inicio de cada párrafo y botón "Copiar link a este momento" (`?t=754`).
    - Primera aparición de cada término del glosario enlazada, con tooltip accesible.
    - Modo "Seguir lectura" (apagado por defecto): el párrafo en curso se resalta y la página acompaña el audio.
13. **Correcciones** del episodio, si las hay, con fecha.
14. **Episodios relacionados**: 3, por temas compartidos.
15. **Newsletter**.

**Deep links:** `/episodios/[slug]?t=754` posiciona el reproductor en 12:34 y muestra "Reproducir desde 12:34" (sin autoplay).

### Otras páginas

- **Invitado**: foto, rol, bio, links, episodios, conflictos declarados.
- **Tema**: descripción corta escrita a mano, episodios y términos del glosario relacionados.
- **Glosario**: término, definición de 2–3 líneas para no técnicos, episodios donde aparece.
- **Fuentes**: biblioteca de todas las fuentes de todos los episodios (deduplicadas por URL), filtrable por tipo, organismo, año y episodio.
- **Acerca / método**: qué es el podcast, quién conduce, línea editorial, cómo verificamos, cómo usamos IA en la producción, política de conflictos de interés (invitados y conductores), cómo pedir una corrección, contacto y kit de prensa (logo, fotos, descripción en 50 y 150 palabras).
- **Proponer un caso**: nombre, email, organización (opcional), el problema en 500 caracteres, link a datos o documentos.
- **404** útil: buscador + últimos episodios.

---

## 5. Modelo de contenido

Colecciones: `episodios`, `invitados`, `temas`, `glosario`, `conductores`.

### Episodio (frontmatter)

```yaml
---
numero: 1
temporada: 1
titulo: "¿Puede una IA asesorar a un senador?"
bajada: "Un modelo de lenguaje y un asesor legislativo analizan el mismo proyecto de ley. Comparamos."
fecha: 2026-11-15
duracion: "00:52:10"
formato: laboratorio        # laboratorio | caso | investigacion | debate | entrevista | especial
ejes: [politica-publica]    # politica-publica | sociedad | economia
temas: [legislacion, asesoramiento-legislativo]
invitados: [nombre-apellido]          # referencias a la colección invitados
destacado: false                      # aparece en "Empezá por acá"
audio:
  url: "https://..."                  # MP3 servido por el hosting (así el hosting cuenta las descargas)
  bytes: 0
youtube: "VIDEO_ID"
plataformas:
  youtube: "https://..."
  spotify: "https://..."
  apple: "https://..."
resumen:
  puntos:
    - "..."
  contexto: "..."
frase:
  texto: "..."
  autor: "..."
  t: "00:23:41"
capitulos:
  - { t: "00:00:00", titulo: "Presentación" }
  - { t: "00:04:12", titulo: "El proyecto de ley" }
fuentes:
  - titulo: "..."
    url: "https://..."
    tipo: norma               # norma | dataset | paper | documento-oficial | nota
    organismo: "..."
    fecha: 2026-03-01
    verificada: true
    nota: "Qué dato sale de acá"
ia:
  usada_para: ["transcripción", "borrador del resumen"]
  no_usada_para: ["selección de fuentes", "conclusiones"]
  revisado_por: "[nombre]"
seguimiento: []               # [{ fecha, texto }]
correcciones: []              # [{ fecha, texto }]
estado: publicado             # borrador | publicado
ejemplo: false                # true en el contenido semilla
---
```

### Transcripción (cuerpo del archivo)

```markdown
## Presentación

[00:00:00] **Conductor:** Texto del párrafo…

[00:00:42] **Invitada:** Texto del párrafo…

## El proyecto de ley

[00:04:12] **Conductor:** …
```

Escribí un plugin de remark que convierta `[hh:mm:ss]` al inicio de cada párrafo en un botón de salto (`data-t` en segundos) con `id="t-{segundos}"`, y que vincule cada `##` con su capítulo.

### Reglas de validación (esquema Zod + `npm run check:contenido`)

- `slug` con formato `NNN-titulo-corto` (p. ej. `001-puede-una-ia-asesorar-a-un-senador`).
- Un episodio `publicado` necesita: audio, al menos un capítulo, al menos una fuente, resumen completo y bloque `ia`.
- Capítulos ordenados, el primero en `00:00:00`, ninguno posterior a la duración.
- Los borradores no se construyen en producción.
- `check:contenido` revisa además links rotos en fuentes y plataformas, imágenes sin `alt` e invitados referenciados que no existen.

### Contenido semilla

Creá 3 episodios de ejemplo (`ejemplo: true`, con un aviso visible "Contenido de ejemplo") para probar todos los estados de la UI:
- Formato *laboratorio*: IA vs. asesor humano analizando un proyecto de ley.
- Formato *caso*: un municipio que implementa IA en la atención al vecino.
- Formato *investigación*: chatbots respondiendo sobre normativa argentina, contrastados con fuentes oficiales.

Para el audio de prueba generá un MP3 local con ffmpeg (`ffmpeg -f lavfi -i "sine=frequency=220:duration=600" -b:a 64k public/audio/ejemplo.mp3`). No descargues audio de terceros.

---

## 6. Reproductor persistente

- **Un solo `<audio>`** en el layout, dentro de una isla con `transition:persist="reproductor"`. Estado (episodio actual, tiempo, reproduciendo, velocidad) en un store de `nanostores` compartido con el resto de las islas.
- `preload="none"` hasta que el usuario toque play. Nunca autoplay.
- **Controles**: play/pausa, −15 s, +30 s, velocidad (0,8 · 1 · 1,25 · 1,5 · 1,75 · 2), barra de progreso con marcas de capítulos (al pasar el mouse muestra el título del capítulo), tiempo transcurrido / total en números tabulares, capítulo en curso, link a la página del episodio.
- **Mini-reproductor** fijo abajo cuando hay algo cargado; en mobile respeta `safe-area-inset-bottom` y agrega `padding-bottom` al body para no tapar contenido.
- **Teclado** (solo si el foco no está en un input): Espacio o K play/pausa · J o ← −15 s · L o → +30 s.
- **Media Session API**: título, nombre del podcast, artwork y acciones (play, pause, seekbackward, seekforward, seekto) para los controles de pantalla bloqueada.
- **Posición guardada** por episodio en `localStorage` cada 5 s (envuelto en try/catch); al volver: "Seguir desde 23:10".
- **Deep links** `?t=` (sección 4).
- Accesible: botones con `aria-label`, `aria-pressed` en play, barra de progreso con `role="slider"` y valores legibles ("12 minutos 34 segundos de 52 minutos").
- Eventos de analytics: play, 25 / 50 / 75 / 95 % escuchado, clic en capítulo, cambio de velocidad, clic en cada plataforma.

---

## 7. Animación — usá mi skill

1. **Antes de escribir una sola animación, cargá mi skill `[NOMBRE-DEL-SKILL]`** (buscalo en `~/.claude/skills/` y `.claude/skills/`). Si el nombre sigue sin completar, listá los skills instalados cuyo nombre o descripción hable de animación, decime cuáles encontraste y esperá que elija.
2. Resumime sus reglas en 5 puntos antes de aplicarlas. **Sus reglas mandan** sobre las de esta sección, salvo en accesibilidad y performance.

Dónde la animación suma y dónde no:

| Sí | No |
|---|---|
| Transición archivo → episodio con elemento compartido (número y título con `view-transition-name`) | Scroll-jacking o parallax sobre texto |
| Waveform que se dibuja al entrar en pantalla y se llena con el progreso en el reproductor | Texto del cuerpo animado letra por letra |
| Aparición sutil de secciones al hacer scroll (opacidad + 8–16 px, una sola vez) | Loops decorativos infinitos |
| Listas con stagger ≤ 40 ms por ítem, tope 6 ítems | Animaciones de interfaz de más de 600 ms |
| Capítulo en curso y párrafo en curso resaltados suavemente | Animar algo antes del LCP o que genere layout shift |
| Micro-interacciones del reproductor (play ↔ pausa, hover de la barra) | Animar propiedades que no sean `transform` y `opacity` |

`prefers-reduced-motion: reduce` → sin desplazamientos ni escalas; solo cambios instantáneos o fundidos ≤ 150 ms; View Transitions desactivadas.

---

## 8. Dirección visual: minimalista y sin "cara de IA"

**Concepto:** revista de política pública / cuaderno de investigación. La tipografía y el contenido hacen el diseño.

**Legibilidad por sobre el aire** (no negociable):
- Cuerpo 18–19 px en desktop, mínimo 17 px en mobile; interlineado 1,55–1,65; medida de 60–72 caracteres.
- Metadatos nunca por debajo de 14 px.
- Contraste mínimo 4,5:1 en todo texto; apuntá a 7:1 en el cuerpo. Nada de gris clarito sobre blanco.
- Espaciado justo: no uses colchones de aire que obliguen a achicar la tipografía.

**Tipografía:** proponé 3 combinaciones (titulares + texto + monoespaciada para tiempos) y justificá cada una. Evitá los defaults de IA (Inter, Poppins, Montserrat, Space Grotesk). Candidatas: titulares serif con carácter (Newsreader, Literata, Source Serif 4); texto (Public Sans, Atkinson Hyperlegible Next, IBM Plex Sans); mono (IBM Plex Mono, JetBrains Mono). Números tabulares en duraciones, timestamps y tablas.

**Color:** base de papel y tinta + **color de marca naranja señal** (`#ff5f2e`: logo, botón principal, waveform, detalles) + **acento azul** semántico: estado de reproducción, capítulo en curso, links. Toques técnicos sobrios: retícula de puntos tenue, rótulos en mono, hero tipo consola de estudio. Modo oscuro con `prefers-color-scheme` + toggle que se recuerda.

**Identidad:** la **waveform real de cada episodio** (picos calculados del audio, sección 11) es la firma visual: hero de la home, mini-waveform en el archivo, barra del reproductor, imágenes OG y kit de redes. Nada de robots, cerebros, circuitos, redes neuronales brillantes ni ilustraciones genéricas generadas con IA.

**Prohibido (lista anti "cara de IA"):**
- Gradientes mesh, blobs, glassmorphism, bordes con glow.
- La última palabra del título pintada con el color de acento.
- Etiquetas "eyebrow" arriba de cada sección.
- Grillas de 3 cards idénticas con ícono arriba.
- Emojis como íconos.
- Navbar en píldora flotante.
- Hero centrado con dos botones y subtítulo genérico.
- Secciones que repiten la misma plantilla.
- Cifras, logos de medios o testimonios inventados.
- Copy del tipo "Revolucionando…", "El futuro de…", "Descubrí el poder de…".
- Sombras difusas y esquinas muy redondeadas en todo.

**Íconos:** un set de línea fino y consistente (Lucide o Phosphor), solo donde aportan (play, pausa, plataformas). Para las plataformas, usá los badges y logos oficiales respetando sus guías de marca.

---

## 9. SEO, metadatos y feeds

- **JSON-LD**:
  - `PodcastSeries` en la home (name, description, url, image, author / publisher, `webFeed` con el RSS del hosting).
  - `PodcastEpisode` en cada episodio: name, description, url, datePublished, episodeNumber, partOfSeries, image, `associatedMedia` (AudioObject con `contentUrl` y `duration` en ISO 8601) y personas (conductores e invitados como `Person`).
  - `Person` en las páginas de invitados y `BreadcrumbList` en todas.
  - **Lo que diga el JSON-LD tiene que coincidir con lo visible en la página.** Validá cada plantilla con el Schema Markup Validator.
- `<title>`: `{título} · {podcast} #{n}`. Meta description = bajada (≤ 160 caracteres).
- Canonical propio en cada página, sitemap y robots.
- **OG**: 1200×630 por episodio (n.º, título, waveform, nombre del podcast) + `twitter:card = summary_large_image`.
- **Kit de redes** (`/kit/[slug]`, `noindex`): piezas **1080×608** (horizontal, la prioritaria) y **1080×1350** (vertical) con título, frase destacada y waveform, listas para descargar.
- **Podcasting 2.0**: generá en build `capitulos.json` (formato JSON Chapters, `"version": "1.2.0"`) y `transcripcion.vtt` por episodio, en URLs estables, para que el RSS del hosting los referencie con `<podcast:chapters>` y `<podcast:transcript>`. Fuente única de verdad: el `.md` del episodio.
- **`/llms.txt`**: descripción del podcast + lista de episodios con link y bajada, generado en build.
- **`/rss.xml`** de la web y redirección `/feed` → RSS del hosting.

---

## 10. Accesibilidad y performance

- WCAG 2.2 AA: skip link, foco visible, landmarks, jerarquía de títulos correcta, todo operable con teclado, `alt` en imágenes, áreas táctiles ≥ 24 px (≥ 44 px en el reproductor).
- Lighthouse mobile ≥ 95 en las cuatro categorías. LCP < 2 s, CLS < 0,05, INP < 200 ms.
- JS total de la página de episodio < 100 KB gzip (sin contar YouTube después del clic).
- Imágenes AVIF / WebP con `width` y `height`; lazy loading fuera del primer viewport.
- Probá en 360, 390, 768, 1024, 1440 y 1920 px.

---

## 11. Flujo para publicar un episodio

Scripts en `package.json`:

| Comando | Qué hace |
|---|---|
| `npm run nuevo-episodio` | Pregunta número y título, arma el slug y crea el `.md` desde una plantilla con `estado: borrador`. |
| `npm run importar-transcripcion -- archivo.(vtt\|srt\|json) slug` | Convierte la transcripción a párrafos `[hh:mm:ss] **Orador:**`, une segmentos cortos por orador y pausa, saca muletillas evidentes y la pega en el cuerpo del episodio. |
| `npm run peaks -- slug` | Con ffmpeg calcula ~400 picos del audio y los guarda en `src/data/peaks/slug.json` (la waveform). |
| `npm run check:contenido` | Valida esquemas, links, capítulos y referencias. |

Creá además un **skill del proyecto** en `.claude/skills/nuevo-episodio/SKILL.md` que, a partir de la transcripción y mis notas:
1. Redacte el resumen (3–5 puntos + contexto de 150–250 palabras) en rioplatense.
2. Proponga capítulos con timestamps.
3. Liste cada dato o afirmación verificable del episodio y busque la **fuente primaria** (boletín oficial, organismo, paper, dataset). Si no la encuentra, la marca `verificada: false`. **Nunca inventa URLs.**
4. Proponga la frase destacada, términos de glosario y episodios relacionados.
5. Complete el bloque `ia` y deje `estado: borrador`. Nunca publica: reviso yo.

README en español con este flujo paso a paso.

---

## 12. Fases

| Fase | Entregable | Cierre |
|---|---|---|
| **F0 — Lectura y plan** | Cargar el skill de animación y resumir sus reglas; 3 propuestas tipográficas + color de acento; confirmar stack. | Esperá mi elección. |
| **F1 — Base** | Astro + Tailwind, colecciones y esquemas, contenido semilla, MP3 de prueba, peaks. | Build OK. |
| **F2 — Sistema visual** | Tokens, tipografía, layout, header / footer, modo oscuro, página `/estilo`. | Capturas claro / oscuro. |
| **F3 — Reproductor** | Reproductor persistente completo, deep links, Media Session, posición guardada. | GIF navegando entre páginas sin que se corte el audio. |
| **F4 — Páginas** | Episodio (completa), home, archivo con filtros, temas, invitados, glosario, fuentes, acerca, correcciones, suscribirse, proponer un caso, 404. | Capturas de cada una. |
| **F5 — Descubribilidad** | Pagefind, JSON-LD, OG, kit de redes, feeds, `capitulos.json`, `.vtt`, `llms.txt`, sitemap. | JSON-LD validado. |
| **F6 — Animación** | Pasada completa con el skill, incluida la versión con movimiento reducido. | GIF con y sin reduced motion. |
| **F7 — QA** | Lighthouse, axe, recorrido solo con teclado, capturas en 6 anchos, links rotos, auditoría anti "cara de IA" ítem por ítem (✓ / ✗) contra la sección 8. | Informe de QA. |
| **F8 — Publicación** | Scripts de la sección 11, skill `nuevo-episodio`, README, configuración de deploy. | Listo para subir. |

---

## 13. Definición de terminado

- [ ] Un episodio nuevo se publica agregando un `.md` y corriendo `importar-transcripcion` y `peaks`.
- [ ] El audio no se corta al navegar entre páginas.
- [ ] La transcripción completa está en el HTML inicial de cada episodio.
- [ ] Cada episodio publicado tiene resumen, capítulos, fuentes, bloque de uso de IA y JSON-LD válido.
- [ ] La búsqueda encuentra términos dentro de las transcripciones.
- [ ] Lighthouse mobile ≥ 95 en las cuatro categorías.
- [ ] Todo funciona con teclado y con movimiento reducido.
- [ ] No aparece ninguno de los ítems prohibidos de la sección 8.
- [ ] No hay ninguna URL, cifra o nombre inventado en todo el sitio.
