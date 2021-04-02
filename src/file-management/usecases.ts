import { Documents, genRandomString } from "./model"

export class AddDocument {
    constructor(private documents: Documents, private fileNameLength: number){}

    public async execute(buffer: Buffer) {
        return (await this.documents.add(genRandomString(this.fileNameLength), buffer)).toString()
    }
}

