import { Documents, genRandomString } from "./model";

export class AddDocument {
  constructor(private documents: Documents, private fileNameLength: number) {}

  public async execute(buffer: Buffer) {
    return (
      await this.documents.add(genRandomString(this.fileNameLength), buffer)
    ).toString();
  }
}

export class GetDocument {
  constructor(private documents: Documents) {}

  public async execute(docId: string) {
    return (await this.documents.getById(docId)).toBuffer();
  }
}
