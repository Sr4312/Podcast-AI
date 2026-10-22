/** Utilidades de tiempo compartidas por el sitio, el reproductor y los scripts. */

export const RE_HMS = /^(\d{2}):([0-5]\d):([0-5]\d)$/;

/** "00:12:34" → 754 */
export function aSegundos(hms: string): number {
  const m = RE_HMS.exec(hms.trim());
  if (!m) throw new Error(`Tiempo inválido: "${hms}" (esperado hh:mm:ss)`);
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

/** 754 → "12:34"; 3754 → "1:02:34". Para UI. */
export function formatoCorto(segundos: number): string {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  return `${h > 0 ? h + ':' : ''}${mm}:${String(r).padStart(2, '0')}`;
}

/** 754 → "00:12:34". Para datos (VTT, JSON Chapters, frontmatter). */
export function formatoHMS(segundos: number): string {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return [h, m, r].map((n) => String(n).padStart(2, '0')).join(':');
}

/** 3130 → "52 min"; 754 → "13 min"; 45 → "1 min". Para listados. */
export function duracionLegible(segundos: number): string {
  const min = Math.max(1, Math.round(segundos / 60));
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** 754 → "12 minutos 34 segundos". Para aria-valuetext. */
export function duracionAccesible(segundos: number): string {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  const partes: string[] = [];
  if (h) partes.push(`${h} ${h === 1 ? 'hora' : 'horas'}`);
  if (m) partes.push(`${m} ${m === 1 ? 'minuto' : 'minutos'}`);
  if (r || partes.length === 0) partes.push(`${r} ${r === 1 ? 'segundo' : 'segundos'}`);
  return partes.join(' ');
}

/** 3130 → "PT52M10S" (ISO 8601, para JSON-LD). */
export function duracionISO(segundos: number): string {
  const s = Math.max(0, Math.floor(segundos));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${r || (!h && !m) ? r + 'S' : ''}`;
}
