import { BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob"
import faker from "faker"

export function newClient() {
    const blobClient = ({
        upload: jest.fn(),
        exists: jest.fn(),
        name: faker.system.fileName()
    } as unknown) as BlockBlobClient
    const client = ({
        getContainerClient: () => ({
            getBlockBlobClient: () => blobClient
        } as unknown) as ContainerClient
    } as unknown) as BlobServiceClient

    return { client, blobClient }
}