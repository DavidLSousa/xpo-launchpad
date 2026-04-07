import { Amount, formatAmount } from './formatNumber';

describe('formatNumber - Unit Tests (Fase 1)', () => {
  describe('formatAmount()', () => {
    it('deve arredondar numérico para Real brasileiro (pt) por default', () => {
      const result = formatAmount({ value: 1540.5 });
      // O replace elimina espaços rígidos que o toLocaleString pode inserir (NBSP)
      expect(result?.replace(/\s/g, ' ')).toBe('R$ 1.540,50');
    });

    it("deve formatar valores em dollar se a currency for 'en'", () => {
      const result = formatAmount({ value: 1540.5, currency: 'en' });
      expect(result?.replace(/\s/g, ' ')).toBe('$ 1,540.50');
    });

    it("deve formatar valores em espanhol se a currency for 'es'", () => {
      const result = formatAmount({ value: 1540.5, currency: 'es' });
      // Nota: No ambiente Node/Jest, o es-ES pode não incluir o separador de milhar para 4 dígitos
      expect(result?.replace(/\s/g, ' ')).toBe('R$ 1540,50');
    });

    it('deve formatar o valor zero corretamente', () => {
      const result = formatAmount({ value: 0 });
      expect(result?.replace(/\s/g, ' ')).toBe('R$ 0,00');
    });

    it('deve formatar valores negativos', () => {
      const result = formatAmount({ value: -1540.5 });
      expect(result?.replace(/\s/g, ' ')).toBe('R$ -1.540,50');
    });

    it('deve retornar R$ 0,00 caso valor recebido for nulo ou inválido', () => {
      const result = formatAmount({ value: NaN });
      expect(result).toBe('R$ 0,00');
    });
  });

  describe('Amount helper', () => {
    it("deve transformar string crua '1000' em '10,00' formatados via format()", () => {
      const result = Amount.format('1000');
      expect(result).toBe('10,00');
    });

    it('deve lidar com strings vazias em format()', () => {
      const result = Amount.format('');
      expect(result).toBe('');
    });

    it('deve ignorar caracteres não numéricos em format()', () => {
      const result = Amount.format('abc1000def');
      expect(result).toBe('10,00');
    });

    it("deve converter string formatada '10,00' novamente em number 10 via parse()", () => {
      const result = Amount.parse('10,00');
      expect(result).toBe(10);
    });

    it('deve converter valores com pontos de milhar via parse()', () => {
      const result = Amount.parse('1.540,50');
      expect(result).toBe(1540.5);
    });
  });
});
