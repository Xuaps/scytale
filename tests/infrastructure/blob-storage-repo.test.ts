import fs from 'fs'
import config from 'config'
import { promisify } from 'util'
import { BlobStorage } from '../../src/infrastructure/blob-storage-repo'

const filePath = 'mocks/test.txt' 

describe('Add a blob', () => {
    it('should add a blob to the storage', async () => {
        const buffer = await promisify(fs.readFile)(filePath)        
        const blobStorage = new BlobStorage(config.get('Azure.Storage.AccountName'), config.get('Azure.Storage.AccountKey'), config.get('Documents.ContainerName'))
        
        const doc = await blobStorage.add(filePath, buffer)

        expect(await blobStorage.exists(doc.toString())).toBe(true)
    })
})