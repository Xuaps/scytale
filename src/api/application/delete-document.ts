import { Documents } from "../domain/file-management";

export class DeleteDocument {
  constructor(private documents: Documents) {}

  public async execute(docId: string) {
    return await this.documents.delete(docId);
  }
}
