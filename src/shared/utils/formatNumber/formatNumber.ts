type CurrencyFormat = {
  value: number;
  currency?: string;
};

export function formatAmount({ value, currency = 'pt' }: CurrencyFormat) {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'R$ 0,00';
  }

  const config = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const formated = {
    pt: `R$ ${value.toLocaleString('pt-BR', config)}`,
    en: `$ ${value.toLocaleString('en-US', config)}`,
    es: `R$ ${value.toLocaleString('es-ES', config)}`,
  }[currency];

  return formated;
}

export const Amount = {
  format: (value: string) => {
    let numericValue = value.replace(/\D/g, '');
    if (!numericValue) return '';
    let amountNumber = parseInt(numericValue, 10);
    let formatted = (amountNumber / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatted;
  },

  parse: (formatted: string) => {
    if (!formatted) return 0;
    return parseFloat(formatted.replace(/\./g, '').replace(',', '.'));
  },
};
