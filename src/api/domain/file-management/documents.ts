import { Document } from './document'

export interface Documents {
  add(id: string, buffer: Buffer): Promise<Document>;
  getById(id: string): Promise<Document>;
  exists(id: string): Promise<boolean>;
}
