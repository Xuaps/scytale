import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel,
    ContainerClient
  } from "@azure/storage-blob";
import { Document } from '../file-management/model'

export class BlobStorage {
    private containerClient: ContainerClient

    constructor(account: string, accountKey: string, containerName: string) {
        const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
        const blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net`,
            sharedKeyCredential
          );
        this.containerClient = blobServiceClient.getContainerClient(containerName);

    }

    async add(id: string, content: Buffer): Promise<Document> {
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);
        await blockBlobClient.upload(content, Buffer.byteLength(content));

        return new Document(id)
    }

    async exists(id: string){
        const blockBlobClient = this.containerClient.getBlockBlobClient(id);

        return await blockBlobClient.exists()
    }
}