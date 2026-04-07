import { Info } from '../models/Info';

export interface IServiceProvider {
  fetchData(): Promise<Info>;
  processEntity(id: string): Promise<void>;
}
