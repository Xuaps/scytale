import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobDownloadResponseModel,
  ContainerClient,
} from "@azure/storage-blob";
import { Document, Documents } from "../file-management/model";

export function createBlobServiceClient(
  account: string,
  accountKey: string
): BlobServiceClient {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  );
  return new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );
}
export class BlobStorage implements Documents {
  private containerClient: ContainerClient;

  constructor(client: BlobServiceClient, containerName: string) {
    this.containerClient = client.getContainerClient(containerName);
  }

  private async streamToBuffer(
    readableStream: NodeJS.ReadableStream
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readableStream.on("data", (data: Buffer | string) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }

  async add(id: string, content: Buffer): Promise<Document> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);
    await blockBlobClient.upload(content, Buffer.byteLength(content));

    return new Document(id, content);
  }

  async get(id: string): Promise<Document> {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);
    const content = await this.streamToBuffer(
      (await blockBlobClient.download(0)).readableStreamBody!
    );

    return new Document(id, content);
  }

  exists(id: string) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(id);

    return blockBlobClient.exists();
  }
}
