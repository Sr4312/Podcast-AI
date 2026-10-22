---
numero: 2
temporada: 1
titulo: "El chatbot de un municipio, seis meses después"
bajada: "Un municipio mediano puso un asistente de IA a responder consultas de vecinos. Su secretario de Modernización cuenta qué funcionó, qué salió mal y cuánto costó."
fecha: 2026-09-17
duracion: "00:41:05"
formato: caso
ejes: [politica-publica, economia]
temas: [municipios, atencion-ciudadana, gobierno-digital, costos-del-estado, datos-personales]
invitados: [diego-lamarque]
destacado: true
audio:
  url: "/audio/002-el-chatbot-de-un-municipio.mp3"
  bytes: 9860574
youtube: "dQw4w9WgXcQ" # TODO ID real del video (placeholder de demo)
plataformas:
  youtube: "https://www.youtube.com/@senalpublica" # TODO link al episodio
  spotify: "https://open.spotify.com/show/ejemplo-senal-publica" # TODO link al episodio
  apple: "https://podcasts.apple.com/ar/podcast/ejemplo-senal-publica" # TODO link al episodio
resumen:
  puntos:
    - "El asistente resolvió bien las consultas de horarios, requisitos y estado de trámites, que eran la mayoría, y descomprimió la mesa de entradas."
    - "Falló en lo que tenía excepciones: plazos que dependen del caso, tasas con descuentos y normativa local reciente que no estaba en los documentos cargados."
    - "El contrato se pagó por consulta procesada, y el costo mensual terminó siendo mayor que el estimado porque nadie había medido cuántas consultas había antes."
    - "El municipio no tenía definido qué pasa con los datos de las conversaciones ni quién responde cuando el asistente da una respuesta errónea."
    - "El cambio más valioso no fue el chatbot sino el inventario de trámites y respuestas que hubo que escribir para alimentarlo."
  contexto: "Este episodio sigue un caso de implementación en un municipio de tamaño medio, con un equipo de modernización de tres personas y una mesa de entradas que atendía consultas presenciales, telefónicas y por redes sin ningún registro unificado. En 2025 el municipio contrató a un proveedor para poner en marcha un asistente conversacional basado en un modelo de lenguaje, alimentado con los documentos de trámites del propio municipio. Seis meses después, hablamos con Diego Lamarque, el funcionario que lideró el proyecto, que aceptó discutir en público tanto los resultados como los errores. Recorremos el caso en orden: qué problema querían resolver, qué compraron y cómo se pagó, qué pasó en las primeras semanas, dónde falló, qué se hizo con los datos de las personas y qué le diría a otro intendente que esté por firmar un contrato parecido. El municipio, el funcionario y las cifras de este episodio son ficticios, creados para la demo del sitio."
frase:
  texto: "Lo que más sirvió no fue el bot. Fue que por primera vez tuvimos que escribir en un documento cómo se hace cada trámite. Eso no lo teníamos."
  autor: "Diego Lamarque"
  t: "00:36:48"
capitulos:
  - { t: "00:00:00", titulo: "Presentación" }
  - { t: "00:02:50", titulo: "Un lunes en la mesa de entradas" }
  - { t: "00:09:20", titulo: "Qué compró el municipio y cuánto costó" }
  - { t: "00:16:10", titulo: "Primeras semanas: lo que funcionó" }
  - { t: "00:22:40", titulo: "Lo que salió mal" }
  - { t: "00:29:30", titulo: "Datos personales y quién responde" }
  - { t: "00:35:15", titulo: "Qué le diría a otro intendente" }
  - { t: "00:39:00", titulo: "Cierre y fuentes" }
fuentes:
  - titulo: "Ley 25.326 de Protección de los Datos Personales"
    url: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/norma.htm"
    tipo: norma
    organismo: "InfoLEG, Ministerio de Justicia"
    fecha: 2000-10-30
    verificada: true
    nota: "Obligaciones del responsable del tratamiento (arts. 9 y 10) que discutimos al hablar de las conversaciones almacenadas por el proveedor."
  - titulo: "Portal Nacional de Datos Abiertos"
    url: "https://datos.gob.ar"
    tipo: dataset
    organismo: "Jefatura de Gabinete de Ministros"
    verificada: true
    nota: "Referencia al hablar de publicar el inventario de trámites y las métricas del asistente como datos abiertos."
  - titulo: "Algorithmic Accountability for the Public Sector"
    url: "https://www.opengovpartnership.org/documents/algorithmic-accountability-public-sector/"
    tipo: documento-oficial
    organismo: "Open Government Partnership, Ada Lovelace Institute, AI Now Institute"
    fecha: 2021-08-01
    verificada: false
    nota: "Informe sobre mecanismos de rendición de cuentas para sistemas automatizados en el Estado. Falta confirmar la URL del documento completo."
  - titulo: "Recomendación sobre la ética de la inteligencia artificial"
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000381137"
    tipo: documento-oficial
    organismo: "UNESCO"
    fecha: 2021-11-23
    verificada: true
    nota: "Principio de supervisión y determinación humanas, citado al discutir quién responde por una respuesta errónea del asistente."
ia:
  usada_para: ["transcripción automática del audio", "borrador del resumen y de los capítulos"]
  no_usada_para: ["selección de fuentes", "verificación de las cifras del caso", "conclusiones del episodio"]
  revisado_por: "Martín Albarracín"
seguimiento: []
correcciones:
  - fecha: 2026-09-24
    texto: "En la primera versión del resumen decíamos que el contrato se pagaba por mes. Se paga por consulta procesada, con un mínimo mensual, como se explica en el minuto 11:40. Corregido."
estado: publicado
ejemplo: true
---

## Presentación

[00:00:00] **Martín Albarracín:** Bienvenidos a Señal Pública. Soy Martín Albarracín.

[00:00:08] **Lucía Ferreyra:** Y yo soy Lucía Ferreyra. Hoy cambiamos de formato. El episodio pasado fue un laboratorio: armamos una prueba y vimos qué pasaba. Este es un caso: algo que ya pasó, en un lugar concreto, y lo vamos a reconstruir con la persona que lo hizo.

[00:00:34] **Martín Albarracín:** El lugar es un municipio de tamaño medio, de esos que tienen una mesa de entradas, una línea telefónica que nadie atiende a tiempo y una cuenta de Instagram donde los vecinos preguntan de todo. En 2025 el municipio contrató un asistente de inteligencia artificial para responder consultas. Pasaron seis meses.

[00:01:02] **Lucía Ferreyra:** Con nosotros está Diego Lamarque, secretario de Modernización del municipio, que lideró el proyecto. Diego, lo primero: gracias por venir a hablar también de lo que salió mal, que no es lo habitual.

[00:01:20] **Diego Lamarque:** Gracias a ustedes. Lo pensé bastante antes de aceptar. Me convenció que ustedes publican las fuentes y la transcripción completa. Si voy a contar errores, prefiero que se escuche todo y no un recorte.

[00:01:40] **Martín Albarracín:** Una aclaración de método. Diego es funcionario del municipio que contrató el sistema, y eso está declarado en la página del episodio como conflicto de interés. No es neutral, y no se lo pedimos. Lo que sí le pedimos fueron los números, y los trajo.

[00:02:03] **Lucía Ferreyra:** Y una aclaración sobre el proveedor: no vamos a decir el nombre de la empresa. El punto del episodio no es evaluar un producto sino una decisión pública. Lo que contamos aplica a cualquier sistema de este tipo.

[00:02:24] **Diego Lamarque:** Eso también me lo pidieron a mí desde el municipio, para ser transparente.

[00:02:31] **Martín Albarracín:** Empecemos por antes del chatbot. Diego, llevanos a un lunes cualquiera en la mesa de entradas, en 2024.

## Un lunes en la mesa de entradas

[00:02:50] **Diego Lamarque:** Un lunes a las ocho de la mañana hay quince personas en la fila. Dos empleadas atienden. De esas quince, mi estimación de aquel momento, porque no teníamos registro, es que diez venían a preguntar algo que se resuelve en treinta segundos: a qué hora abre tal oficina, qué papeles necesito para habilitar un comercio, si ya salió mi certificado. Y cinco venían a hacer un trámite de verdad.

[00:03:25] **Lucía Ferreyra:** Diez de quince que podrían no haber ido.

[00:03:29] **Diego Lamarque:** Que podrían haber preguntado por teléfono, si alguien atendiera el teléfono. El teléfono lo atendían las mismas dos empleadas, cuando podían. Y las redes las manejaba el área de prensa, que respondía "te mandamos mensaje privado" y después se olvidaba.

[00:03:50] **Martín Albarracín:** Dijiste "mi estimación porque no teníamos registro". Quiero detenerme ahí porque va a volver después.

[00:03:59] **Diego Lamarque:** Sí, y es el primer error, anterior al chatbot. No sabíamos cuántas consultas recibíamos ni de qué tipo. Teníamos una sensación. Cuando fuimos a contratar, el proveedor nos preguntó el volumen mensual y le dijimos un número que inventamos entre tres personas en una reunión.

[00:04:22] **Lucía Ferreyra:** ¿Cuál era el problema que querían resolver? Porque "la fila" es un síntoma.

[00:04:30] **Diego Lamarque:** El problema que escribimos en el proyecto era "reducir el tiempo de espera presencial". El problema real, que entendí después, era que no teníamos ninguna fuente única de respuestas. Cada empleada respondía según lo que sabía. Si preguntabas lo mismo en la mesa de entradas, por teléfono y por Instagram, podías recibir tres respuestas distintas.

[00:04:58] **Martín Albarracín:** Esto que decís es importante porque es un problema de información, no de tecnología.

[00:05:05] **Diego Lamarque:** Totalmente. Y lo que nos vendieron era tecnología.

[00:05:12] **Lucía Ferreyra:** ¿Cómo llegó la idea del chatbot? ¿Fue de ustedes o vino de afuera?

[00:05:19] **Diego Lamarque:** Vino de afuera. Un proveedor que ya trabajaba con otro municipio de la provincia nos mostró una demo. La demo era muy buena: le preguntabas cualquier cosa y respondía con naturalidad. El intendente la vio y la decisión estaba tomada antes de que mi equipo evaluara nada.

[00:05:44] **Martín Albarracín:** ¿Hubo licitación?

[00:05:47] **Diego Lamarque:** Hubo una contratación directa, dentro de los montos que la ordenanza permite. Legal, pero sin comparar alternativas. Eso también lo cuento como error.

[00:06:02] **Lucía Ferreyra:** ¿Y qué alternativas había?

[00:06:06] **Diego Lamarque:** Mirando para atrás, al menos dos. Una era no comprar nada y escribir las respuestas en una página web bien organizada, con un buscador. Otra era un sistema de preguntas frecuentes con menú, de los de antes, sin modelo de lenguaje. Más tonto pero predecible.

[00:06:30] **Martín Albarracín:** ¿Por qué no se consideraron?

[00:06:33] **Diego Lamarque:** Porque la demo era mejor. Y porque "inteligencia artificial" en el título de un proyecto municipal consigue apoyo político que "página web ordenada" no consigue. Lo digo sin ironía: es un dato de la realidad.

[00:06:55] **Lucía Ferreyra:** Lo anotamos. Es un patrón que vamos a ver en otros casos: la tecnología se elige por lo que comunica, no por lo que resuelve.

[00:07:08] **Diego Lamarque:** Ahora, para ser justo con el intendente: la demo también le mostró algo real. Que los vecinos podían escribir como hablan, con errores, con medias palabras, y el sistema entendía. Eso el menú de preguntas frecuentes no lo hace, y es una diferencia genuina para gente que no está acostumbrada a los formularios.

[00:07:35] **Martín Albarracín:** Esa es la ventaja real de los modelos de lenguaje en atención ciudadana: la tolerancia a cómo pregunta la gente. Lo que hay que ver es si vale lo que cuesta.

[00:07:50] **Lucía Ferreyra:** ¿Quiénes eran los usuarios que tenían en la cabeza?

[00:07:55] **Diego Lamarque:** Comerciantes que hacen habilitaciones, gente que paga tasas, gente que pide turnos. Adultos, en general. Después descubrimos que una parte grande de las consultas venía de personas mayores que preguntaban por el transporte y por la farmacia de turno, que ni siquiera estaban en nuestro inventario.

[00:08:22] **Martín Albarracín:** O sea que el inventario de preguntas lo armaron antes de saber qué preguntaba la gente.

[00:08:29] **Diego Lamarque:** Exactamente al revés de como hay que hacerlo.

[00:08:35] **Lucía Ferreyra:** Vamos a la compra. Qué compraron exactamente y cómo se pagó.

## Qué compró el municipio y cuánto costó

[00:09:20] **Diego Lamarque:** Compramos un servicio, no un sistema. El proveedor pone el asistente, que funciona sobre un modelo de lenguaje de una empresa grande, y lo conecta con documentos que nosotros le damos. Cuando un vecino pregunta, el asistente busca en nuestros documentos, le pasa los fragmentos relevantes al modelo y el modelo redacta la respuesta.

[00:09:50] **Martín Albarracín:** Eso que describís tiene nombre: recuperación aumentada. El modelo no sabe nada del municipio; responde a partir de los documentos que se le muestran en cada consulta.

[00:10:04] **Diego Lamarque:** Sí, aunque la palabra la aprendí después. Al principio yo creía que el sistema "aprendía" nuestros trámites. No aprende nada. Si el documento no está, inventa o dice que no sabe, según el día.

[00:10:22] **Lucía Ferreyra:** ¿Qué documentos le dieron?

[00:10:25] **Diego Lamarque:** Acá está la primera sorpresa. No teníamos documentos. Teníamos ordenanzas en PDF escaneado, un folleto de habilitaciones de 2019 y lo que sabían las empleadas. El proveedor nos dijo: necesitamos una ficha por trámite, con requisitos, costos, plazos y oficina. Eso llevó dos meses y lo escribió mi equipo con las empleadas de la mesa de entradas.

[00:10:58] **Martín Albarracín:** Guardá eso porque vas a decir al final que fue lo más valioso.

[00:11:04] **Diego Lamarque:** Lo voy a decir.

[00:11:08] **Lucía Ferreyra:** El precio.

[00:11:12] **Diego Lamarque:** Un costo de implementación inicial, fijo, y después un pago por consulta procesada, con un mínimo mensual. El mínimo cubría una cantidad de consultas que el proveedor calculó a partir del número que nosotros le habíamos inventado.

[00:11:40] **Martín Albarracín:** Y acá va la corrección que publicamos la semana pasada: en el resumen original dijimos "pago mensual" y es "pago por consulta con mínimo mensual". No es lo mismo, y la diferencia es el centro de lo que sigue.

[00:11:57] **Diego Lamarque:** No es lo mismo porque cuando el asistente empezó a funcionar, las consultas fueron más del triple de lo que habíamos estimado. Parte era demanda que existía y no veíamos. Parte era gente que probaba el sistema por curiosidad. Y parte, que no esperábamos, eran conversaciones largas: una persona hacía ocho preguntas seguidas y cada una contaba como consulta.

[00:12:30] **Lucía Ferreyra:** Entonces la factura del segundo mes fue más alta que la del mínimo.

[00:12:35] **Diego Lamarque:** Bastante más alta. No voy a dar el número exacto porque está en una negociación, pero el orden de magnitud fue: lo que habíamos presupuestado para un año se gastó en cinco meses.

[00:12:52] **Martín Albarracín:** Quiero traducir esto a algo que sirva para cualquier municipio. El precio de estos sistemas está atado a tokens, que es la unidad en que el modelo procesa texto. El proveedor le paga a la empresa del modelo por token y te cobra a vos por consulta. Si no sabés cuántas consultas vas a tener ni cuán largas, no sabés cuánto vas a pagar. Es como contratar un servicio de agua sin medidor y descubrir el consumo con la primera factura.

[00:13:30] **Diego Lamarque:** Es exacto. Y lo peor es que no teníamos forma de discutir la factura, porque la métrica de "consulta" la definía el proveedor y los registros los tenía el proveedor.

[00:13:45] **Lucía Ferreyra:** ¿El contrato decía algo sobre acceso a los registros?

[00:13:50] **Diego Lamarque:** Decía que teníamos acceso a "reportes". Reportes eran un PDF mensual con totales. No las conversaciones, no los tiempos, no las consultas sin respuesta.

[00:14:05] **Martín Albarracín:** ¿Qué hubieras puesto en el contrato, hoy?

[00:14:10] **Diego Lamarque:** Tres cosas. Definición exacta de qué es una consulta facturable. Acceso completo a los registros en formato de datos, no en PDF. Y un tope mensual con corte: si se pasa, el sistema avisa y se decide si seguir.

[00:14:30] **Lucía Ferreyra:** Esas tres cosas no son técnicas. Son cláusulas.

[00:14:35] **Diego Lamarque:** Son cláusulas que nadie en el municipio sabía que había que pedir, incluido yo.

[00:14:44] **Martín Albarracín:** Una pregunta sobre el costo de oportunidad. Lo que se gastó en el chatbot, ¿qué otra cosa hubiera comprado?

[00:14:53] **Diego Lamarque:** Dos empleadas más en la mesa de entradas por un año, más o menos. No digo que hubiera sido mejor. Digo que nunca hicimos esa comparación, y había que hacerla.

[00:15:10] **Lucía Ferreyra:** Esa comparación es la que vamos a pedir en cada caso que analicemos: no "cuánto cuesta el sistema" sino "cuánto cuesta contra la alternativa más aburrida".

[00:15:25] **Martín Albarracín:** Vamos a las primeras semanas, que no fueron todas malas.

## Primeras semanas: lo que funcionó

[00:16:10] **Diego Lamarque:** Lo primero que funcionó fue lo más simple: horarios, direcciones, requisitos de trámites que no tienen excepciones. "Qué necesito para sacar la libreta sanitaria" tiene una respuesta, y el asistente la daba bien, a cualquier hora, por el canal que fuera.

[00:16:35] **Lucía Ferreyra:** ¿Cómo sabés que la daba bien?

[00:16:38] **Diego Lamarque:** Porque las primeras dos semanas leímos todas las conversaciones. Le pedimos al proveedor acceso de emergencia, que nos dio por fuera del contrato, y una persona de mi equipo las leyó una por una. Eso fue clave y no estaba planificado.

[00:16:58] **Martín Albarracín:** ¿Cuántas eran?

[00:17:01] **Diego Lamarque:** Varios cientos por semana. Se podía leer. Después ya no.

[00:17:08] **Lucía Ferreyra:** ¿Qué vieron en esas lecturas?

[00:17:12] **Diego Lamarque:** Tres cosas. Que la mayoría de las consultas eran de las simples, como suponíamos. Que la gente escribía con mucha más informalidad de la que imaginábamos, y el sistema la toleraba bien. Y que había una cantidad de preguntas sobre cosas que no eran del municipio: trámites provinciales, nacionales, el banco. El asistente, al principio, respondía igual.

[00:17:45] **Martín Albarracín:** ¿Respondía cosas sobre trámites provinciales sin tener documentos?

[00:17:50] **Diego Lamarque:** Respondía con lo que el modelo sabía de su entrenamiento, que era genérico y a veces viejo. Eso lo corregimos rápido con una instrucción: si no está en los documentos del municipio, decir que no es competencia municipal y dar el link al organismo. Pero lo corregimos porque lo leímos, no porque el sistema lo avisara.

[00:18:18] **Lucía Ferreyra:** El impacto en la fila.

[00:18:21] **Diego Lamarque:** Se notó. No tengo una medición rigurosa, insisto en esto, pero las empleadas lo dijeron y yo lo vi: la fila de la mañana bajó. Las consultas que quedaron en la mesa de entradas eran las de trámites reales. Eso para las empleadas fue un alivio enorme y creo que es el resultado más sólido de todo el proyecto.

[00:18:50] **Martín Albarracín:** Qué pasó con el teléfono y las redes.

[00:18:54] **Diego Lamarque:** El teléfono siguió igual, porque el asistente era por texto. Las redes mejoraron, porque prensa empezó a derivar al asistente en vez de prometer un mensaje privado.

[00:19:10] **Lucía Ferreyra:** Un detalle que me contaste antes de grabar y que me parece importante: el asistente respondía a las tres de la mañana.

[00:19:20] **Diego Lamarque:** Sí. Y eso cambió quién consultaba. Gente que trabaja en horario de oficina y nunca podía ir a la mesa de entradas empezó a preguntar de noche. Eso es demanda que antes no existía, no porque no hubiera necesidad sino porque no había canal. Es parte de por qué las consultas fueron el triple.

[00:19:48] **Martín Albarracín:** Esto es un punto económico interesante. Cuando bajás el costo de preguntar, la gente pregunta más. No es que el sistema "falló" en la estimación: es que cambió la demanda. Cualquier presupuesto que no contemple eso va a quedar corto.

[00:20:10] **Lucía Ferreyra:** ¿Y la calidad de las respuestas en las simples se mantuvo?

[00:20:16] **Diego Lamarque:** En las simples sí, mientras los documentos estuvieran actualizados. Que es la transición al siguiente tema.

[00:20:28] **Martín Albarracín:** Una más antes de pasar. ¿Hubo alguien del municipio que se opusiera?

[00:20:35] **Diego Lamarque:** Las empleadas, al principio, por miedo a que las reemplazaran. No pasó, y fueron ellas las que escribieron las fichas de trámites, así que terminaron siendo las que más sabían del sistema. Pero el miedo era razonable y nadie se los explicó antes.

[00:21:00] **Lucía Ferreyra:** ¿Cambió su trabajo?

[00:21:03] **Diego Lamarque:** Cambió para mejor en lo cotidiano: menos preguntas repetidas. Y cambió para peor en algo que no habíamos previsto: ahora les llegan los casos que el asistente no pudo resolver, que son los más difíciles, y les llegan con una persona que ya está enojada porque el bot le dio una vuelta.

[00:21:30] **Martín Albarracín:** El sistema filtró lo fácil y concentró lo difícil en las mismas dos personas.

[00:21:36] **Diego Lamarque:** Con el mismo sueldo.

[00:21:40] **Lucía Ferreyra:** Lo que salió mal.

## Lo que salió mal

[00:22:40] **Diego Lamarque:** Lo primero: las excepciones. Un trámite tiene una respuesta general y después tiene casos. La tasa de un comercio tiene un valor, pero hay descuentos por pago anticipado, por rubro, por zona. El asistente daba el valor general con total seguridad. La persona iba a pagar, descubría que era otro monto, y volvía enojada.

[00:23:12] **Martín Albarracín:** ¿Eso es un problema del sistema o de los documentos?

[00:23:17] **Diego Lamarque:** De los dos. Los documentos tenían las excepciones, pero en párrafos largos, y el modelo elegía la parte simple. Y el sistema no tenía forma de preguntar "¿de qué rubro es tu comercio?" antes de responder. Respondía con lo primero que encontraba.

[00:23:40] **Lucía Ferreyra:** Lo segundo.

[00:23:43] **Diego Lamarque:** La normativa nueva. El Concejo aprobó una ordenanza que cambiaba requisitos de habilitación. Nadie actualizó la ficha. Durante tres semanas el asistente dio requisitos derogados a todo el que preguntó. Con total seguridad, de nuevo.

[00:24:05] **Martín Albarracín:** ¿Cómo se enteraron?

[00:24:08] **Diego Lamarque:** Por un vecino que fue con los papeles viejos y la empleada le dijo que eso había cambiado. El vecino mostró la conversación con el asistente. Ahí nos dimos cuenta de que no teníamos ningún proceso para que un cambio de normativa llegara a los documentos del sistema.

[00:24:30] **Lucía Ferreyra:** Esto me parece el error más importante del caso, y no tiene nada de tecnológico. Es un problema de circuito administrativo: quién avisa a quién cuando cambia una norma.

[00:24:45] **Diego Lamarque:** Y ese circuito no existía antes del chatbot tampoco. Las empleadas se enteraban de los cambios por el diario local, a veces. El chatbot hizo visible un problema que ya teníamos.

[00:25:03] **Martín Albarracín:** Lo tercero.

[00:25:06] **Diego Lamarque:** Las respuestas inventadas. Pocas, en proporción, pero graves. Un vecino preguntó por un subsidio municipal que no existe, y el asistente le explicó los requisitos. Inventó un programa entero, con nombre, a partir de fragmentos de otros programas. La persona fue a la mesa de entradas a inscribirse.

[00:25:35] **Lucía Ferreyra:** Esto es lo que en el episodio anterior llamamos alucinación. El modelo completa con lo más probable cuando no tiene el dato.

[00:25:46] **Diego Lamarque:** Después de eso cambiamos la instrucción para que fuera mucho más conservador, y bajó. Pero también bajó la utilidad: empezó a decir "consultá en la mesa de entradas" para cosas que antes respondía bien. Hay una perilla entre inventar y no servir, y nadie te dice dónde ponerla.

[00:26:12] **Martín Albarracín:** ¿Midieron cuántas respuestas eran incorrectas?

[00:26:17] **Diego Lamarque:** No de forma sistemática, y es otro error. Tenemos la lectura de las primeras dos semanas y después muestras ocasionales. No puedo decirte un porcentaje confiable. Lo que puedo decir es que las incorrectas se concentraban en tres tipos: excepciones, normativa reciente y cosas que no existían.

[00:26:45] **Lucía Ferreyra:** Eso ya es un hallazgo útil, aunque no sea una cifra. Son tres categorías que cualquier municipio puede revisar antes de lanzar.

[00:26:58] **Martín Albarracín:** Lo cuarto, que me contaste y es menos obvio.

[00:27:03] **Diego Lamarque:** El tono. El asistente era amable de una forma que a algunos vecinos les molestaba. Pedía disculpas todo el tiempo, usaba frases largas, y cuando no sabía, en vez de decir "no sé" daba vueltas. Personas mayores, en particular, nos dijeron que preferían una respuesta corta y seca.

[00:27:30] **Lucía Ferreyra:** Eso también es una decisión de configuración.

[00:27:34] **Diego Lamarque:** Lo es, pero la configuración venía por defecto del proveedor y nosotros no sabíamos que se podía cambiar. Hay un documento de instrucciones del sistema, un prompt, que define cómo habla. Lo vimos por primera vez al cuarto mes.

[00:27:55] **Martín Albarracín:** ¿Ese documento es público?

[00:28:00] **Diego Lamarque:** No lo era. Yo creo que debería serlo. Si el municipio le habla a los vecinos a través de un sistema, cómo está instruido ese sistema es una decisión pública.

[00:28:15] **Lucía Ferreyra:** Lo anotamos como recomendación concreta: el prompt del sistema como documento público.

[00:28:25] **Martín Albarracín:** ¿Algo que salió mal y fuera culpa del proveedor, no del municipio?

[00:28:31] **Diego Lamarque:** El acceso a los datos, que ya dije. Y que la demo mostraba un sistema con documentos perfectos que ellos habían preparado, y nunca nos dijeron cuánto trabajo era llegar a eso. No mintieron. Pero no lo dijeron.

[00:28:52] **Lucía Ferreyra:** Vamos a los datos personales, que es la parte que menos se discutió y más me preocupa.

## Datos personales y quién responde

[00:29:30] **Lucía Ferreyra:** Un vecino le escribe al asistente "soy Juan Pérez, DNI tanto, quiero saber si mi expediente de discapacidad ya salió". Esa conversación, ¿dónde queda?

[00:29:45] **Diego Lamarque:** En los servidores del proveedor. Y, según el contrato del proveedor con la empresa del modelo, posiblemente también pasa por los servidores de esa empresa, fuera del país. Eso lo averigüé después de firmar.

[00:30:05] **Martín Albarracín:** ¿El contrato con el proveedor decía algo sobre esto?

[00:30:10] **Diego Lamarque:** Tenía una cláusula genérica de confidencialidad. No decía dónde se almacenan los datos, por cuánto tiempo, ni si se usan para otra cosa. No decía quién es el responsable del tratamiento en los términos de la Ley 25.326.

[00:30:30] **Lucía Ferreyra:** Para quien no está en el tema: la 25.326 es la ley argentina de datos personales. Define un responsable del tratamiento, que es quien decide qué se hace con los datos, y le pone obligaciones. Acá hay tres actores, municipio, proveedor y empresa del modelo, y no estaba escrito quién era qué.

[00:30:58] **Diego Lamarque:** Y hay datos sensibles. Discapacidad, salud, situación económica. La gente los escribe porque el asistente pregunta con naturalidad y se siente como hablar con una persona.

[00:31:15] **Martín Albarracín:** ¿Qué hicieron cuando se dieron cuenta?

[00:31:19] **Diego Lamarque:** Tres cosas. Pusimos un aviso al inicio de la conversación que dice que no se ingresen datos personales. Le pedimos al proveedor que configurara el sistema para no pedir DNI ni número de expediente, y que derivara esos casos a la mesa de entradas. Y empezamos a redactar un anexo al contrato sobre datos, que todavía está en negociación.

[00:31:50] **Lucía Ferreyra:** El aviso, ¿funciona?

[00:31:53] **Diego Lamarque:** Poco. La gente lo acepta sin leer y después escribe el DNI igual. Es como los avisos de cookies.

[00:32:05] **Martín Albarracín:** La otra pregunta de esta sección: cuando el asistente le dio los requisitos derogados a un vecino durante tres semanas, ¿quién responde?

[00:32:17] **Diego Lamarque:** Legalmente, el municipio. El vecino se relaciona con el municipio, no con el proveedor. En la práctica, el vecino no tenía a quién reclamarle porque no había un procedimiento. Iba a la mesa de entradas y la empleada le decía "eso lo dijo el bot".

[00:32:40] **Lucía Ferreyra:** "Lo dijo el bot" como respuesta institucional.

[00:32:45] **Diego Lamarque:** Sí. Y es inaceptable, lo sé. Ahora hay un procedimiento: si una respuesta del asistente generó un perjuicio, se registra como reclamo y lo firma una persona. Pero tardamos cuatro meses en tenerlo.

[00:33:05] **Martín Albarracín:** Hay un documento que linkeamos, de la Open Government Partnership con el Ada Lovelace Institute, sobre rendición de cuentas de sistemas automatizados en el Estado. Lo marcamos como pendiente de verificación porque todavía no confirmamos la URL del PDF completo. Una de sus recomendaciones es exactamente esa: que cada decisión asistida por un sistema tenga una persona responsable identificable.

[00:33:38] **Lucía Ferreyra:** Y la Recomendación de la UNESCO sobre ética de IA, que citamos en el episodio pasado, lo dice como principio: supervisión y determinación humanas. Que no es un principio abstracto: es que haya alguien a quien reclamarle.

[00:33:58] **Diego Lamarque:** Lo que yo aprendí es que la supervisión humana no es un botón. Es una persona con tiempo asignado para leer conversaciones, un procedimiento de reclamo y un circuito para actualizar documentos. Todo eso cuesta plata y no estaba en el presupuesto del proyecto.

[00:34:22] **Martín Albarracín:** O sea que el costo real del sistema es el costo del contrato más el costo de supervisarlo, y el segundo no se contó.

[00:34:31] **Diego Lamarque:** Nunca.

[00:34:35] **Lucía Ferreyra:** Última sección. Diego, un intendente de un municipio parecido te llama mañana y te dice que está por firmar.

## Qué le diría a otro intendente

[00:35:15] **Diego Lamarque:** Primero le diría: antes de firmar nada, medí un mes de consultas. Con una planilla, a mano, en la mesa de entradas, el teléfono y las redes. Qué preguntan, cuántos, cuándo. Sin eso no podés negociar el precio ni saber si el problema es el que creés.

[00:35:40] **Martín Albarracín:** Segundo.

[00:35:42] **Diego Lamarque:** Escribí las fichas de trámites antes de elegir proveedor. Si no tenés las respuestas escritas, ningún sistema las va a inventar bien. Y si las tenés escritas, capaz descubrís que con una buena página web te alcanza.

[00:36:00] **Lucía Ferreyra:** Tercero.

[00:36:02] **Diego Lamarque:** En el contrato: definición de consulta facturable, acceso a todos los registros en datos, tope mensual, dónde se guardan los datos personales y quién es el responsable. Y el prompt del sistema como anexo, para que lo puedas leer y cambiar.

[00:36:22] **Martín Albarracín:** Cuarto.

[00:36:24] **Diego Lamarque:** Presupuestá una persona para supervisar. No medio día de alguien que ya tiene otro trabajo. Una persona.

[00:36:35] **Lucía Ferreyra:** Y si te preguntara si valió la pena.

[00:36:48] **Diego Lamarque:** Le diría que lo que más sirvió no fue el bot. Fue que por primera vez tuvimos que escribir en un documento cómo se hace cada trámite. Eso no lo teníamos. Hoy las empleadas responden igual en todos los canales, los cambios de ordenanza llegan a una ficha, y hay alguien que lee lo que la gente pregunta. Si mañana apagamos el asistente, eso queda.

[00:37:20] **Martín Albarracín:** Es un resultado curioso: el valor estuvo en la preparación, no en el producto.

[00:37:27] **Diego Lamarque:** Y me pregunto si no hubiéramos llegado a la preparación sin la excusa del producto. Probablemente no. Nadie aprueba un proyecto que se llama "escribir fichas de trámites".

[00:37:42] **Lucía Ferreyra:** Lo que cambia y lo que no, en un minuto cada uno.

[00:37:48] **Martín Albarracín:** Lo que cambia: la atención de las consultas simples se puede resolver a cualquier hora y por cualquier canal, y eso libera a las personas para lo difícil. Lo que no cambia: alguien tiene que escribir y mantener las respuestas, alguien tiene que leer lo que el sistema dice, y alguien tiene que responder cuando se equivoca. Si esas tres personas no existen, el sistema no reemplaza a nadie: solo reparte el trabajo de otra manera y lo hace menos visible.

[00:38:25] **Lucía Ferreyra:** Y una pregunta que dejamos abierta: ¿qué pasa cuando el contrato termina? Las fichas quedan. Las conversaciones, los registros, lo aprendido sobre qué pregunta la gente, eso está en servidores del proveedor. Portabilidad de datos en contratos públicos de IA: caso para otro episodio.

## Cierre y fuentes

[00:39:00] **Martín Albarracín:** Fuentes del episodio: la Ley 25.326 en InfoLEG, para la parte de responsables del tratamiento; el Portal Nacional de Datos Abiertos, que mencionamos como lugar donde publicar el inventario de trámites y las métricas del asistente; el informe de la Open Government Partnership sobre rendición de cuentas algorítmica, pendiente de verificación de URL; y la Recomendación de la UNESCO.

[00:39:30] **Lucía Ferreyra:** Cómo usamos IA en este episodio: la transcripción es automática y la revisó Martín. El borrador del resumen y los capítulos lo generó un modelo y lo corregimos. Las cifras del caso las aportó Diego y las contrastamos con lo que pudimos: no son auditadas, y lo decimos. Las fuentes y las conclusiones son nuestras.

[00:39:58] **Martín Albarracín:** Y una corrección ya publicada: en la primera versión del resumen decíamos "pago mensual" y es "pago por consulta con mínimo mensual". Está en la página con la fecha.

[00:40:12] **Lucía Ferreyra:** Diego, gracias por la franqueza.

[00:40:16] **Diego Lamarque:** Gracias a ustedes. Si algún funcionario quiere los modelos de ficha de trámite que armamos, que escriba. Son públicos.

[00:40:28] **Martín Albarracín:** Lo linkeamos cuando los tengamos. Esto fue Señal Pública.

[00:40:35] **Lucía Ferreyra:** Hasta la próxima.
