import { validate, getInfoAddressByCep } from './validates';

describe('validates - Unit Tests (Fase 1)', () => {
  describe('email()', () => {
    it('deve validar um e-mail correto', () => {
      expect(validate.email('test@example.com')).toBe(true);
    });

    it('deve invalidar e-mail mal formatado', () => {
      expect(validate.email('test@example')).toBe(false);
      expect(validate.email('test.com')).toBe(false);
    });

    it('deve considerar e-mails menores que 10 caracteres como inválidos', () => {
      // De acordo com a lógica: email.trim().length >= 10
      expect(validate.email('a@b.co')).toBe(false);
    });
  });

  describe('cep()', () => {
    it('deve formatar CEP corretamente e retornar válido', () => {
      const { formatted, isValid } = validate.cep('12345678');
      expect(formatted).toBe('12345-678');
      expect(isValid).toBe(true);
    });

    it('deve lidar com caracteres não numéricos e formatar progressivamente', () => {
      const { formatted, isValid } = validate.cep('12345-6');
      expect(formatted).toBe('12345-6');
      expect(isValid).toBe(false);
    });

    it('deve truncar CEPs com mais de 8 dígitos', () => {
      const { formatted } = validate.cep('1234567890');
      expect(formatted).toBe('12345-678');
    });
  });

  describe('cpf()', () => {
    it('deve validar e formatar um CPF válido', () => {
      // CPF gerado para teste (válido: 123.456.789-09)
      const validCpf = '12345678909';
      const { formatted, isValid } = validate.cpf(validCpf);
      expect(formatted).toBe('123.456.789-09');
      expect(isValid).toBe(true);
    });

    it('deve invalidar CPF com todos os dígitos iguais', () => {
      const invalidCpf = '11111111111';
      const { isValid } = validate.cpf(invalidCpf);
      expect(isValid).toBe(false);
    });

    it('deve invalidar CPF curto', () => {
      const shortCpf = '123.456';
      const { isValid } = validate.cpf(shortCpf);
      expect(isValid).toBe(false);
    });
  });

  describe('cnpj()', () => {
    it('deve validar e formatar um CNPJ válido', () => {
      const validCnpj = '11.222.333/0001-81'; // Exemplo comum
      const { formatted, isValid } = validate.cnpj(validCnpj);
      expect(formatted).toBe('11.222.333/0001-81');
      expect(isValid).toBe(true);
    });

    it('deve invalidar CNPJ incorreto', () => {
      const { isValid } = validate.cnpj('12.345.678/0001-00');
      expect(isValid).toBe(false);
    });
  });

  describe('phone() e phoneInternational()', () => {
    it('deve formatar telefone nacional com prefixo 55', () => {
      const result = validate.phone('11988887777');
      expect(result).toBe('+55 (11) 98888-7777');
    });

    it('deve formatar telefone internacional (pt-BR)', () => {
      const { formatted, isValid } = validate.phoneInternational('11988887777');
      expect(formatted).toBe('(11) 98888-7777');
      expect(isValid).toBe(true);
    });
  });

  describe('getInfoAddressByCep()', () => {
    it('deve retornar informações de endereço para um CEP válido', async () => {
      const mockResponse = {
        city: 'São Paulo',
        neighborhood: 'Sé',
        street: 'Praça da Sé',
        state: 'SP',
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const address = await getInfoAddressByCep('01001-000');
      expect(address.city).toBe('São Paulo');
      expect(address.uf).toBe('SP');
    });

    it('deve retornar campos vazios em caso de erro na API (404/500)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const address = await getInfoAddressByCep('00000-000');
      expect(address.city).toBe('');
    });

    it('deve retornar campos vazios em caso de exceção de rede', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network fail'));

      const address = await getInfoAddressByCep('00000-000');
      expect(address.city).toBe('');
    });
  });
});
