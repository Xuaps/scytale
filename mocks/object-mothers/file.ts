import faker from "faker";

export function newFile() {
    return {
        docId: faker.system.fileName(), 
        buffer: Buffer.alloc(8)
    }
}