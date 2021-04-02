import config from 'config'
import faker from 'faker'
import { BlobStorage } from '../../src/infrastructure/blob-storage-repo'
import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob'
import { AddDocument } from '../../src/file-management/usecases'
import { Document } from '../../src/file-management/model'
import { newFile } from '../../mocks/object-mothers/file'
import { newClient } from '../../mocks/object-mothers/blob-storage-client'

let fakeFile: { docId: string, buffer: Buffer }
let fakeStorageClient: { client: BlobServiceClient, blobClient: BlockBlobClient }
let documentsRepo: BlobStorage

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
            await new AddDocument(documentsRepo).execute(fakeFile.docId, fakeFile.buffer)
            
            //TODO
            expect(fakeStorageClient.blobClient.upload).toHaveBeenCalled();
        })

        it.skip('should return a unique identifier to the file', async () => {
            const { docId, buffer } = newFile();
            const { client, blobClient } = newClient();
             
            const documents = new BlobStorage(
                client,
                config.get('Documents.ContainerName')
            )

            const id = await new AddDocument(documents).execute(docId, buffer)
            
            //TODO
            expect(id.length).toBe(40)
        })
    })
    
    describe('Given a document that has been uploaded previously when a user upload the document', () => {
        it('should add the document to the storage', () => {
        })

        it('should return a link to the document', () => {

        })
    })
})