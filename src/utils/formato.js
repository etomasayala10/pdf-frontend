// ─── Utilidades de formato ──────────────────────────────────────────────────

// Formatea un número como moneda peruana (PEN).
export const fmtMoneda = (n) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(n)

// Fecha larga en español (ej. "04 de junio de 2026").
export const fmtFechaLarga = (fecha = new Date()) =>
  fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })
