let MemoryStorage = {
    create: () => ({
        count: 0
    })
}

describe('As a user I want to add a document to allow others download it later', () => {
    describe('Given a document when a user upload the document', () => {
        it('should add the document to the storage', () => {
            let storage = MemoryStorage.create()
            expect(storage.count).toBe(1)
        })
        it('should return a link to the document')
    })
})