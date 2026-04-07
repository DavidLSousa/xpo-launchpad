import { Info } from "../models/Info";

export interface IServiceProvider {
  buscarDados(): Promise<Info>;
  processar(id: string): Promise<void>;
}
