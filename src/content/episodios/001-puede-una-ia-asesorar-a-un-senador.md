---
numero: 1
temporada: 1
titulo: "¿Puede una IA asesorar a un senador?"
bajada: "Un modelo de lenguaje y una asesora legislativa analizan el mismo proyecto de ley sin verse. Comparamos qué encontró cada uno y qué se le escapó."
fecha: 2026-09-03
duracion: "00:38:20"
formato: laboratorio
ejes: [politica-publica]
temas: [legislacion, asesoramiento-legislativo, datos-personales]
invitados: [carolina-bustos]
destacado: true
audio:
  url: "/audio/001-puede-una-ia-asesorar-a-un-senador.mp3"
  bytes: 9200520
youtube: "dQw4w9WgXcQ" # TODO ID real del video (placeholder de demo)
plataformas:
  youtube: "https://www.youtube.com/@senalpublica" # TODO link al episodio
  spotify: "https://open.spotify.com/show/ejemplo-senal-publica" # TODO link al episodio
  apple: "https://podcasts.apple.com/ar/podcast/ejemplo-senal-publica" # TODO link al episodio
resumen:
  puntos:
    - "El modelo identificó todos los artículos que modifican la Ley 25.326 y resumió correctamente el objeto del proyecto en menos de un minuto."
    - "La asesora detectó dos cosas que el modelo no vio: una remisión a un decreto derogado y el conflicto de un artículo con la Ley 27.275."
    - "El modelo propuso tres riesgos regulatorios plausibles, pero uno de ellos citaba una norma inexistente con número y fecha."
    - "La diferencia no estuvo en la lectura sino en el contexto político: quién pidió cada artículo y qué negociación lo explica."
    - "Conclusión provisoria: sirve como primera lectura y como control de consistencia, no como dictamen ni como fuente de citas."
  contexto: "Elegimos un proyecto de ley real que modifica el régimen de protección de datos personales, de los que se presentan cada año en el Senado y rara vez llegan al recinto. Le dimos el texto completo, con fundamentos, a un modelo de lenguaje de uso general con una consigna idéntica a la que recibe un asesor nuevo en una comisión: objeto, artículos clave, normas que toca, riesgos y preguntas para el autor. En paralelo, Carolina Bustos, asesora con quince años en el Senado, hizo el mismo trabajo sin ver la respuesta del modelo. Después pusimos los dos análisis uno al lado del otro y los recorrimos punto por punto en el estudio. Lo que encontramos no es que uno gane y otro pierda, sino que miden cosas distintas: el modelo es exhaustivo con el texto y ciego al proceso; la asesora es selectiva con el texto y precisa con el proceso. Las cifras, el proyecto y los nombres de este episodio son de ejemplo para la demo del sitio."
frase:
  texto: "El modelo encontró todos los artículos. Lo que no encontró fue el pasillo: quién pidió ese artículo y a cambio de qué."
  autor: "Carolina Bustos"
  t: "00:29:12"
capitulos:
  - { t: "00:00:00", titulo: "Presentación" }
  - { t: "00:03:10", titulo: "Qué hace una asesora legislativa" }
  - { t: "00:08:45", titulo: "El proyecto que elegimos" }
  - { t: "00:13:30", titulo: "La IA lee el proyecto" }
  - { t: "00:20:05", titulo: "La asesora lee el proyecto" }
  - { t: "00:26:40", titulo: "Comparación punto por punto" }
  - { t: "00:33:15", titulo: "Qué cambia y qué no" }
  - { t: "00:36:50", titulo: "Cierre y fuentes" }
fuentes:
  - titulo: "Ley 25.326 de Protección de los Datos Personales"
    url: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/norma.htm"
    tipo: norma
    organismo: "InfoLEG, Ministerio de Justicia"
    fecha: 2000-10-30
    verificada: true
    nota: "Texto vigente de la ley que el proyecto analizado propone modificar. Definiciones de dato personal y dato sensible (art. 2) y consentimiento (art. 5)."
  - titulo: "Ley 27.275 de Derecho de Acceso a la Información Pública"
    url: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/265000-269999/265949/norma.htm"
    tipo: norma
    organismo: "InfoLEG, Ministerio de Justicia"
    fecha: 2016-09-29
    verificada: true
    nota: "La asesora detectó que un artículo del proyecto entra en tensión con las obligaciones de transparencia activa de esta ley."
  - titulo: "Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models"
    url: "https://arxiv.org/abs/2401.01301"
    tipo: paper
    organismo: "Stanford RegLab / Universidad de Yale"
    fecha: 2024-01-02
    verificada: true
    nota: "Estudio que mide la tasa de citas legales inventadas por modelos de lenguaje. Base de la discusión sobre la norma inexistente que citó el modelo."
  - titulo: "Recomendación sobre la ética de la inteligencia artificial"
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000381137"
    tipo: documento-oficial
    organismo: "UNESCO"
    fecha: 2021-11-23
    verificada: true
    nota: "Marco de referencia sobre supervisión humana que citamos al discutir si un dictamen puede apoyarse en un modelo."
  - titulo: "Reglamento de la Cámara de Senadores de la Nación"
    url: "https://www.senado.gob.ar/parlamentario/reglamento"
    tipo: documento-oficial
    organismo: "Honorable Senado de la Nación"
    verificada: false
    nota: "Circuito de un proyecto desde la mesa de entradas hasta el dictamen de comisión. Falta confirmar la URL del texto completo actualizado."
ia:
  usada_para: ["transcripción automática del audio", "borrador del resumen y de los capítulos", "análisis del proyecto de ley que se discute en el episodio (es el objeto de la prueba)"]
  no_usada_para: ["selección de fuentes", "verificación de las citas legales", "conclusiones del episodio"]
  revisado_por: "Lucía Ferreyra"
seguimiento:
  - fecha: 2026-10-01
    texto: "El proyecto analizado perdió estado parlamentario sin ser tratado en comisión. Lo seguimos si se vuelve a presentar."
correcciones: []
estado: publicado
ejemplo: true
---

## Presentación

[00:00:00] **Lucía Ferreyra:** Hola, bienvenidos a Señal Pública, un podcast sobre inteligencia artificial aplicada a problemas públicos concretos. Soy Lucía Ferreyra.

[00:00:14] **Martín Albarracín:** Y yo soy Martín Albarracín. Este es el primer episodio, así que vale una aclaración rápida sobre qué vamos a hacer acá y qué no. No vamos a comentar lanzamientos ni a hablar del futuro. Vamos a tomar un problema público por vez, meterlo en un laboratorio y ver qué pasa.

[00:00:41] **Lucía Ferreyra:** El laboratorio de hoy es el Senado. Más precisamente, una pregunta que me hicieron muchas veces en los últimos dos años: si un modelo de lenguaje puede hacer el trabajo de un asesor legislativo. Y en vez de opinar, lo probamos.

[00:01:08] **Martín Albarracín:** La prueba es simple de explicar. Tomamos un proyecto de ley real, se lo dimos a un modelo de lenguaje de uso general con una consigna estándar, y le dimos exactamente el mismo proyecto y la misma consigna a una asesora con quince años en comisiones. Ninguno vio el trabajo del otro.

[00:01:39] **Lucía Ferreyra:** La asesora es Carolina Bustos, que está acá con nosotros. Carolina, gracias por prestarte a esto, que tiene algo de examen.

[00:01:52] **Carolina Bustos:** Gracias a ustedes. Tiene algo de examen, sí, pero yo lo tomé al revés: el que rendía era el modelo. Yo hago esto todas las semanas.

[00:02:10] **Martín Albarracín:** Antes de entrar, una aclaración de método que vamos a repetir en cada episodio. Todo lo que afirmamos tiene una fuente primaria linkeada en la página del episodio, con el artículo o la página exacta. Lo que no pudimos verificar está marcado como pendiente. Y la transcripción completa está publicada, con los tiempos, para que puedan ir al momento exacto.

[00:02:44] **Lucía Ferreyra:** Empecemos por lo básico, porque mucha gente que nos escucha no trabaja en el Congreso. Carolina, ¿qué hace una asesora legislativa cuando le llega un proyecto?

## Qué hace una asesora legislativa

[00:03:10] **Carolina Bustos:** Depende del momento, pero el trabajo de base es siempre el mismo. Leés el proyecto entero, incluidos los fundamentos, que es donde el autor dice por qué lo presenta. Identificás qué normas vigentes toca, porque casi ningún proyecto nace en el vacío: modifica una ley, deroga un artículo, crea una excepción. Y después hacés la pregunta importante, que no está en el texto: por qué este proyecto, por qué ahora y quién lo quiere.

[00:03:51] **Martín Albarracín:** Esa última parte es la que a mí me interesa. ¿Cómo la respondés? ¿De dónde sale esa información?

[00:04:02] **Carolina Bustos:** De todos lados menos del expediente. Del autor, de los asesores de otros bloques, de los organismos que van a tener que aplicar la norma, de las cámaras empresarias que mandan notas, de las organizaciones que piden audiencia. Un proyecto es un texto más una negociación, y la negociación no está escrita.

[00:04:33] **Lucía Ferreyra:** Yo agregaría algo que me costó aprender. Un asesor también decide qué no leer. Entran decenas de proyectos por semana y la mayoría no va a avanzar nunca. Saber cuál merece tres horas y cuál merece tres minutos es parte del trabajo.

[00:04:58] **Carolina Bustos:** Exacto. Y eso un sistema que lee todo con la misma atención no lo hace. Puede ser una ventaja o un problema, después lo vemos.

[00:05:14] **Martín Albarracín:** Carolina, para que quede claro el producto final: ¿qué entregás? ¿Un informe, un memo, una charla de pasillo?

[00:05:27] **Carolina Bustos:** Para el senador, una página. Objeto del proyecto, qué normas modifica, tres o cuatro puntos de atención, una recomendación de postura y las preguntas que yo le haría al autor si viene a la comisión. Si el tema avanza, eso se convierte en un dictamen o en observaciones al dictamen de otro.

[00:05:58] **Lucía Ferreyra:** Esa página es exactamente lo que le pedimos al modelo. Martín, contá cómo armamos la consigna.

[00:06:09] **Martín Albarracín:** Escribimos un prompt que replica lo que le dirían a un asesor nuevo el primer día. Le dimos el texto completo del proyecto y los fundamentos, y le pedimos cinco cosas: objeto en dos oraciones, lista de normas vigentes que modifica con artículo, riesgos regulatorios, posibles conflictos con otras leyes y preguntas para el autor. Le dijimos explícitamente que si no estaba seguro de una norma lo dijera en vez de completar.

[00:06:52] **Carolina Bustos:** ¿Y le dijeron que iba a competir conmigo?

[00:06:56] **Martín Albarracín:** No. Y a vos tampoco te dijimos qué modelo era.

[00:07:03] **Lucía Ferreyra:** Un detalle técnico que importa: el proyecto con fundamentos tiene unas doce mil palabras. Entra cómodo en la ventana de contexto del modelo que usamos, así que no hubo recortes. Eso no siempre es así con proyectos largos o con anexos, y es algo que hay que chequear antes de confiar en cualquier resumen.

[00:07:36] **Martín Albarracín:** También guardamos la conversación completa con el modelo. Está en la página del episodio, sin editar, para que cualquiera pueda ver exactamente qué le preguntamos y qué respondió.

[00:07:54] **Carolina Bustos:** Eso me parece lo más importante de todo lo que hicieron. Si un senador va a apoyarse en una herramienta así, el prompt y la respuesta tienen que ser parte del expediente.

[00:08:12] **Lucía Ferreyra:** Lo anotamos como pregunta abierta para el final. Vamos al proyecto.

## El proyecto que elegimos

[00:08:45] **Lucía Ferreyra:** Elegimos un proyecto que modifica la Ley 25.326, la ley de protección de datos personales, que es del año 2000 y que todos los años recibe algún intento de reforma. Este en particular amplía la definición de dato sensible, cambia las reglas de consentimiento para el tratamiento automatizado y crea obligaciones nuevas para organismos públicos.

[00:09:21] **Martín Albarracín:** No vamos a decir el número de expediente ni el autor, porque el punto no es el proyecto sino la prueba. Lo que sí importa: es un proyecto de tamaño y complejidad típicos. No es ni una declaración de dos artículos ni un código de quinientos.

[00:09:45] **Carolina Bustos:** Y es un buen caso porque la 25.326 es una ley con mucha historia. Tiene un decreto reglamentario, tiene disposiciones de la autoridad de aplicación, tiene fallos. Un proyecto que la toca sin mirar todo eso suele tener problemas que no se ven en el texto.

[00:10:14] **Lucía Ferreyra:** ¿Cuánto tiempo le dedicaste?

[00:10:18] **Carolina Bustos:** Dos horas y media, en dos sesiones. La primera para leer y marcar, la segunda para escribir la página.

[00:10:30] **Martín Albarracín:** El modelo tardó cuarenta y un segundos. Lo digo porque es el dato que todo el mundo quiere escuchar, pero es el menos interesante del episodio. Lo importante es qué dijo en esos cuarenta y un segundos.

[00:10:52] **Lucía Ferreyra:** Antes de eso, Carolina, ¿qué fue lo primero que marcaste al leerlo?

[00:11:01] **Carolina Bustos:** El artículo cuatro. El proyecto dice que ciertos datos quedan exceptuados del consentimiento cuando los trata un organismo público "en los términos del decreto reglamentario vigente". Y remite a un número de decreto. Ese decreto fue reemplazado. La remisión apunta a una norma que ya no existe.

[00:11:35] **Martín Albarracín:** Eso es un error de redacción del proyecto, no del modelo ni tuyo.

[00:11:40] **Carolina Bustos:** Claro, pero es exactamente el tipo de cosa que un asesor tiene que encontrar. Si eso llega al recinto así, la excepción no se puede aplicar o se aplica mal.

[00:11:58] **Lucía Ferreyra:** Lo segundo que marcaste fue la relación con la Ley 27.275, la de acceso a la información pública.

[00:12:08] **Carolina Bustos:** Sí. Hay un artículo que permite a los organismos no informar qué sistemas automatizados usan para tratar datos personales, por razones de seguridad. Eso choca de frente con las obligaciones de transparencia activa del artículo 32 de la 27.275. No es que uno derogue al otro; es que van a convivir mal y alguien lo va a litigar.

[00:12:44] **Martín Albarracín:** Guardemos esas dos cosas, la remisión al decreto derogado y el choque con la 27.275, porque son el corazón de la comparación.

[00:13:02] **Lucía Ferreyra:** Vamos a la lectura del modelo.

## La IA lee el proyecto

[00:13:30] **Martín Albarracín:** Les leo el objeto tal como lo escribió el modelo: "El proyecto amplía la categoría de datos sensibles de la Ley 25.326 para incluir datos biométricos y de geolocalización, establece requisitos específicos de consentimiento para decisiones automatizadas y crea obligaciones de registro y publicidad para organismos públicos que utilicen sistemas de tratamiento automatizado". Carolina, ¿qué le ponés?

[00:14:08] **Carolina Bustos:** Diez. Es mejor que lo que escribí yo, que era más largo. Está completo y no inventa nada.

[00:14:20] **Lucía Ferreyra:** La segunda parte, la lista de normas que modifica. El modelo listó siete artículos de la 25.326 con el número correcto y una descripción de un renglón del cambio en cada uno.

[00:14:38] **Carolina Bustos:** También correcto. Yo había listado los mismos siete. Acá no hay diferencia, y eso es un dato: la tarea de "qué toca este proyecto" la hace bien y rápido.

[00:14:56] **Martín Albarracín:** Ahora los riesgos. El modelo propuso tres. Uno: que la definición ampliada de dato sensible alcance a sistemas ya en funcionamiento sin régimen de transición. Dos: que el requisito de consentimiento para decisiones automatizadas sea inaplicable en organismos con millones de trámites. Tres, y acá viene lo interesante, que el proyecto "entre en conflicto con la Resolución 47/2018 de la Agencia de Acceso a la Información Pública sobre evaluación de impacto".

[00:15:42] **Lucía Ferreyra:** Esa resolución no existe. Buscamos en el Boletín Oficial, en InfoLEG y en el sitio de la Agencia. Hay resoluciones de la Agencia sobre temas cercanos, con otros números y otros años, pero esa, con ese número y esa fecha, no.

[00:16:05] **Carolina Bustos:** Y lo dijo con la misma seguridad que los siete artículos correctos.

[00:16:11] **Martín Albarracín:** Ese es el punto. No hay ninguna señal en el texto de la respuesta que distinga lo verificado de lo inventado. El modelo alucinó una norma plausible, con el organismo correcto, el tema correcto y un número que suena bien.

[00:16:33] **Lucía Ferreyra:** Hay un paper de Stanford y Yale, de enero de 2024, que midió esto de forma sistemática en el sistema legal de Estados Unidos. Encontraron tasas de citas inventadas muy altas en modelos de uso general cuando se les preguntaba por fallos y normas específicas. Lo linkeamos. Nuestro caso es uno solo, no es una medición, pero va en la misma dirección.

[00:17:05] **Carolina Bustos:** A mí lo que me preocupa no es que invente. Es que si yo fuera una asesora nueva, sin experiencia con la Agencia, lo pondría en la página del senador sin dudar. Suena perfectamente razonable.

[00:17:24] **Martín Albarracín:** ¿Los otros dos riesgos?

[00:17:27] **Carolina Bustos:** Los dos son reales y están bien planteados. El de la transición es el más importante del proyecto y yo lo tenía primero. El del volumen de trámites es cierto, aunque yo lo hubiera formulado como pregunta al autor más que como riesgo.

[00:17:50] **Lucía Ferreyra:** Cuarta parte: conflictos con otras leyes. El modelo mencionó la Ley 27.275 en general, dijo que "podrían existir tensiones con el régimen de acceso a la información", pero no identificó el artículo del proyecto ni el artículo 32 de la 27.275.

[00:18:14] **Carolina Bustos:** Ahí está la diferencia entre saber que dos leyes se tocan y saber dónde se tocan. Lo primero sirve para una charla. Lo segundo sirve para un dictamen.

[00:18:30] **Martín Albarracín:** Y sobre la remisión al decreto derogado, nada. El modelo listó el decreto como "norma reglamentaria referenciada" sin advertir que fue reemplazado.

[00:18:46] **Lucía Ferreyra:** Eso tiene una explicación técnica que vale la pena dar. El modelo que usamos tiene una fecha de corte de entrenamiento. Si el reemplazo del decreto es posterior a esa fecha, o si simplemente no está bien representado en sus datos de entrenamiento, no tiene forma de saberlo. No es un error de razonamiento; es un límite de información.

[00:19:17] **Carolina Bustos:** Pero un asesor nuevo tampoco lo sabe de memoria. Lo sabe porque lo busca. La diferencia es que el asesor sabe que tiene que buscar.

[00:19:33] **Martín Albarracín:** Última parte, las preguntas para el autor. El modelo propuso cinco. Tres eran buenas, dos eran genéricas del tipo "¿cómo se financiará la implementación?".

[00:19:50] **Lucía Ferreyra:** Ahora la lectura de Carolina.

## La asesora lee el proyecto

[00:20:05] **Carolina Bustos:** Mi página tenía cuatro puntos de atención y dos recomendaciones. Primero, la remisión al decreto derogado, con la propuesta de corregirla por "la reglamentación vigente" sin número. Segundo, el choque con el artículo 32 de la 27.275, con la sugerencia de agregar un párrafo que aclare que la excepción de seguridad no alcanza a la existencia del sistema sino a sus especificaciones técnicas.

[00:20:47] **Martín Albarracín:** Esa segunda es una solución, no un diagnóstico. El modelo no propuso ninguna.

[00:20:55] **Carolina Bustos:** Porque no se lo pidieron, para ser justa. Pero también porque proponer una redacción implica saber qué va a aceptar el autor, y eso es política, no texto.

[00:21:12] **Lucía Ferreyra:** Tercer punto.

[00:21:15] **Carolina Bustos:** El régimen de transición, igual que el modelo. Cuarto, algo que no está en el proyecto: el autor presentó un proyecto casi idéntico hace dos períodos, que perdió estado parlamentario sin tratarse. La diferencia entre aquel y este son dos artículos. Y esos dos artículos son los que crean obligaciones para organismos públicos. Alguien se los pidió.

[00:21:50] **Martín Albarracín:** ¿Cómo sabés eso?

[00:21:53] **Carolina Bustos:** Porque estaba en la comisión cuando se presentó el anterior. Y porque busqué el expediente viejo y los comparé. Me llevó veinte minutos.

[00:22:08] **Lucía Ferreyra:** Eso el modelo no lo puede hacer con el material que le dimos. Le dimos el proyecto, no el historial legislativo del autor.

[00:22:19] **Carolina Bustos:** Y aunque se lo dieran, lo que importa no es que los dos artículos son nuevos. Es saber quién los pidió, y eso no está escrito en ningún lado.

[00:22:35] **Martín Albarracín:** Tus recomendaciones.

[00:22:38] **Carolina Bustos:** Acompañar en general, pedir cambios en los cuatro puntos, y citar al titular de la Agencia de Acceso a la Información a la comisión antes de dictaminar. Esa última es la que más vale, porque convierte un problema de texto en una conversación con el organismo que va a tener que aplicar la norma.

[00:23:05] **Lucía Ferreyra:** Una cosa que me llamó la atención de tu página: no tiene ninguna cita a normas que no sean las dos leyes y el decreto. Nada de resoluciones, nada de fallos.

[00:23:22] **Carolina Bustos:** Porque en una página para el senador no hace falta. Si avanza, en el dictamen sí. Y ahí voy a buscar cada una antes de escribirla, porque si cito mal una resolución en un dictamen, el bloque de enfrente me lo marca en el recinto y queda para siempre en la versión taquigráfica.

[00:23:48] **Martín Albarracín:** O sea que el costo de una cita inventada, para vos, es altísimo.

[00:23:54] **Carolina Bustos:** Es tu reputación. Para el modelo, es cero.

[00:24:03] **Lucía Ferreyra:** Esa asimetría de costos me parece central y quiero volver sobre ella al final.

[00:24:14] **Martín Albarracín:** Algo que no preguntamos: ¿qué parte de tu trabajo te hubiera gustado delegarle?

[00:24:22] **Carolina Bustos:** La lista de artículos modificados, sin dudar. Es mecánica, es aburrida y el modelo la hizo perfecto. Y el objeto en dos oraciones, que a mí siempre me sale largo. El resto, no todavía.

[00:24:45] **Lucía Ferreyra:** ¿Y al revés? ¿Qué parte del trabajo del modelo te sirvió, aunque no lo supieras en el momento?

[00:24:56] **Carolina Bustos:** El riesgo del volumen de trámites. Yo lo tenía como pregunta, él lo tenía como riesgo. Después de leerlo creo que es más riesgo que pregunta. Me hizo cambiar de opinión en algo menor, pero me la hizo cambiar.

[00:25:20] **Martín Albarracín:** Eso es interesante porque es el uso menos discutido: no como reemplazo ni como asistente, sino como segunda lectura que te obliga a justificar lo que ya decidiste.

[00:25:38] **Lucía Ferreyra:** Vamos a la comparación punto por punto.

## Comparación punto por punto

[00:26:40] **Martín Albarracín:** Hicimos una tabla, que está en la página del episodio. Cinco tareas, dos columnas. Objeto del proyecto: empate, con ventaja leve del modelo por concisión. Normas modificadas: empate exacto. Riesgos: dos de tres correctos para el modelo, con una norma inventada; tres de tres para la asesora, con una que el modelo no vio.

[00:27:14] **Lucía Ferreyra:** Conflictos con otras leyes: el modelo detectó la tensión en general, la asesora la ubicó en artículos específicos y propuso una redacción. Y la remisión al decreto derogado, que para mí es el hallazgo más importante del episodio, solo la encontró la asesora.

[00:27:38] **Carolina Bustos:** Quiero ser justa con el modelo en algo. La tabla compara lo que respondió con lo que respondí yo. Pero yo tuve dos horas y media, acceso a InfoLEG, al expediente viejo y a mi memoria de la comisión. El modelo tuvo doce mil palabras y cuarenta segundos. Si me dieran a mí solo el texto y cuarenta segundos, no encuentro el decreto derogado tampoco.

[00:28:12] **Martín Albarracín:** Es verdad, y por eso la pregunta correcta no es "quién lo hizo mejor" sino "qué pasa si le damos al modelo lo mismo que tuviste vos". Eso es técnicamente posible: conectarlo a InfoLEG, darle el historial de expedientes, pasarle las versiones taquigráficas. Es lo que se llama recuperación aumentada.

[00:28:40] **Lucía Ferreyra:** Y es probablemente lo que va a pasar en los próximos años en las comisiones. Pero hay una parte que no se arregla con más datos.

[00:28:52] **Carolina Bustos:** La parte de quién pidió qué.

[00:28:56] **Lucía Ferreyra:** Esa. Decilo como lo dijiste antes de grabar, que fue mejor.

[00:29:12] **Carolina Bustos:** El modelo encontró todos los artículos. Lo que no encontró fue el pasillo: quién pidió ese artículo y a cambio de qué. Y el pasillo no está en ninguna base de datos. Está en la gente.

[00:29:33] **Martín Albarracín:** Hay un contraargumento que quiero poner sobre la mesa. Alguien podría decir: mejor que el análisis técnico no dependa del pasillo. Que el asesor sepa quién pidió qué es información valiosa, pero también es la razón por la cual el análisis legislativo es opaco. Un modelo que solo lee el texto es, en cierto sentido, más imparcial.

[00:30:08] **Carolina Bustos:** Es un buen contraargumento y lo escuché muchas veces. Mi respuesta es que el pasillo existe igual, lo mires o no. Si el asesor no lo mira, el senador vota sin saber por qué ese artículo está ahí. El análisis técnico no reemplaza al político; lo informa.

[00:30:36] **Lucía Ferreyra:** Y agregaría que "imparcial" no es lo mismo que "neutral". El modelo tiene sesgos de entrenamiento que no conocemos. Dio por buena una resolución inexistente. Eso no es imparcialidad, es otra forma de opacidad.

[00:30:58] **Martín Albarracín:** Un último punto de la comparación que no está en la tabla: el costo. Dos horas y media de una asesora senior contra cuarenta segundos de un modelo. Si uno hace la cuenta por consulta, la diferencia es enorme. Pero esa cuenta es engañosa.

[00:31:20] **Lucía Ferreyra:** ¿Por qué?

[00:31:22] **Martín Albarracín:** Porque el costo real no es el de producir la página sino el de equivocarse. Si la norma inventada llega a un dictamen, el costo lo paga el senador, el bloque y eventualmente la ley. Esa asimetría que mencionaba Carolina, que para ella una cita falsa es su reputación y para el modelo es cero, es un problema económico, no solo ético. Alguien tiene que absorber el costo del error, y hoy ese alguien es la persona que revisa.

[00:32:02] **Carolina Bustos:** Que es lo que yo hago. Y si me dan un modelo que me ahorra la lista de artículos pero me obliga a verificar cada cita, no sé cuánto tiempo gané.

[00:32:18] **Lucía Ferreyra:** Esa es exactamente la pregunta que queremos dejar planteada: no si sirve, sino para qué tareas el tiempo que ahorra es mayor que el tiempo de verificar.

[00:32:35] **Martín Albarracín:** Y la respuesta provisoria de este episodio es: para las tareas de forma, sí; para las tareas de hecho, todavía no sin revisión; para las tareas de contexto político, no.

## Qué cambia y qué no

[00:33:15] **Lucía Ferreyra:** Cerremos con la sección que va a estar en todos los episodios: qué cambia y qué no cambia con IA en este problema.

[00:33:27] **Martín Albarracín:** Lo que cambia. Primero, la primera lectura de un proyecto se vuelve casi gratuita. Eso significa que una comisión podría tener una página de análisis de todos los proyectos que entran, no solo de los que alguien decidió mirar. Segundo, aparece un control de consistencia barato: si el modelo y el asesor difieren, hay algo que revisar.

[00:34:00] **Carolina Bustos:** Yo agregaría que cambia quién puede hacer la primera lectura. Un bloque chico, con un asesor para doce comisiones, hoy no llega a leer todo. Con esto, llega. Eso achica una desigualdad real entre bloques grandes y chicos.

[00:34:24] **Lucía Ferreyra:** Lo que no cambia. La verificación de citas sigue siendo humana y sigue siendo cara. El contexto político, quién pidió qué, no está en ningún texto. Y la responsabilidad por el dictamen sigue siendo de una persona con nombre y apellido.

[00:34:48] **Martín Albarracín:** Y una cosa que cambia para mal si no se hace nada: si el prompt y la respuesta no se guardan en el expediente, el proceso legislativo se vuelve más opaco, no menos. Hoy un dictamen tiene firma. Una página generada por un modelo no tiene nada.

[00:35:12] **Carolina Bustos:** Eso para mí es lo urgente. No regular si se usa o no, que se va a usar igual. Regular que quede registro.

[00:35:26] **Lucía Ferreyra:** Lo anotamos como caso para un episodio futuro: qué debería decir un reglamento de comisión sobre el uso de estas herramientas. Si alguien que nos escucha trabaja en eso, en la web hay un formulario para proponer casos.

[00:35:47] **Martín Albarracín:** Y una pregunta abierta que no resolvimos: ¿qué pasa cuando los dos lados usan el mismo modelo? Si oficialismo y oposición le preguntan a la misma herramienta, ¿converge el análisis o se amplifica el sesgo?

[00:36:08] **Carolina Bustos:** Espero que me inviten a ese también.

[00:36:12] **Lucía Ferreyra:** Hecho.

## Cierre y fuentes

[00:36:50] **Lucía Ferreyra:** Las fuentes de este episodio, todas linkeadas en la página: la Ley 25.326 y la Ley 27.275 en InfoLEG, el paper de Stanford y Yale sobre alucinaciones legales, y la Recomendación de la UNESCO sobre ética de la inteligencia artificial, que citamos para la parte de supervisión humana. El reglamento del Senado está marcado como pendiente de verificación porque todavía no confirmamos la URL del texto actualizado.

[00:37:22] **Martín Albarracín:** Sobre cómo usamos IA en este episodio: la transcripción se hizo con transcripción automática y la revisó Lucía. El borrador del resumen y de los capítulos lo generó un modelo y lo corregimos los dos. Las fuentes las elegimos y verificamos nosotros, sin IA. Y las conclusiones son nuestras.

[00:37:48] **Lucía Ferreyra:** Si encontrás un error, en la web hay una página de correcciones y un correo. Los errores se corrigen en público, con fecha.

[00:37:59] **Martín Albarracín:** Gracias, Carolina.

[00:38:02] **Carolina Bustos:** Gracias a ustedes. Me voy a verificar una resolución que no existe.

[00:38:08] **Lucía Ferreyra:** Esto fue Señal Pública. Hasta el próximo episodio.
