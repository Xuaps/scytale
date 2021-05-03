import { Documents } from "../domain/file-management";

export class GetDocument {
  constructor(private documents: Documents) {}

  public async execute(docId: string) {
    return (await this.documents.getById(docId)).toBuffer();
  }
}
