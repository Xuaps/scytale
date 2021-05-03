export class Document {
  constructor(private id: string, private content: Buffer) {}

  public toString(): string {
    return this.id;
  }

  public toBuffer(): Buffer {
    return this.content;
  }
}
