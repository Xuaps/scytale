import { Documents } from "./model"
import crypto from 'crypto'

export class AddDocument {
    constructor(private documents: Documents){}

    private getUniqueFileName(fileName: string) {
        return fileName + new Date().getTime()
    }

    private createHash(fileName: string){
        return crypto.createHash('sha1').update(fileName).digest('base64')
    }

    public async execute(fileName: string, buffer: Buffer) {
        return (await this.documents.add(this.createHash(this.getUniqueFileName(fileName)), buffer)).toString()
    }
}

