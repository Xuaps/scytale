export interface Documents {
    add(id: string, buffer: Buffer) : Promise<Document>

    exists(id: string) : Promise<boolean>
}

export class Document {
    constructor(private id: string){}

    public toString(): string{
        return this.id
    }
}
