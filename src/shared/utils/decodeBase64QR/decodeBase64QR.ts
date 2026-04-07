import { Buffer } from 'buffer';
import jsQR from 'jsqr';
import { PNG } from 'pngjs/browser';

export async function decodeBase64QR(base64QR: string): Promise<string | null> {
  try {
    // Remove o prefixo da URI de dados para obter apenas os dados base64.
    const base64Data = base64QR.replace(/^data:image\/png;base64,/, '');

    // Converte a string base64 para um buffer de imagem PNG.
    const pngBuffer = Buffer.from(base64Data, 'base64');

    // Decodifica o buffer PNG para extrair dados brutos de pixels, largura e altura.
    const rawImageData = await new Promise<{
      data: Buffer;
      width: number;
      height: number;
    }>((resolve, reject) => {
      new PNG().parse(pngBuffer, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });

    if (!rawImageData) {
      throw new Error('Não foi possível analisar os dados da imagem PNG.');
    }

    // Usa jsQR para escanear os dados brutos de pixels.
    const code = jsQR(
      new Uint8ClampedArray(rawImageData.data),
      rawImageData.width,
      rawImageData.height,
    );

    // Retorna os dados decodificados do QR Code, se houver.
    if (code) {
      return code.data;
    }

    return null;
  } catch (error) {
    console.error('Falha ao decodificar QR code:', error);
    return null;
  }
}
