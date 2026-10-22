# Señal Pública · web del podcast

Sitio estático del podcast **Señal Pública** (inteligencia artificial aplicada a problemas públicos en Argentina y América Latina). Astro 7, Tailwind 4, islas React solo para el reproductor, Pagefind para la búsqueda. Cada episodio es un archivo Markdown validado: de ahí salen la página, el resumen, los capítulos, las fuentes, la transcripción, el VTT, el JSON de capítulos, las imágenes para redes y el JSON-LD.

> El contenido actual es **de ejemplo**: episodios, invitados, cifras y datos del sitio son ficticios para la demo. Antes de publicar, reemplazá todo lo marcado `// TODO` en `src/config/sitio.ts` y borrá los episodios con `ejemplo: true`.

## Requisitos

- Node 22.12 o superior (el proyecto fija 24 en `.node-version`).
- ffmpeg en el PATH (para calcular la waveform y, solo en la demo, generar el audio de prueba).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/ + índice de Pagefind
npm run preview      # sirve dist/
```

## Publicar un episodio nuevo

Son cinco pasos. Los tres del medio son un archivo y dos comandos.

### 1. Crear el archivo

```bash
npm run nuevo-episodio
# o sin preguntas:
npm run nuevo-episodio -- --numero 4 --titulo "El título del episodio"
```

Crea `src/content/episodios/004-el-titulo-del-episodio.md` desde `plantillas/episodio.md`, con `estado: borrador`. Completá a mano:

- `bajada`, `fecha`, `duracion` (`hh:mm:ss`), `formato`, `ejes`, `temas`, `invitados` (slugs de `src/content/temas` e `invitados`).
- `audio.url`: el MP3 **servido por el hosting** (así el hosting cuenta descargas) y `audio.bytes`.
- `youtube` (ID del video) y `plataformas` con el link **al episodio** en cada una.

### 2. Importar la transcripción

```bash
npm run importar-transcripcion -- transcripcion.vtt 004-el-titulo-del-episodio
# con nombres de oradores si el archivo trae etiquetas genéricas:
npm run importar-transcripcion -- transcripcion.json 004-el-titulo-del-episodio --oradores "SPEAKER_00=Lucía Ferreyra,SPEAKER_01=Nombre Invitado"
```

Acepta VTT, SRT y JSON (Whisper, WhisperX, AssemblyAI). Une segmentos cortos por orador y pausa, saca muletillas evidentes y pega el cuerpo como párrafos `[hh:mm:ss] **Orador:** texto`. Si el frontmatter ya tiene `capitulos`, inserta los `## Título`. Para reemplazar una transcripción existente agregá `--forzar`.

Revisá nombres propios, cifras y siglas: es donde más falla la transcripción automática.

### 3. Calcular la waveform

```bash
npm run peaks -- 004-el-titulo-del-episodio
```

Lee `audio.url` (local o remoto), calcula 400 picos con ffmpeg y los guarda en `src/data/peaks/004-….json`. Esa es la imagen del episodio en la home, el archivo, el reproductor, la OG y el kit de redes. Commiteá el JSON.

### 4. Resumen, capítulos, fuentes y bloque `ia`

Podés escribirlos a mano siguiendo `plantillas/episodio.md`, o pedirle a Claude Code que use el skill del proyecto:

> Preparar el episodio 4 con la transcripción y estas notas: …

El skill (`.claude/skills/nuevo-episodio/SKILL.md`) redacta el resumen en rioplatense, propone capítulos y la frase destacada, lista cada dato verificable y busca su fuente primaria. **Nunca inventa URLs, nunca marca una fuente como verificada y nunca publica.** Deja todo en borrador para que lo revises.

Para publicar, un episodio necesita: audio, al menos un capítulo (el primero en `00:00:00`), al menos una fuente, resumen completo y bloque `ia`. El build falla si falta algo.

### 5. Verificar y publicar

```bash
npm run check:contenido            # esquema, capítulos, referencias, imágenes sin alt
npm run check:contenido -- --links # además, que los links de fuentes y plataformas respondan
```

Cambiá `estado: borrador` por `estado: publicado`, marcá `verificada: true` solo en las fuentes que abriste, y hacé `npm run build`. Los borradores se ven en `npm run dev` pero nunca se construyen en producción.

Después, en el panel del hosting del audio, cargá en el episodio:

- `<podcast:chapters>` → `https://TU-DOMINIO/episodios/004-…/capitulos.json`
- `<podcast:transcript>` → `https://TU-DOMINIO/episodios/004-…/transcripcion.vtt`

Las piezas para redes están en `https://TU-DOMINIO/kit/004-…` (1080×608, 1080×1350 y la preview de 1200×630).

## Correcciones y seguimiento

En el frontmatter del episodio:

```yaml
correcciones:
  - fecha: 2026-09-24
    texto: "Decíamos X; es Y. Corregido."
seguimiento:
  - fecha: 2026-10-01
    texto: "El proyecto perdió estado parlamentario."
```

Aparecen en la página del episodio y en `/correcciones`, con fecha.

## Estructura

```
src/
  config/sitio.ts          datos del sitio (TODO antes de publicar)
  content/
    episodios/             un .md por episodio (frontmatter + transcripción)
    invitados/ conductores/ temas/ glosario/
  content.config.ts        esquemas Zod de las cinco colecciones
  data/peaks/              waveform de cada episodio (npm run peaks)
  components/              Header, Footer, Waveform, FilaEpisodio, BotonReproducir, Newsletter, BadgePlataforma, JsonLd
  components/reproductor/  isla React del reproductor persistente
  stores/reproductor.ts    estado compartido (nanostores)
  lib/                     contenido.ts, tiempo.ts, imagenes.ts (satori), plugins de remark
  pages/                   rutas, endpoints (og, kit, capitulos.json, transcripcion.vtt, rss.xml, llms.txt)
  scripts/                 reproducir.ts, filtros.ts, buscador.ts, animacion.ts
  styles/                  global.css (tokens), fuentes.css, reproductor.css, animacion.css
scripts/                   nuevo-episodio, importar-transcripcion, peaks, check-*, validar-jsonld, audio-ejemplo
plantillas/episodio.md     plantilla del episodio
docs/QA-F7.md              informe de QA
```

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run nuevo-episodio` | Crea el `.md` de un episodio en borrador |
| `npm run importar-transcripcion -- archivo slug` | Convierte VTT/SRT/JSON a párrafos con timestamps y oradores |
| `npm run peaks -- slug` (o `--todos`) | Calcula la waveform |
| `npm run check:contenido` (`-- --links`) | Valida contenido (y links externos) |
| `npm run check:links` | Links y anclas internos del build |
| `npm run check:jsonld` (`-- --remoto`) | Valida el JSON-LD (y lo consulta al Schema Markup Validator) |
| `npm run qa` | Build + los tres chequeos |
| `npm run audio:ejemplo` | Solo demo: genera los MP3 de prueba con ffmpeg |

## Deploy en Cloudflare Pages

1. Conectá el repositorio en Cloudflare Pages.
2. Build command: `npm run build`. Output directory: `dist`. Node: lo toma de `.node-version`.
3. `public/_headers` fija caché inmutable para `/_astro/*` y cabeceras de seguridad; `public/_redirects` hace el 301 de `/feed` al RSS del hosting (actualizalo junto con `sitio.ts`).
4. Dominio: configurá `SITIO.url` y `dominio` en `sitio.ts` y el `Sitemap:` de `public/robots.txt`.

En Vercel o Netlify los mismos valores de build y output funcionan; las cabeceras y el redirect se traducen a `vercel.json` o `netlify.toml`.

## Antes de publicar (checklist)

- [ ] `src/config/sitio.ts`: nombre, dominio, hosting y RSS, links de plataformas, redes, newsletter, analytics, formulario de casos.
- [ ] `public/robots.txt` y `public/_redirects`: dominio y RSS reales.
- [ ] Badges oficiales en `public/badges/{spotify,apple,youtube}.svg`, descargados de las guías de marca de cada plataforma (links en `src/components/BadgePlataforma.astro`). Sin ellos, se muestran botones de texto.
- [ ] Conductores reales en `src/content/conductores` (bio, foto, conflictos). Borrar invitados y episodios con `ejemplo: true`.
- [ ] `public/img/portada-512.png` y `public/favicon.svg` con la identidad definitiva.
- [ ] Proveedor de newsletter y endpoint del formulario "Proponer un caso" (sin endpoint, el formulario queda en modo demo).

## Notas técnicas

- **Caché de contenido**: Astro cachea el Markdown renderizado. Si cambiás un plugin de remark (`src/lib/remark-*.mjs`) y no ves el cambio, borrá `.astro/` y volvé a construir.
- **Fuentes**: `font-display: optional` con precarga de las dos del primer pintado. Si en la primera visita en una red muy lenta se ve la fuente de respaldo, es intencional: evita el salto de layout.
- **Reproductor**: una sola etiqueta `<audio>` en una isla con `transition:persist`; el estado vive en `src/stores/reproductor.ts`. Las páginas solo despachan acciones. Deep links: `/episodios/slug?t=754`.
- **Presupuesto**: la página de episodio carga 85 KB de JavaScript gzip (el límite es 100). Si hiciera falta margen, la isla se puede migrar a Preact.
- **Datos de prueba**: `public/audio/*.mp3` está ignorado por git; `npm run audio:ejemplo` los regenera.
