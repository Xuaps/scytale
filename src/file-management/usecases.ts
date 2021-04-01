import { Documents } from "./model"

export class AddDocument {
    constructor(private documents: Documents, private uriManager: any){}

    public async execute(id: string, buffer: Buffer) {
        const docData = await this.documents.add(id, buffer)

        return this.uriManager.generateFrom(docData)
    }
}

