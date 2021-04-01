import config from 'config'
import sinon from 'sinon'
import faker from 'faker'
import { BlobStorage } from '../../src/infrastructure/blob-storage-repo'
import { BlobServiceClient, BlockBlobClient, ContainerClient } from '@azure/storage-blob'
import { AddDocument } from '../../src/file-management/usecases'
import { Document } from '../../src/file-management/model'
import { newFile } from '../../mocks/object-mothers/file'
import { newClient } from '../../mocks/object-mothers/blob-storage-client'

class URIManager {
    public generateFrom(doc: Document) {
        return ""
    }
}

describe('As a user I want to add a document to allow others download it later', () => {
    describe('Given a document when a user upload the document', () => {
        it('should add the document to the storage', async () => {
            const { docId, buffer } = newFile();
            const { client, blobClient } = newClient();
            
            const documents = new BlobStorage(
                client,
                config.get('Documents.ContainerName')
            )
            const uriManager = new URIManager()

            await new AddDocument(documents, uriManager).execute(docId, buffer)
            
            //TODO
            expect(blobClient.upload.calledOnce).toBe(true)
        })

        it('should return a link to the document', async () => {
        })
    })
    
    describe('Given a document that has been uploaded previously when a user upload the document', () => {
        it('should add the document to the storage', () => {
        })

        it('should return a link to the document', () => {

        })
    })
})