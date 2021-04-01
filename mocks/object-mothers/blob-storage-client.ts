import { BlobServiceClient, BlockBlobClient, ContainerClient } from "@azure/storage-blob"
import sinon from "sinon"

export function newClient() {
    const blobClient = sinon.createStubInstance(BlockBlobClient, {
        upload: sinon.stub(),
        exists: sinon.stub()
    })
    const client = sinon.createStubInstance(BlobServiceClient, {
        getContainerClient: sinon.stub<[containerName: string]>().returns(sinon.createStubInstance(ContainerClient, {
            getBlockBlobClient: sinon.stub<[blobName: string]>().returns(blobClient)
        }))
    })

    return { client: (client as unknown) as BlobServiceClient, blobClient }
}