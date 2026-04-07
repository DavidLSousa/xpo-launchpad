type DataFormat = {
  dateString: string;
  dateStyle: 'short' | 'medium' | 'long' | 'full';
  timeStyle?: 'medium' | 'short' | 'full' | null;
  currency?: string;
};

export function formatDate({
  dateString,
  dateStyle,
  timeStyle = null,
  currency = 'pt',
}: DataFormat): string {
  if (!dateString) return '-';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const lang = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES',
  }[currency];

  return new Intl.DateTimeFormat(lang, {
    dateStyle,
    ...(timeStyle ? { timeStyle } : {}),
  }).format(date);
}
