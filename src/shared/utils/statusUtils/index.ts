export type StatusVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export const getStatusVariant = (status: string): StatusVariant => {
  const s = status.toLowerCase();
  if (['ativo', 'aprovado', 'pago', 'success'].includes(s)) return 'success';
  if (['inativo', 'reprovado', 'cancelado', 'error'].includes(s)) return 'error';
  if (['pendente', 'aguardando', 'warning'].includes(s)) return 'warning';
  if (['info', 'informativo'].includes(s)) return 'info';
  return 'neutral';
};
