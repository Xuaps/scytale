"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDocument = void 0;
class GetDocument {
    constructor(documents) {
        this.documents = documents;
    }
    async execute(docId) {
        return (await this.documents.getById(docId)).toBuffer();
    }
}
exports.GetDocument = GetDocument;
//# sourceMappingURL=get-document.js.map