import { Document } from './document'

export interface Documents {
  add(id: string, buffer: Buffer): Promise<Document>;
  getById(id: string): Promise<Document>;
  delete(id: string): Promise<void|Error>;
  exists(id: string): Promise<boolean>;
}
