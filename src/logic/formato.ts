import type { Canal } from './tipos';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function formatearFecha(iso: string | null): string {
  if (!iso) return 'sin fecha';
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} ${MESES[m - 1]} ${a}`;
}

export function hrefCanal(c: Canal): string | null {
  switch (c.tipo) {
    case 'llamada':
      return `tel:${c.valor}`;
    case 'whatsapp':
      return `https://wa.me/${c.valor}`;
    case 'web':
      return c.valor || null;
    default:
      return null;
  }
}
