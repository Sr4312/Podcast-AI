# Informe de QA (fase F7)

Fecha: 22 de octubre de 2026. Build auditado: `npm run build` sobre el commit de F6 más los ajustes de esta fase.
Herramientas: Lighthouse 13.5 (emulación mobile, slow 4G, CPU ×4), axe-core 4.14, Playwright, scripts propios (`check:links`, `check:contenido --links`, `check:jsonld`).

## 1. Lighthouse mobile

| Página | Performance | Accesibilidad | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home | 99 | 100 | 100 | 100 | 2,0 s | 0 | 20 ms |
| Episodio (003) | 97 | 100 | 100 | 100 | 2,4 s | 0 | 30 ms |
| Archivo | 98 | 100 | 100 | 100 | 2,3 s | 0 | 0 ms |
| Acerca | 99 | 100 | 100 | 100 | 2,0 s | 0 | 0 ms |

Objetivo del brief: ≥ 95 en las cuatro categorías. **Cumplido.**

Métricas del brief: CLS < 0,05 **cumplido** (0 en todas). INP < 200 ms: no se mide en laboratorio; el TBT de 0 a 30 ms indica que no hay tareas largas. LCP < 2 s: **cumplido en home y acerca, no en episodio y archivo (2,3 a 2,4 s)** bajo la emulación de red slow 4G de Lighthouse. Ver §7.

Qué se corrigió en esta fase para llegar acá:

- El CLS inicial era de 0,05 a 0,15 y venía por completo del cambio de fuente web. Las fuentes ahora se declaran con `font-display: optional` y se precargan las dos del primer pintado (titulares y texto). Resultado: 0.
- El titular pasó de la fuente variable (57 KB) a un único peso estático (23 KB), porque está en la ruta crítica del LCP.
- El CSS (8 KB gzip) va inline en el HTML: se elimina un pedido bloqueante.

## 2. Accesibilidad

- **axe-core** (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas): 0 violaciones en home (41 reglas pasadas) y en la página de episodio con el reproductor cargado (49 reglas pasadas). Una regla "incompleta" (contraste) en home corresponde a secciones en opacidad 0 durante la animación de entrada; el contraste real está medido en §4.
- **Skip link**: primer Tab muestra "Saltar al contenido" y lleva a `#contenido`.
- **Foco visible**: 406 elementos focalizables en la página de episodio, todos con contorno visible al recibir foco por teclado.
- **Teclado**: menú mobile con Escape, reproductor completo (play, saltos, velocidad, barra `role="slider"` con flechas, Inicio, Fin y Re/Av Pág), timestamps y capítulos como botones y links, tooltip del glosario accesible por foco con `aria-describedby`, "Seguir lectura" con `aria-pressed`.
- **Áreas táctiles**: controles del reproductor de 50 × 50 px y botón de velocidad de 44 px (se corrigió: medía 41). Los únicos objetivos menores de 24 px son links dentro de texto corrido, exentos por WCAG 2.2.
- **Jerarquía de títulos**: un `h1` por página; los capítulos de la transcripción son `h3` bajo el `h2` "Transcripción completa".
- **Landmarks**: header, nav, main, footer, region del reproductor, asides etiquetados.

## 3. Movimiento reducido

Con `prefers-reduced-motion: reduce`: la waveform funde en 150 ms sin escala ni retardo, las secciones funden sin desplazamiento, el reproductor y los menús funden en 120 a 150 ms, los botones no se comprimen y las View Transitions quedan apagadas. Verificado leyendo las animaciones activas en el navegador (160 animaciones `barra-fundir` de 150 ms, `transform: none`).

## 4. Legibilidad y contraste (sección 8 del brief)

| Medida | Valor | Requisito |
|---|---|---|
| Cuerpo desktop | 18 px | 18 a 19 px |
| Cuerpo mobile | 17 px | mínimo 17 px |
| Interlineado | 1,6 | 1,55 a 1,65 |
| Medida | 66 caracteres | 60 a 72 |
| Metadatos | 14,9 px (mobile) / 15,75 px (desktop) | nunca menos de 14 px |

Contraste medido sobre los tokens (claro / oscuro):

| Par | Claro | Oscuro |
|---|---|---|
| Texto sobre papel | 15,1 | 14,3 |
| Texto secundario sobre papel | 7,4 | 7,7 |
| Acento (links) sobre papel | 7,5 | 8,6 |
| Verificada sobre papel | 6,6 | 9,6 |
| Pendiente sobre papel | 5,2 | 9,1 |
| Texto sobre papel 2 (campos) | 13,8 | 13,0 |
| Texto del botón primario | 15,1 | 14,3 |

Todo por encima de 4,5:1; el cuerpo por encima de 7:1.

## 5. Capturas en seis anchos

En `capturas/anchos/`: home y episodio a 360, 390, 768, 1024, 1440 y 1920 px. Sin desborde horizontal en ninguno (`scrollWidth` igual al ancho del viewport en 360 y 1920). Corrección hecha: a 768 px el header de escritorio no entraba; el menú colapsado ahora rige hasta 895 px y la waveform usa la versión de 72 barras hasta ese ancho.

## 6. Links

- **Internos**: 48 páginas, 1538 links y anclas revisados, 0 rotos (`npm run check:links`).
- **Externos** (`npm run check:contenido -- --links`, con user agent de navegador): 13 URLs; fallan solo las dos de plataformas que son placeholders marcados `TODO` (YouTube y Apple Podcasts). UNESCO y Open Government Partnership rechazan clientes sin user agent de navegador; con uno, responden 200. El reglamento del Senado no tenía URL estable: la fuente apunta al sitio del Senado y sigue marcada "pendiente de verificación".
- **JSON-LD**: 54 bloques válidos, coincidentes con el HTML y aceptados por el Schema Markup Validator.

## 7. Presupuesto de JavaScript

Página de episodio, gzip: scripts de Astro 9,4 KB + isla del reproductor con React 75 KB = **85 KB** (límite 100 KB). React DOM es el 77 % del total. Si en el futuro hiciera falta margen, la isla podría migrarse a Preact con `@astrojs/preact` sin tocar el resto.

Sobre el LCP de 2,3 a 2,4 s en episodio y archivo: la emulación de Lighthouse usa 1,6 Mb/s y 150 ms de latencia; el HTML del episodio pesa 39 KB gzip por la transcripción completa (que el brief exige en el HTML inicial) y las dos fuentes del primer pintado suman 49 KB. En una conexión 4G real o WiFi el LCP queda muy por debajo de 2 s. Para cumplir el objetivo también en la emulación habría que quitar la precarga de fuentes (la primera visita en redes lentas se vería con la fuente de respaldo) o dividir la transcripción en una segunda petición, lo que contradice el brief. Queda como decisión a tomar.

## 8. Auditoría anti "cara de IA" (sección 8 del brief)

| Ítem prohibido | Estado | Evidencia |
|---|---|---|
| Gradientes mesh, blobs, glassmorphism, bordes con glow | ✓ ausente | grep de `gradient`, `backdrop-filter`, `blur(` en src: solo el patrón de líneas del placeholder de waveform vacía |
| Última palabra del título en color de acento | ✓ ausente | ningún `span` coloreado en títulos |
| Etiquetas "eyebrow" sobre cada sección | ✓ ausente | sin `uppercase` ni `letter-spacing` positivo en src; las etiquetas del margen son metadatos reales (fecha, duración, formato) |
| Grillas de 3 cards idénticas con ícono arriba | ✓ ausente | listas editoriales con líneas; los tres ejes son filas con conteo real |
| Emojis como íconos | ✓ ausente | escaneo Unicode en src: ninguno (los ✓/✗ viven solo en la salida de consola de los scripts) |
| Navbar en píldora flotante | ✓ ausente | header fijo de borde a borde con línea inferior |
| Hero centrado con dos botones y subtítulo genérico | ✓ ausente | hero alineado a la izquierda, un botón (Reproducir) más links de plataformas, bajada real del episodio |
| Secciones que repiten la misma plantilla | ✓ | último episodio, lista editorial, filas de ejes con conteo, recorrido numerado, newsletter: cinco estructuras distintas |
| Cifras, logos de medios o testimonios inventados | ✓ con aviso | no hay testimonios ni logos de medios; las cifras del contenido semilla son ficticias y cada episodio lo dice en un aviso visible y en su contexto |
| Copy "Revolucionando…", "El futuro de…", "Descubrí el poder de…" | ✓ ausente | grep en src: solo aparece en la lista de prohibiciones de `/estilo` y en la línea editorial que lo rechaza |
| Sombras difusas y esquinas muy redondeadas en todo | ✓ ausente | radio de 3 px; única sombra: el filete de 0,5 px de las marcas de capítulo |
| Ilustraciones genéricas, robots, cerebros, circuitos | ✓ ausente | la única imagen es la waveform real; las personas sin foto muestran iniciales |

## 9. Pendientes que no son defectos del sitio

- Badges oficiales de Spotify, Apple Podcasts y YouTube: hay que descargarlos de las guías de marca y dejarlos en `public/badges/{id}.svg`; el componente los usa automáticamente.
- Todos los `TODO` de `src/config/sitio.ts` (dominio, feed, links de plataformas, newsletter, analytics, formulario).
- Fotos de conductores e invitados.
- Las fuentes marcadas "pendiente de verificación" en los episodios de ejemplo.
