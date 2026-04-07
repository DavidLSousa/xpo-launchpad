import { IServiceProvider } from '../domain/interfaces/IServiceProvider';
import { Info } from '../domain/models/Info';
import axios from 'axios';

export class AxiosServiceAdapter implements IServiceProvider {
  async fetchData(): Promise<Info> {
    const response = await axios.get('https://api.example.com/data');
    // Maps API format to DOMAIN format (Info)
    return { id: response.data.uuid, value: response.data.price };
  }

  async processEntity(id: string): Promise<void> {
    // Implementation details...
    console.log(`Processing ${id}`);
  }
}
