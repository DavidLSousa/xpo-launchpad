import { IServiceProvider } from "../domain/interfaces/IServiceProvider";
import { Info } from "../domain/models/Info";
import axios from "axios";

export class AxiosServiceAdapter implements IServiceProvider {
  async buscarDados(): Promise<Info> {
    const response = await axios.get("https://api.example.com/data");
    // Mapeia o formato da API para o SEU formato (Info)
    return { id: response.data.uuid, valor: response.data.price };
  }

  async processar(id: string): Promise<void> {
    // Implementação...
    console.log(`Processando ${id}`);
  }
}
