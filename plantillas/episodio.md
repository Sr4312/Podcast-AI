---
numero: {{numero}}
temporada: {{temporada}}
titulo: "{{titulo}}"
bajada: "TODO: una o dos oraciones que digan qué problema público se analiza y qué se encontró (20 a 220 caracteres)."
fecha: {{fecha}}
duracion: "00:00:00"
formato: caso                 # laboratorio | caso | investigacion | debate | entrevista | especial
ejes: [politica-publica]      # politica-publica | sociedad | economia
temas: []                     # slugs de src/content/temas
invitados: []                 # slugs de src/content/invitados
destacado: false
audio:
  url: ""                     # MP3 servido por el hosting
  bytes: 0
youtube: ""
plataformas:
  youtube: ""
  spotify: ""
  apple: ""
# resumen:                    # lo completa el skill nuevo-episodio o vos
#   puntos:
#     - ""
#   contexto: ""
# frase:
#   texto: ""
#   autor: ""
#   t: "00:00:00"
capitulos: []                 # [{ t: "00:00:00", titulo: "Presentación" }, …]
fuentes: []                   # cada una con titulo, url, tipo, organismo, fecha, verificada, nota
# ia:
#   usada_para: ["transcripción automática del audio", "borrador del resumen y de los capítulos"]
#   no_usada_para: ["selección de fuentes", "verificación de citas", "conclusiones del episodio"]
#   revisado_por: ""
seguimiento: []
correcciones: []
estado: borrador
ejemplo: false
---

<!-- La transcripción se pega acá con: npm run importar-transcripcion -- archivo.vtt {{slug}} -->
