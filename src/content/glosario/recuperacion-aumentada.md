---
termino: "Recuperación aumentada"
sinonimos: ["RAG", "generación aumentada por recuperación", "retrieval augmented generation"]
definicion: "Técnica en la que, antes de responder, el sistema busca los documentos relevantes (una ley, un manual, un expediente) y se los pasa al modelo para que responda a partir de ellos y no de memoria."
relacionados: [modelo-de-lenguaje, alucinacion, ventana-de-contexto]
---

Reduce mucho las alucinaciones cuando la fuente es buena y la búsqueda encuentra el documento correcto. No las elimina: el modelo puede ignorar el documento, mezclarlo con lo que recuerda o leerlo mal. Un buen sistema público muestra qué documento usó para cada respuesta.
