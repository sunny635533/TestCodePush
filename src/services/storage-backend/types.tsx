export interface KeyValueBackendService {
  getItem(key: string): Promise<string>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string, value: string): Promise<void>;
}
