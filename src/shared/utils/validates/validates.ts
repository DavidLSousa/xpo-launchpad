type PhoneLocaleConfig = {
  countryCode: string;
  minDigits: number;
  maxDigits: number;
  format: (digits: string) => string;
};

const PHONE_LOCALE_MAP: Record<string, PhoneLocaleConfig> = {
  'pt-BR': {
    countryCode: '55',
    minDigits: 10,
    maxDigits: 11,
    format: (d: string) => {
      if (d.length <= 2) return `(${d}`;
      if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    },
  },
};

export const validate = {
  phoneInternational: (
    value: string,
    locale = 'pt-BR',
  ): { formatted: string; isValid: boolean } => {
    const config = PHONE_LOCALE_MAP[locale] ?? PHONE_LOCALE_MAP['pt-BR'];
    const digits = value.replace(/\D/g, '').slice(0, config.maxDigits);
    const isValid = digits.length >= config.minDigits && digits.length <= config.maxDigits;
    return { formatted: config.format(digits), isValid };
  },
  cep: (
    cep: string,
  ): {
    formatted: string;
    isValid: boolean;
  } => {
    if (!cep)
      return {
        formatted: '',
        isValid: false,
      };
    let digits = cep.replace(/\D/g, '');
    const isValid = digits.length === 8;

    if (digits.length > 8) digits = digits.slice(0, 8);

    let formatted = digits;
    if (digits.length > 5) {
      formatted = digits.replace(/(\d{5})(\d+)/, '$1-$2');
    }

    return {
      formatted,
      isValid,
    };
  },

  phone: (phone: string) => {
    if (!phone) return '';

    let digits = phone.replace(/\D/g, '');

    // Garante prefixo 55
    if (!digits.startsWith('55')) {
      digits = '55' + digits;
    }

    // Limita ao +55 + 11 dígitos (13 total)
    digits = digits.slice(0, 13);

    // Começa formatando com +55
    let formatted = `+${digits}`;

    if (digits.length > 4) {
      formatted = `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4)}`;
    }
    if (digits.length > 9) {
      formatted = `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
    }

    return formatted;
  },

  email: (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = email.trim().length >= 10;
    if (isValid) isValid = emailRegex.test(email);

    return isValid;
  },

  cpf: (
    value: string,
  ): {
    formatted: string;
    isValid: boolean;
  } => {
    if (!value)
      return {
        formatted: '',
        isValid: false,
      };

    let digits = value.replace(/\D/g, '');

    // Limita a 11 dígitos
    if (digits.length > 11) digits = digits.slice(0, 11);

    // Valida CPF somente se tiver 11 dígitos
    const isValid = digits.length === 11 ? validateCpf(digits) : false;

    // Formatação progressiva
    let formatted = digits;
    if (digits.length > 3 && digits.length <= 6) {
      formatted = digits.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (digits.length > 6 && digits.length <= 9) {
      formatted = digits.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (digits.length > 9) {
      formatted = digits.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    return {
      formatted,
      isValid,
    };
  },

  cnpj: (
    value: string,
  ): {
    formatted: string;
    isValid: boolean;
  } => {
    if (!value)
      return {
        formatted: '',
        isValid: false,
      };

    let digits = value.replace(/\D/g, '');

    if (digits.length > 14) digits = digits.slice(0, 14);

    const isValid = digits.length === 14 ? validateCnpj(digits) : false;

    let formatted = digits;
    if (digits.length > 2 && digits.length <= 5) {
      formatted = digits.replace(/(\d{2})(\d+)/, '$1.$2');
    } else if (digits.length > 5 && digits.length <= 8) {
      formatted = digits.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (digits.length > 8 && digits.length <= 12) {
      formatted = digits.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    } else if (digits.length > 12) {
      formatted = digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
    }

    return {
      formatted,
      isValid,
    };
  },
};

export const getInfoAddressByCep = async (zipCode: string) => {
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${zipCode.replace(/\D/g, '')}`);

    if (res.ok) {
      const dataRes = await res.json();
      return {
        city: dataRes.city,
        neighborhood: dataRes.neighborhood,
        street: dataRes.street,
        uf: dataRes.state,
      };
    }
  } catch {
    // Silently ignore or log internally
  }

  return {
    city: '',
    neighborhood: '',
    street: '',
    uf: '',
  };
};

export const validateCpf = (cpf: string) => {
  const cpfLimpo = String(cpf).replace(/\D/g, '');

  if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
    return false;
  }

  const calcularDigito = (slice: number) => {
    const digitos = cpfLimpo.slice(0, slice).split('').map(Number);
    const soma = digitos.reduce((acc, digito, index) => acc + digito * (slice + 1 - index), 0);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return (
    calcularDigito(9) === parseInt(cpfLimpo[9]) && calcularDigito(10) === parseInt(cpfLimpo[10])
  );
};

export const validateCnpj = (cnpj: string) => {
  const cnpjLimpo = String(cnpj).replace(/\D/g, '');

  if (cnpjLimpo.length !== 14 || /^(\d)\1+$/.test(cnpjLimpo)) {
    return false;
  }

  const calcularDigito = (slice: number) => {
    const digitos = cnpjLimpo.slice(0, slice).split('').map(Number);
    let soma = 0;
    let peso = slice === 12 ? 5 : 6;

    for (let i = 0; i < digitos.length; i++) {
      soma += digitos[i] * peso;
      peso--;
      if (peso < 2) {
        peso = 9;
      }
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return (
    calcularDigito(12) === parseInt(cnpjLimpo[12]) && calcularDigito(13) === parseInt(cnpjLimpo[13])
  );
};
