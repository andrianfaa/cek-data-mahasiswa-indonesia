export {};

declare global {
  interface ResponseAPI<T = unknown> {
    status: number;
    message: string;
    data?: T;
    data_length?: number;
  }
}
