/** Formata CEP: 00000-000 */
export const formatCep = (value: string): string => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d{1,3})$/, '$1-$2');
};
