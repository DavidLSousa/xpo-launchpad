type CurrencyFormat = {
  value: number;
  currency?: 'BRL' | 'USD';
};

export function formatPercent({ value, currency = 'BRL' }: CurrencyFormat): string {
  if (!value) return '-';

  const formats = {
    BRL: `${value.toFixed(2).replace('.', ',')}%`,
    USD: `${value.toFixed(2)}%`,
  };

  return formats[currency];
}
