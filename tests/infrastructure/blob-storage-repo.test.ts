import fs from 'fs'
import config from 'config'
import { promisify } from 'util'
import { BlobStorage, createBlobServiceClient } from '../../src/infrastructure/blob-storage-repo'

const filePath = 'mocks/assets/test.txt' 
const connection = createBlobServiceClient(
    config.get('Azure.Storage.AccountName'), 
    config.get('Azure.Storage.AccountKey')
)
const blobStorage = new BlobStorage(connection, config.get('Documents.ContainerName'))

describe('BlobStorageRepo', () => {
    let buffer: Buffer
    beforeEach(async () => {
        buffer = await promisify(fs.readFile)(filePath)        
    })

    describe('Add a blob', () => {
        it('should add a blob to the storage', async () => {
            const doc = await blobStorage.add(filePath, buffer)

            expect(await blobStorage.exists(doc.toString())).toBe(true)
        })
    })
})