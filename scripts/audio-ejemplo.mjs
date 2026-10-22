// @ts-check
/**
 * Genera los MP3 de prueba del contenido semilla con ffmpeg (sin descargar nada).
 *
 * En vez de una senoidal plana usamos un tono con envolvente variable y pausas:
 * así la waveform calculada por `npm run peaks` tiene forma de voz y sirve para
 * probar el diseño. Mono a 32 kb/s para que un episodio de 40 min pese ~10 MB.
 *
 * Uso: npm run audio:ejemplo
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SALIDA = path.resolve('public/audio');
fs.mkdirSync(SALIDA, { recursive: true });

/** @type {{slug: string, duracion: number, f: number, a: number, b: number}[]} */
const EPISODIOS = [
  { slug: '001-puede-una-ia-asesorar-a-un-senador', duracion: 38 * 60 + 20, f: 180, a: 0.0, b: 1.1 },
  { slug: '002-el-chatbot-de-un-municipio', duracion: 41 * 60 + 5, f: 160, a: 2.1, b: 0.4 },
  { slug: '003-chatbots-contra-el-boletin-oficial', duracion: 46 * 60 + 30, f: 200, a: 4.2, b: 2.6 },
];

for (const ep of EPISODIOS) {
  const destino = path.join(SALIDA, `${ep.slug}.mp3`);
  if (fs.existsSync(destino) && !process.argv.includes('--forzar')) {
    console.log(`· ${ep.slug}.mp3 ya existe (usá --forzar para regenerar)`);
    continue;
  }
  // Envolvente: respiración lenta × ritmo de frase × vibrato suave × pausas (silencio casi total).
  const expr = [
    `0.6*sin(2*PI*${ep.f}*t)`,
    `(0.55+0.45*sin(2*PI*0.23*t+${ep.a}))`,
    `(0.6+0.4*sin(2*PI*1.7*t+${ep.b}))`,
    `(0.75+0.25*sin(2*PI*5.3*t))`,
    `if(gt(sin(2*PI*0.071*t+${ep.b}),-0.72),1,0.02)`,
    `if(gt(sin(2*PI*0.013*t+${ep.a}),-0.9),1,0.3)`,
  ].join('*');
  console.log(`→ Generando ${ep.slug}.mp3 (${ep.duracion}s)…`);
  execFileSync(
    'ffmpeg',
    [
      '-v', 'error', '-y',
      '-f', 'lavfi',
      '-i', `aevalsrc=exprs='${expr}':s=22050:c=mono:d=${ep.duracion}`,
      '-ac', '1', '-b:a', '32k',
      '-metadata', `title=Contenido de ejemplo: ${ep.slug}`,
      destino,
    ],
    { stdio: 'inherit' },
  );
  const mb = (fs.statSync(destino).size / 1048576).toFixed(1);
  console.log(`  ✓ ${mb} MB`);
}
