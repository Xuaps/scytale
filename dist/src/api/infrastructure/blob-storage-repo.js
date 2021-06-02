"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobStorage = exports.createBlobServiceClient = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const file_management_1 = require("../domain/file-management");
function createBlobServiceClient(account, accountKey) {
    const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
    return new storage_blob_1.BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);
}
exports.createBlobServiceClient = createBlobServiceClient;
class BlobStorage {
    constructor(client, containerName) {
        this.containerClient = client.getContainerClient(containerName);
    }
    async streamToBuffer(readableStream) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            readableStream.on("data", (data) => {
                chunks.push(data);
            });
            readableStream.on("end", () => {
                resolve(Buffer.concat(chunks));
            });
            readableStream.on("error", reject);
        });
    }
    async add(id, content) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);
        await blockBlobClient.upload(content, Buffer.byteLength(content));
        return new file_management_1.Document(id, content);
    }
    async getById(id) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);
        const content = await this.streamToBuffer((await blockBlobClient.download(0)).readableStreamBody);
        return new file_management_1.Document(id, content);
    }
    exists(id) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);
        return blockBlobClient.exists();
    }
}
exports.BlobStorage = BlobStorage;
//# sourceMappingURL=blob-storage-repo.js.map