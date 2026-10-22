---
numero: 3
temporada: 1
titulo: "Chatbots contra el Boletín Oficial"
bajada: "Le hicimos sesenta preguntas sobre normativa argentina a cuatro chatbots y contrastamos cada respuesta con la fuente oficial. Acertaron mucho, inventaron en lo que más importa."
fecha: 2026-10-01
duracion: "00:46:30"
formato: investigacion
ejes: [sociedad, politica-publica]
temas: [chatbots, informacion-publica, legislacion]
invitados: [ana-paula-sosa, julian-ortiz]
destacado: true
audio:
  url: "/audio/003-chatbots-contra-el-boletin-oficial.mp3"
  bytes: 11160540
youtube: "dQw4w9WgXcQ" # TODO ID real del video (placeholder de demo)
plataformas:
  youtube: "https://www.youtube.com/@senalpublica" # TODO link al episodio
  spotify: "https://open.spotify.com/show/ejemplo-senal-publica" # TODO link al episodio
  apple: "https://podcasts.apple.com/ar/podcast/ejemplo-senal-publica" # TODO link al episodio
resumen:
  puntos:
    - "En preguntas sobre el contenido de leyes conocidas y estables, como el Código Civil y Comercial, los cuatro sistemas respondieron bien en la gran mayoría de los casos."
    - "En preguntas sobre plazos, montos actualizados y normas de los últimos dos años, las respuestas incorrectas fueron frecuentes y siempre se dieron sin ninguna señal de duda."
    - "Las citas fueron el punto más débil: números de artículo cambiados, decretos inexistentes y resoluciones atribuidas al organismo equivocado."
    - "Cuando se les pidió la fuente, los sistemas produjeron links que no existían o que apuntaban a otra norma, con el mismo formato que los links reales."
    - "La prueba es chica y no es un ranking de productos: es una medida de qué tipo de pregunta se puede delegar y cuál no."
  contexto: "Diseñamos una prueba modesta pero sistemática: sesenta preguntas sobre normativa argentina, escritas por una abogada especialista en derecho administrativo, cada una con su respuesta correcta documentada en la fuente oficial (InfoLEG, Boletín Oficial, sitios de organismos). Las preguntas se agruparon en tres tipos: contenido de normas estables, datos que cambian (plazos, montos, autoridades) y citas precisas (número de artículo, norma, organismo). Se las hicimos de forma idéntica a cuatro chatbots de uso general, en la misma semana, con la conversación en blanco, y un ingeniero de datos registró las respuestas sin editarlas. Después, la abogada evaluó cada respuesta como correcta, incorrecta o incompleta, sin saber de qué sistema venía. En el episodio contamos cómo armamos la prueba, qué resultados obtuvimos por tipo de pregunta, por qué pasa lo que pasa y qué puede hacer un organismo que está pensando en poner un sistema de estos a responder al público. Las preguntas, las respuestas y la planilla de evaluación están publicadas. La prueba, las cifras y los invitados de este episodio son de ejemplo para la demo del sitio."
frase:
  texto: "El problema no es que se equivoquen. Es que se equivocan con la misma cara con la que aciertan."
  autor: "Ana Paula Sosa"
  t: "00:27:05"
capitulos:
  - { t: "00:00:00", titulo: "Presentación" }
  - { t: "00:03:40", titulo: "Cómo armamos la prueba" }
  - { t: "00:10:15", titulo: "Las sesenta preguntas" }
  - { t: "00:17:30", titulo: "Resultados: lo que acertaron" }
  - { t: "00:24:50", titulo: "Resultados: dónde inventaron" }
  - { t: "00:32:10", titulo: "Por qué pasa esto" }
  - { t: "00:39:20", titulo: "Qué puede hacer un organismo" }
  - { t: "00:44:00", titulo: "Cierre y fuentes" }
fuentes:
  - titulo: "Código Civil y Comercial de la Nación (Ley 26.994)"
    url: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/norma.htm"
    tipo: norma
    organismo: "InfoLEG, Ministerio de Justicia"
    fecha: 2014-10-07
    verificada: true
    nota: "Fuente de las preguntas sobre normas estables (plazos de prescripción, capacidad, contratos). Fue el grupo con más aciertos."
  - titulo: "Ley 27.275 de Derecho de Acceso a la Información Pública"
    url: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/265000-269999/265949/norma.htm"
    tipo: norma
    organismo: "InfoLEG, Ministerio de Justicia"
    fecha: 2016-09-29
    verificada: true
    nota: "Fuente de las preguntas sobre plazos de respuesta a pedidos de información (arts. 11 y 15), donde varios sistemas dieron plazos incorrectos."
  - titulo: "Ley 24.240 de Defensa del Consumidor"
    url: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/638/texact.htm"
    tipo: norma
    organismo: "InfoLEG, Ministerio de Justicia"
    fecha: 1993-10-13
    verificada: true
    nota: "Fuente de las preguntas sobre derecho de arrepentimiento y garantías (arts. 11 y 34), con muchas modificaciones posteriores que confundieron a los sistemas."
  - titulo: "InfoLEG, Información Legislativa y Documental"
    url: "https://www.infoleg.gob.ar"
    tipo: dataset
    organismo: "Ministerio de Justicia"
    verificada: true
    nota: "Base oficial contra la que se verificó cada respuesta. Todas las preguntas tienen su respuesta correcta linkeada a InfoLEG o al Boletín Oficial."
  - titulo: "Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models"
    url: "https://arxiv.org/abs/2401.01301"
    tipo: paper
    organismo: "Stanford RegLab / Universidad de Yale"
    fecha: 2024-01-02
    verificada: true
    nota: "Metodología de referencia para clasificar errores de cita. Nuestra prueba adapta su tipología a normativa argentina, en escala mucho menor."
ia:
  usada_para: ["transcripción automática del audio", "borrador del resumen y de los capítulos", "los cuatro chatbots evaluados son el objeto de la prueba"]
  no_usada_para: ["redacción de las preguntas", "evaluación de las respuestas", "selección de fuentes", "conclusiones del episodio"]
  revisado_por: "Lucía Ferreyra"
seguimiento: []
correcciones: []
estado: publicado
ejemplo: true
---

## Presentación

[00:00:00] **Lucía Ferreyra:** Hola, esto es Señal Pública. Soy Lucía Ferreyra.

[00:00:07] **Martín Albarracín:** Y yo soy Martín Albarracín. Tercer episodio y tercer formato: hoy es una investigación. Armamos una prueba, la corrimos, y vamos a contar los resultados con todos los datos publicados.

[00:00:28] **Lucía Ferreyra:** La pregunta es simple y la escuchamos todo el tiempo: si le pregunto a un chatbot sobre una ley argentina, ¿me responde bien? Hay mucha opinión sobre eso y pocos datos locales. Así que fuimos a buscar los datos.

[00:00:50] **Martín Albarracín:** Para hacerlo bien necesitábamos dos personas que no somos nosotros. Una abogada que escribiera preguntas con respuesta verificable y evaluara las respuestas. Y alguien que supiera hacerle las mismas preguntas a varios sistemas de forma comparable, sin contaminar la prueba.

[00:01:14] **Lucía Ferreyra:** Están las dos acá. Ana Paula Sosa, doctora en Derecho, investiga procedimiento administrativo y acceso a la información. Y Julián Ortiz, ingeniero de datos, que arma y evalúa sistemas con modelos de lenguaje. Bienvenidos.

[00:01:33] **Ana Paula Sosa:** Gracias. Aclaro desde el principio que yo llegué a esto escéptica, y me fui más escéptica en algunas cosas y menos en otras.

[00:01:45] **Julián Ortiz:** Y yo llegué del otro lado. Trabajo con estos sistemas todos los días y los defiendo bastante. También me fui con matices.

[00:01:56] **Martín Albarracín:** Conflictos de interés, que están en la página: Julián trabajó como consultor para un proveedor de chatbots hasta 2023 y no tiene relación actual con los sistemas evaluados. Ana Paula no declara conflictos.

[00:02:14] **Lucía Ferreyra:** Y una aclaración que vamos a repetir varias veces: esto no es un ranking de productos. No vamos a decir qué chatbot es mejor. Son cuatro sistemas de uso general, los llamamos A, B, C y D, y lo que nos importa es qué tipo de pregunta responden bien y cuál mal, porque eso es lo que le sirve a un organismo que está decidiendo si usa uno.

[00:02:42] **Julián Ortiz:** Agrego una razón técnica para no dar nombres: estos sistemas cambian cada pocas semanas. Lo que medimos es una foto de una semana de agosto. El ranking de hoy no sirve en octubre. El tipo de error, sí.

[00:03:02] **Martín Albarracín:** Todo lo que vamos a contar está publicado: las sesenta preguntas, la respuesta correcta de cada una con su link a la fuente oficial, las respuestas de los cuatro sistemas sin editar, y la planilla de evaluación de Ana Paula. Si alguien quiere repetir la prueba o discutir una evaluación, tiene todo.

[00:03:25] **Lucía Ferreyra:** Empecemos por el diseño, porque ahí está la mitad del valor de esto.

## Cómo armamos la prueba

[00:03:40] **Ana Paula Sosa:** La primera decisión fue qué tipo de preguntas. Yo propuse tres grupos, porque en mi experiencia son tres cosas distintas. Primero, el contenido de normas estables: qué dice el Código Civil y Comercial sobre prescripción, qué es la capacidad restringida, cosas que están igual hace diez años y están en todos lados.

[00:04:08] **Martín Albarracín:** Segundo grupo.

[00:04:11] **Ana Paula Sosa:** Datos que cambian. Plazos que se modificaron, montos que se actualizan, qué organismo es la autoridad de aplicación hoy. Acá la respuesta correcta de hace dos años puede ser incorrecta ahora.

[00:04:28] **Lucía Ferreyra:** Y tercero.

[00:04:30] **Ana Paula Sosa:** Citas precisas. No "qué dice la ley" sino "en qué artículo lo dice", "qué decreto lo reglamenta", "de qué organismo es la resolución". Es lo que un abogado necesita para escribir y lo que un funcionario necesita para fundar un acto.

[00:04:50] **Julián Ortiz:** Esa división me pareció muy buena desde lo técnico, porque corresponde a tres mecanismos distintos de cómo fallan estos modelos. Lo estable está muy repetido en los datos de entrenamiento y lo saben. Lo que cambia depende de la fecha de corte. Y las citas precisas son el caso donde el modelo tiene que producir un dato exacto, número de artículo, y ahí es donde más completa por probabilidad.

[00:05:22] **Martín Albarracín:** Veinte preguntas por grupo, sesenta en total. ¿Por qué sesenta y no seiscientas?

[00:05:30] **Ana Paula Sosa:** Porque cada pregunta me llevó entre media hora y una hora: escribirla sin ambigüedad, buscar la respuesta en la fuente oficial, documentar el link exacto y escribir el criterio de evaluación antes de ver ninguna respuesta. Sesenta son unas cuarenta horas de trabajo. Es una prueba chica y lo decimos. Pero cada pregunta está bien hecha.

[00:05:58] **Lucía Ferreyra:** Eso de escribir el criterio antes de ver las respuestas me parece clave.

[00:06:05] **Ana Paula Sosa:** Es lo que evita que yo evalúe con simpatía o antipatía. Para cada pregunta escribí qué tenía que tener una respuesta para ser correcta, qué la hacía incompleta y qué la hacía incorrecta. Después evalué sin saber de qué sistema venía cada respuesta.

[00:06:27] **Martín Albarracín:** Julián, cómo se hicieron las preguntas a los sistemas.

[00:06:32] **Julián Ortiz:** Cuatro reglas. Misma semana para los cuatro, para que la foto sea comparable. Conversación nueva para cada pregunta, sin historial, porque el historial cambia las respuestas. El texto exacto de la pregunta, sin agregar instrucciones del tipo "sos un abogado experto", porque queríamos medir lo que recibe una persona común. Y sin navegación web activada, en los sistemas donde eso se puede apagar.

[00:07:05] **Lucía Ferreyra:** Esa última es discutible. Alguien podría decir que con navegación responderían mejor.

[00:07:12] **Julián Ortiz:** Es cierto, y es una limitación que declaramos. La decisión fue medir el modelo, no el buscador. Con navegación, estás midiendo también qué tan bien busca en InfoLEG, que es otra pregunta, interesante, para otra prueba. Y en dos de los cuatro sistemas no se podía apagar, así que lo registramos pregunta por pregunta.

[00:07:40] **Martín Albarracín:** ¿Qué registraron de cada respuesta?

[00:07:44] **Julián Ortiz:** El texto completo, la fecha y hora, el sistema, si tenía navegación activa, y si la respuesta incluía alguna señal de incertidumbre: frases como "creo que", "deberías verificar", "no estoy seguro". Esa última columna fue idea de Ana Paula y terminó siendo de las más importantes.

[00:08:08] **Ana Paula Sosa:** Porque mi hipótesis era que el problema no es que se equivoquen, es que no avisan. Quería medirlo.

[00:08:18] **Lucía Ferreyra:** Un detalle más de diseño: después de cada pregunta, hicieron una segunda.

[00:08:25] **Julián Ortiz:** Sí. A cada respuesta le pedimos: "¿me pasás el link a la fuente oficial?". Queríamos ver qué pasaba cuando se les pedía la fuente. Eso generó un conjunto de datos aparte, de links, que verificamos uno por uno.

[00:08:45] **Martín Albarracín:** Adelanto que ese conjunto es el más preocupante del episodio.

[00:08:51] **Ana Paula Sosa:** Y el más fácil de verificar, porque un link existe o no existe.

[00:09:00] **Lucía Ferreyra:** Última cosa del método: los sesgos de la prueba, dichos por ustedes.

[00:09:07] **Ana Paula Sosa:** Las preguntas las escribí yo, con mi especialidad, que es derecho administrativo. Hay mucho de procedimiento y de acceso a la información y poco de penal o laboral. Otra persona hubiera elegido otras.

[00:09:24] **Julián Ortiz:** Y cuatro sistemas es poco. Hay modelos especializados en derecho, de pago, que no probamos. Medimos lo que usa la gente común, no lo mejor que existe.

[00:09:38] **Martín Albarracín:** Con eso dicho, vamos a las preguntas.

## Las sesenta preguntas

[00:10:15] **Ana Paula Sosa:** Les doy ejemplos de cada grupo para que se entienda el nivel. Del grupo estable: "¿Cuál es el plazo genérico de prescripción liberatoria según el Código Civil y Comercial?". Respuesta: cinco años, artículo 2560. Está en el Código desde 2015, está en todos los manuales, está en miles de fallos.

[00:10:42] **Lucía Ferreyra:** Del grupo de datos que cambian.

[00:10:46] **Ana Paula Sosa:** "¿Cuál es el plazo que tiene un organismo nacional para responder un pedido de acceso a la información pública según la Ley 27.275?". Respuesta: quince días hábiles, prorrogables por otros quince con fundamento, artículo 11. Acá la trampa es que mucha gente recuerda el plazo del decreto anterior, que era distinto, y que hay regímenes provinciales con otros plazos.

[00:11:17] **Martín Albarracín:** Y del grupo de citas.

[00:11:20] **Ana Paula Sosa:** "¿Qué artículo de la Ley 24.240 regula el derecho de arrepentimiento en ventas a distancia y cuál es el plazo?". Respuesta: artículo 34, diez días corridos. Es una ley muy modificada, y los números de artículo son de los que los modelos confunden.

[00:11:42] **Julián Ortiz:** Algo que noté al cargar las preguntas: Ana Paula las escribió como las escribiría una persona que no es abogada, sin jerga, pero sin ambigüedad. Eso es muy difícil y es lo que hace que la prueba mida algo real.

[00:12:00] **Ana Paula Sosa:** Porque la pregunta que importa no es si un abogado puede sacarle una buena respuesta al sistema. Es si una persona que entra a preguntar porque no tiene abogado recibe una respuesta en la que puede confiar.

[00:12:17] **Lucía Ferreyra:** ¿Hubo preguntas que descartaron?

[00:12:21] **Ana Paula Sosa:** Varias. Descarté todas las que tenían una respuesta discutida en doctrina, porque no quería evaluar opiniones. Y descarté las que dependían de la jurisdicción sin decirlo. Cada pregunta dice "nacional" o nombra la provincia.

[00:12:42] **Martín Albarracín:** ¿Y preguntas con trampa? ¿Normas que no existen?

[00:12:47] **Ana Paula Sosa:** Cinco, dentro del grupo de citas. Preguntas del tipo "¿qué establece el decreto tal sobre tal cosa?" donde el decreto no existe o trata de otro tema. Quería ver si el sistema decía "ese decreto no existe" o inventaba un contenido.

[00:13:08] **Julián Ortiz:** Esa es la prueba más dura y más justa que se le puede hacer a un modelo de lenguaje. Un buen sistema dice "no encuentro esa norma". Uno malo te explica el decreto con artículos y todo.

[00:13:24] **Lucía Ferreyra:** Adelanto: pasó lo segundo. Pero vamos en orden.

[00:13:32] **Martín Albarracín:** Antes de los resultados, un número que no es de la prueba pero da contexto. Julián, ¿cuánta gente usa estos sistemas para preguntas legales?

[00:13:44] **Julián Ortiz:** No hay datos argentinos confiables y no voy a inventar uno. Lo que puedo decir es cualitativo: en los sistemas en los que trabajé, las consultas sobre trámites, derechos y normativa eran una categoría grande y creciente. La gente pregunta por el alquiler, por una multa, por un despido. Y pregunta a las once de la noche, cuando no hay a quién más preguntarle.

[00:14:12] **Ana Paula Sosa:** Que es el punto. No compiten con un abogado. Compiten con no preguntarle a nadie.

[00:14:20] **Lucía Ferreyra:** Esa comparación va a importar al final, cuando hablemos de qué hacer.

[00:14:28] **Martín Albarracín:** ¿Cuánto tardó la evaluación?

[00:14:31] **Ana Paula Sosa:** Dos semanas. Doscientas cuarenta respuestas, más doscientos cuarenta links. Cada respuesta contra su criterio escrito. Y donde dudé, lo anoté como duda en la planilla y la discutimos entre los tres, con la fuente adelante.

[00:14:52] **Julián Ortiz:** Hubo once casos de duda. En la planilla están marcados y está la resolución de cada uno.

[00:15:02] **Lucía Ferreyra:** Un ejemplo de duda.

[00:15:05] **Ana Paula Sosa:** Una respuesta sobre el plazo de la 27.275 que decía "quince días" sin aclarar hábiles. ¿Es correcta, incompleta o incorrecta? Para un ciudadano, "quince días" se entiende como corridos, y eso lo perjudica. La marcamos incompleta, y en la planilla está por qué.

[00:15:30] **Martín Albarracín:** Esa distinción, correcta, incompleta, incorrecta, es importante para leer los números que siguen. "Incompleta" no es un error menor: en muchos casos la omisión te hace perder un plazo.

[00:15:46] **Ana Paula Sosa:** Para mí incompleta es peor que incorrecta en algunos casos, porque la incorrecta se detecta y la incompleta no.

[00:15:57] **Lucía Ferreyra:** Vamos a los resultados. Primero lo bueno.

## Resultados: lo que acertaron

[00:17:30] **Martín Albarracín:** Grupo uno, normas estables, veinte preguntas por cuatro sistemas, ochenta respuestas. Los cuatro sistemas estuvieron entre dieciséis y diecinueve correctas de veinte. El resto, mayormente incompletas. Incorrectas en este grupo: tres en total, de ochenta.

[00:17:55] **Ana Paula Sosa:** Y las tres incorrectas eran del mismo tipo: confundir el plazo genérico con un plazo especial. No disparates. Errores que un estudiante de tercer año también comete.

[00:18:10] **Julián Ortiz:** Esto no me sorprendió. El Código Civil y Comercial está en la red miles de veces, comentado, resumido, en fallos. Los modelos lo tienen muy bien representado. Para contenido estable y muy publicado, funcionan.

[00:18:28] **Lucía Ferreyra:** ¿Qué tan bien escritas estaban las respuestas correctas?

[00:18:33] **Ana Paula Sosa:** Muy bien. Eso hay que decirlo. Claras, en lenguaje llano, con ejemplos. Mejor que muchos sitios de organismos. Si yo tuviera que explicarle a alguien sin formación qué es la prescripción, varias de esas respuestas me servirían como base.

[00:18:55] **Martín Albarracín:** Grupo dos, datos que cambian. Acá se abre la diferencia entre sistemas. Los dos que tenían navegación activa estuvieron entre trece y quince correctas de veinte. Los dos sin navegación, entre ocho y once.

[00:19:15] **Julián Ortiz:** Que es lo esperable: sin navegación, el modelo responde con lo que sabía a su fecha de corte. Si el plazo cambió después, responde el viejo. Con navegación, a veces encuentra la norma nueva. A veces.

[00:19:33] **Ana Paula Sosa:** Lo que me llamó la atención en este grupo fue la pregunta sobre la autoridad de aplicación. Varios sistemas nombraron un organismo que fue reestructurado y cambió de nombre. La respuesta era correcta hace tres años. Y la daban en presente.

[00:19:55] **Lucía Ferreyra:** Sin señal de duda.

[00:19:58] **Ana Paula Sosa:** Vamos a esa columna porque es el dato que más me importa. De las doscientas cuarenta respuestas, las que incluían alguna señal de incertidumbre fueron veintitrés. Y de esas veintitrés, la mayoría eran respuestas correctas. Es decir, los sistemas dudaban cuando acertaban y afirmaban cuando se equivocaban.

[00:20:25] **Martín Albarracín:** Quiero que eso quede claro porque es contraintuitivo. La señal de duda no está correlacionada con el error. Si acaso, al revés.

[00:20:36] **Julián Ortiz:** Tiene una explicación técnica. Los sistemas están entrenados para agregar frases como "consultá con un profesional" en temas legales, como medida de cobertura. Eso aparece en cualquier respuesta legal, acierte o no. No es una estimación real de la confianza del modelo. Es un disclaimer de fábrica.

[00:21:02] **Ana Paula Sosa:** Que para el usuario es ruido. Si todas las respuestas dicen "consultá con un profesional", ninguna lo dice.

[00:21:12] **Lucía Ferreyra:** Volvamos a lo que acertaron, que todavía estamos ahí. En el grupo dos, ¿qué tipo de pregunta respondieron bien?

[00:21:21] **Ana Paula Sosa:** Las de plazos de leyes que no se modificaron en los últimos años, aunque fueran menos conocidas. Y las de competencia: qué organismo hace qué, siempre que el organismo no hubiera cambiado.

[00:21:38] **Martín Albarracín:** Grupo tres, citas precisas. Acá los números bajan en todos. Entre siete y doce correctas de veinte, según el sistema. Y, a diferencia de los otros grupos, muchas incorrectas, no incompletas.

[00:21:57] **Julián Ortiz:** Pero antes de ir a lo malo, quiero rescatar algo del grupo tres. Las preguntas que pedían el artículo de una norma muy citada, como el artículo 34 de la 24.240 o el 2560 del Código, las acertaron casi todos. El problema fue con los artículos de normas menos famosas.

[00:22:20] **Ana Paula Sosa:** Sí. Hay una regla que se puede extraer: cuanto más citada es una norma en internet, más probable que el número de artículo esté bien. Eso es útil para saber cuándo desconfiar.

[00:22:36] **Lucía Ferreyra:** Resumen de lo bueno, en una frase cada uno.

[00:22:41] **Ana Paula Sosa:** Para explicar qué dice una norma conocida en lenguaje claro, sirven.

[00:22:48] **Julián Ortiz:** Para datos estables y muy publicados, son confiables en un nivel comparable a una buena búsqueda.

[00:22:56] **Martín Albarracín:** Y para preguntas donde la respuesta no cambió en años, el tipo de sistema importa poco: todos anduvieron.

[00:23:06] **Lucía Ferreyra:** Ahora, lo otro.

## Resultados: dónde inventaron

[00:24:50] **Martín Albarracín:** Las cinco preguntas trampa. Decretos que no existen o que tratan de otro tema. Veinte respuestas en total, cinco por sistema.

[00:25:02] **Ana Paula Sosa:** Catorce de veinte explicaron el contenido del decreto inexistente. Con artículos. Con fecha de publicación. Con organismo. Tres dijeron que no encontraban la norma. Tres dieron una respuesta ambigua, del tipo "ese decreto regula aspectos relacionados con", sin comprometerse.

[00:25:28] **Julián Ortiz:** Catorce de veinte es mucho peor de lo que yo esperaba, y lo digo como alguien que defiende estos sistemas. Es el caso donde el modelo tiene toda la información para decir "no sé" y elige completar.

[00:25:44] **Lucía Ferreyra:** Danos un ejemplo concreto.

[00:25:48] **Ana Paula Sosa:** Preguntamos por un decreto con un número que no corresponde a ninguno publicado ese año, sobre "régimen de notificaciones electrónicas en el procedimiento administrativo". Un sistema respondió con una explicación de cuatro párrafos: objeto, ámbito de aplicación, obligaciones de los organismos, plazos de entrada en vigencia. Todo inventado. Todo verosímil. Si yo no supiera que el decreto no existe, lo citaba.

[00:26:22] **Martín Albarracín:** Y cuando le pidieron el link.

[00:26:25] **Ana Paula Sosa:** Dio un link al Boletín Oficial con el formato correcto de los links del Boletín Oficial. El link no existe. Lleva a un error.

[00:26:38] **Julián Ortiz:** El formato correcto es lo que lo hace peligroso. El modelo aprendió cómo se ven los links de boletinoficial.gob.ar y genera uno que se ve igual. No tiene forma de saber si existe, porque no lo está buscando: lo está escribiendo.

[00:26:56] **Lucía Ferreyra:** Ana Paula, lo que dijiste antes de grabar.

[00:27:05] **Ana Paula Sosa:** El problema no es que se equivoquen. Es que se equivocan con la misma cara con la que aciertan. Una persona que no sabe no puede distinguir. Y una persona que sabe tiene que verificar todo, con lo cual el tiempo que ahorró lo pierde.

[00:27:27] **Martín Albarracín:** Los links en general, no solo los de las trampas. Doscientos cuarenta pedidos de fuente.

[00:27:35] **Julián Ortiz:** Los clasificamos en cuatro: link correcto a la norma exacta; link a InfoLEG o al Boletín pero a otra norma; link con formato válido que no existe; y sin link, con una respuesta del tipo "podés buscarlo en InfoLEG". Los sistemas con navegación dieron muchos más links correctos. Los sin navegación dieron una proporción alta de links inexistentes y de links a otras normas.

[00:28:08] **Ana Paula Sosa:** El que más me preocupa es el segundo tipo: un link real, que abre, que lleva a InfoLEG, pero a otra ley. Porque la persona ve que el link funciona, ve el logo del ministerio, y confía. No lee que es otra norma.

[00:28:28] **Lucía Ferreyra:** Volvamos al grupo tres completo, las citas. ¿Qué tipos de error aparecieron?

[00:28:35] **Ana Paula Sosa:** Cuatro tipos, que adaptamos de la tipología del paper de Stanford y Yale que linkeamos. Número de artículo incorrecto: la norma es la correcta pero el artículo es otro. Norma incorrecta: el contenido es correcto pero lo atribuye a otra ley. Organismo incorrecto: una resolución real atribuida a otro organismo. Y norma inexistente, que es la trampa pero también apareció espontáneamente en preguntas normales.

[00:29:10] **Martín Albarracín:** ¿Espontáneamente?

[00:29:13] **Ana Paula Sosa:** En cuatro respuestas a preguntas legítimas, el sistema citó, para reforzar, una resolución o un decreto que no existe. No se lo pedimos. Lo agregó como apoyo. Y es lo que hace que una respuesta parezca más sólida.

[00:29:32] **Julián Ortiz:** Eso es importante: la alucinación no aparece solo cuando preguntás por algo falso. Aparece como decoración de respuestas correctas. El núcleo de la respuesta está bien y la cita de apoyo está inventada.

[00:29:50] **Lucía Ferreyra:** ¿Hubo diferencias grandes entre sistemas en este grupo?

[00:29:55] **Julián Ortiz:** Hubo diferencias, y están en la planilla por sistema. Pero insisto en no convertirlo en ranking porque la diferencia entre el mejor y el peor en citas fue menor que la diferencia entre el grupo uno y el grupo tres en cualquier sistema. El tipo de pregunta importa más que el producto.

[00:30:18] **Martín Albarracín:** Eso es un hallazgo en sí mismo. Si estás eligiendo un sistema, la pregunta no es cuál sino para qué.

[00:30:28] **Ana Paula Sosa:** Una última cosa de este bloque. Las respuestas incorrectas estaban, en promedio, mejor escritas que las correctas. Más largas, más estructuradas, con más subtítulos. Lo medimos a ojo, no es una estadística, pero los tres lo notamos.

[00:30:48] **Julián Ortiz:** Tiene lógica. Cuando el modelo no tiene el dato, genera más texto alrededor. Cuando lo tiene, responde y listo.

[00:30:58] **Lucía Ferreyra:** O sea que la longitud y la prolijidad son una señal de alerta, no de calidad.

[00:31:05] **Ana Paula Sosa:** En este dominio, sí. Y es exactamente al revés de cómo lee la gente.

[00:31:15] **Martín Albarracín:** Vamos a por qué pasa esto, porque sin eso no se puede pensar qué hacer.

## Por qué pasa esto

[00:32:10] **Julián Ortiz:** Voy a tratar de explicarlo sin jerga. Un modelo de lenguaje genera texto palabra por palabra, eligiendo cada vez la continuación más probable según lo que vio en su entrenamiento. Cuando le preguntás por el artículo 2560 del Código, esa secuencia apareció tantas veces que la probabilidad de "cinco años" es altísima. Cuando le preguntás por un decreto oscuro, no hay secuencia memorizada, y el modelo igual tiene que elegir la palabra siguiente. Elige la que mejor suena.

[00:32:50] **Lucía Ferreyra:** No tiene un paso de "no sé".

[00:32:53] **Julián Ortiz:** Tiene algo parecido, pero es débil. Los sistemas se entrenan además para ser útiles y para responder, y eso empuja hacia completar. Decir "no existe ese decreto" requiere que el modelo haya aprendido específicamente a hacerlo, y es una conducta que se entrena menos porque es menos frecuente en los datos.

[00:33:18] **Ana Paula Sosa:** Desde el derecho, lo que yo veo es que el modelo aprendió la forma del discurso jurídico, que es muy regular: "el artículo tal establece", "conforme el decreto tal", "la autoridad de aplicación es". Aprendió el molde. Y llena el molde con lo que tenga.

[00:33:40] **Martín Albarracín:** Lo segundo: la fecha de corte.

[00:33:44] **Julián Ortiz:** Cada modelo se entrena con datos hasta cierta fecha. Lo que pasó después no lo sabe, salvo que navegue. Y la normativa argentina cambia mucho: plazos, montos, organismos. Un modelo con corte de hace un año responde con el mundo de hace un año, y lo responde en presente, porque no tiene noción del tiempo.

[00:34:08] **Ana Paula Sosa:** Eso explica el grupo dos casi completo.

[00:34:12] **Lucía Ferreyra:** Lo tercero, que me parece menos discutido: la representación de la normativa argentina en los datos de entrenamiento.

[00:34:22] **Julián Ortiz:** Es un punto clave. Estos modelos se entrenan mayormente con texto en inglés, y dentro del español, con lo que más circula. El derecho argentino está en InfoLEG, en el Boletín, en fallos, en algunos blogs. Comparado con el derecho de Estados Unidos, es una fracción minúscula. El modelo sabe mucho menos de la 27.275 que de cualquier ley federal norteamericana, y cuando sabe menos, completa más.

[00:34:55] **Ana Paula Sosa:** Y a veces completa con derecho de otro país. Vimos dos respuestas que describían un procedimiento que es correcto en España y no en Argentina. Con terminología española.

[00:35:10] **Martín Albarracín:** O sea que el modelo "piensa" en el sistema jurídico que más vio.

[00:35:16] **Julián Ortiz:** No piensa, pero la tendencia es esa. Es un sesgo de los datos de entrenamiento que tiene consecuencias directas para un país chico en volumen de texto.

[00:35:30] **Lucía Ferreyra:** Lo cuarto: los links.

[00:35:33] **Julián Ortiz:** Un modelo sin navegación no puede consultar una URL. Cuando le pedís un link, hace lo mismo que con el texto: genera la secuencia de caracteres más probable. Para boletinoficial.gob.ar hay un patrón, con números, y el modelo lo reproduce. No está mintiendo en el sentido humano: está completando un patrón. Pero el resultado es un link falso con aspecto de verdadero.

[00:36:03] **Ana Paula Sosa:** Para mí esto debería estar en la pantalla de cualquier sistema que se use en el Estado: "los links de esta respuesta pueden no existir". Con esas palabras.

[00:36:17] **Martín Albarracín:** Y con navegación mejora, pero.

[00:36:20] **Julián Ortiz:** Mejora mucho en links y en datos recientes. Pero introduce otro problema: el sistema busca, encuentra tres páginas, y elige. Si elige un blog desactualizado en vez de InfoLEG, responde mal con un link real. Vimos varios de esos.

[00:36:42] **Lucía Ferreyra:** Última causa, que es institucional y no técnica.

[00:36:47] **Ana Paula Sosa:** Que no hay un benchmark público de normativa argentina. No existe un conjunto de preguntas con respuesta verificada que cualquiera pueda usar para medir un sistema antes de ponerlo a responder al público. Nuestra prueba de sesenta es un intento mínimo. Debería existir uno de miles, mantenido por un organismo o una universidad, actualizado cuando cambia la norma.

[00:37:15] **Julián Ortiz:** Y con eso, los proveedores podrían decir "nuestro sistema acierta tanto en el benchmark argentino" y un funcionario podría exigirlo en un pliego.

[00:37:27] **Martín Albarracín:** Hoy el pliego dice "inteligencia artificial" y nada más.

[00:37:32] **Ana Paula Sosa:** Hoy el pliego dice lo que dice la demo.

[00:37:38] **Lucía Ferreyra:** Lo que puede hacer un organismo.

## Qué puede hacer un organismo

[00:39:20] **Martín Albarracín:** Supongamos que alguien que nos escucha trabaja en un organismo y tiene que decidir si pone un sistema de estos a responder al público. Tres recomendaciones por cabeza.

[00:39:33] **Ana Paula Sosa:** Primera: definir qué tipo de pregunta va a responder. Si es explicar qué dice una norma estable en lenguaje claro, los datos dicen que puede funcionar con revisión. Si es dar plazos, montos o citas, no sin conectarlo a la fuente oficial y mostrar la fuente en cada respuesta.

[00:39:58] **Julián Ortiz:** Segunda: conectarlo a la fuente oficial no es opcional. Técnicamente se llama recuperación aumentada: el sistema busca en InfoLEG, en el Boletín o en los documentos del organismo y responde a partir de eso, con el link al documento que usó. No elimina errores, pero cambia la pregunta de "¿el modelo sabe?" a "¿el modelo leyó bien el documento correcto?", que es verificable.

[00:40:30] **Lucía Ferreyra:** Tercera.

[00:40:32] **Ana Paula Sosa:** Que cada respuesta diga de dónde sale. Si no tiene fuente, que lo diga. Y que el sistema tenga prohibido generar links: los links tienen que venir del documento recuperado, no del modelo.

[00:40:50] **Julián Ortiz:** Cuarta, mía: medir antes de lanzar y después de cada cambio. Con un conjunto de preguntas como el nuestro, adaptado al organismo. Si la precisión en citas baja de cierto umbral, el sistema no responde ese tipo de pregunta y deriva a una persona.

[00:41:12] **Martín Albarracín:** Quinta: publicar las métricas. Si un organismo pone un sistema a responder, que publique cuántas preguntas recibe, qué porcentaje deriva y los resultados de la evaluación. Como datos abiertos.

[00:41:30] **Ana Paula Sosa:** Y sexta, la más simple: una línea, arriba de cada respuesta, que diga "esta respuesta fue generada automáticamente y puede contener errores; verificá en la fuente antes de actuar". No en letra chica. Arriba.

[00:41:50] **Lucía Ferreyra:** ¿Y para una persona común, que no es organismo? ¿Qué le dirían?

[00:41:57] **Ana Paula Sosa:** Que use el chatbot para entender, no para citar. Para que te explique qué es la prescripción, sirve. Para saber si tu plazo venció, andá a la fuente o a una persona.

[00:42:12] **Julián Ortiz:** Y que desconfíe de los links y de las respuestas largas y prolijas con muchos artículos citados. Que pida la fuente y la abra. Si no abre o es otra norma, descarte la respuesta entera.

[00:42:30] **Martín Albarracín:** Qué cambia y qué no.

[00:42:34] **Lucía Ferreyra:** Lo que cambia: una persona sin abogado puede entender qué dice una norma a las once de la noche, en lenguaje claro, y eso antes no existía. Lo que no cambia: el dato exacto, el plazo, el artículo, el link, sigue estando solamente en la fuente oficial, y nadie, ni el modelo ni el usuario, puede saltearse el paso de ir a buscarlo.

[00:43:02] **Ana Paula Sosa:** Y agregaría lo que empeora si no se hace nada: respuestas con aspecto oficial, con links con aspecto oficial, circulando sin que nadie sepa que son inventadas. Eso ya pasa, y va a pasar más.

[00:43:20] **Julián Ortiz:** Y lo que mejoraría con una sola decisión pública: un benchmark argentino, abierto, mantenido. No es caro. Es trabajo de gente como Ana Paula, con tiempo pago.

[00:43:35] **Martín Albarracín:** Lo anotamos como propuesta concreta y como caso para seguir.

## Cierre y fuentes

[00:44:00] **Lucía Ferreyra:** Fuentes del episodio, todas en la página. El Código Civil y Comercial, la Ley 27.275 y la Ley 24.240 en InfoLEG, que son las normas de las que salieron la mayoría de las preguntas. InfoLEG como base contra la que se verificó cada respuesta. Y el paper de Stanford y Yale sobre alucinaciones legales, del que adaptamos la tipología de errores. Además, publicadas aparte: las sesenta preguntas con su respuesta correcta y link, las doscientas cuarenta respuestas sin editar y la planilla de evaluación.

[00:44:38] **Martín Albarracín:** Cómo usamos IA en este episodio: los cuatro chatbots son el objeto de la prueba. La transcripción es automática y la revisó Lucía. El borrador del resumen y de los capítulos lo generó un modelo y lo corregimos. Las preguntas las escribió Ana Paula sin IA, la evaluación la hizo Ana Paula sin IA, y las fuentes y conclusiones son nuestras.

[00:45:05] **Lucía Ferreyra:** Si alguien encuentra un error en la evaluación de alguna pregunta, la planilla tiene un número por fila: escribinos con ese número y lo revisamos en público.

[00:45:18] **Ana Paula Sosa:** Y si alguna universidad u organismo quiere tomar las sesenta preguntas como base para algo más grande, son de uso libre.

[00:45:28] **Julián Ortiz:** Yo pongo el código de la recolección. Está publicado.

[00:45:34] **Martín Albarracín:** Gracias a los dos.

[00:45:37] **Ana Paula Sosa:** Gracias.

[00:45:39] **Julián Ortiz:** Gracias.

[00:45:42] **Lucía Ferreyra:** Esto fue Señal Pública. Hasta el próximo episodio.
