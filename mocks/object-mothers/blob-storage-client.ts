import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from "@azure/storage-blob";
import faker from "faker";

export function newClient() {
  const blobClient = ({
    upload: jest.fn(),
    download: jest.fn(),
    exists: jest.fn(),
  } as unknown) as BlockBlobClient;
  const client = ({
    getContainerClient: () =>
      (({
        getBlockBlobClient: () => blobClient,
      } as unknown) as ContainerClient),
  } as unknown) as BlobServiceClient;

  return { client, blobClient };
}
