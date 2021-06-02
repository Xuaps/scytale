import config from 'config'
import { BlobStorage } from '../../infrastructure/blob-storage-repo'
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob'
import { AddDocument } from '../../application'
import { newFile } from '../../__mocks__/object-mothers/file'
import { newClient } from '../../__mocks__/object-mothers/blob-storage-client'

let fakeFile: { docId: string, buffer: Buffer }
let fakeStorageClient: { client: BlobServiceClient, blobClient: BlockBlobClient }
let documentsRepo: BlobStorage
const fileNameLength: number = 64

describe('As a user I want to add a document to allow others download it later', () => {
    beforeEach(() => {
        fakeFile = newFile();
        fakeStorageClient = newClient();
        
        documentsRepo = new BlobStorage(
            fakeStorageClient.client,
            config.get('Documents.ContainerName')
        )
    })

    describe('Given a document when a user upload the document', () => {
        it('should add the document to the storage', async () => {
            await new AddDocument(documentsRepo, fileNameLength).execute(fakeFile.buffer)
            
            //TODO
            expect(fakeStorageClient.blobClient.upload).toHaveBeenCalled();
        })

        it('should return a unique identifier to the file', async () => {
            const idFirstUpload = await new AddDocument(documentsRepo, fileNameLength).execute(fakeFile.buffer)
            const idSecondUpload = await new AddDocument(documentsRepo, fileNameLength).execute(fakeFile.buffer)
            
            expect(idFirstUpload).not.toBe(idSecondUpload)
        })
    })
})
