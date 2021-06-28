import { Documents } from "../domain/file-management";

export class AddDocument {
  constructor(private documents: Documents) {}

  public async execute(buffer: Buffer, metaId: string) {
    return (
      await this.documents.add(metaId, buffer)
    ).toString();
  }
}
