import crypto from 'crypto'
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

export function genRandomString(length: number){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);
};