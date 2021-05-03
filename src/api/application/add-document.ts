import { Documents } from "../domain/file-management";
import { Random } from "../domain/core";

export class AddDocument {
  constructor(private documents: Documents, private fileNameLength: number) {}

  public async execute(buffer: Buffer) {
    return (
      await this.documents.add(Random.genRandomString(this.fileNameLength), buffer)
    ).toString();
  }
}
