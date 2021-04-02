import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel,
    ContainerClient
  } from "@azure/storage-blob";
import { Document, Documents } from '../file-management/model'

export function createBlobServiceClient(account: string, accountKey: string): BlobServiceClient {
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    return new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
    );

}
export class BlobStorage implements Documents {
    private containerClient: ContainerClient

    constructor(client: BlobServiceClient, containerName: string) {
        this.containerClient = client.getContainerClient(containerName);
    }

    async add(id: string, content: Buffer): Promise<Document> {
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);
        await blockBlobClient.upload(content, Buffer.byteLength(content));
        
        return new Document(id)
    }

    exists(id: string){
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);

        return blockBlobClient.exists()
    }
}