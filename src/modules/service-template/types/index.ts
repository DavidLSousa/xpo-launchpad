export interface ExampleData {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ExampleResponse {
  data: ExampleData;
  token?: string;
}
