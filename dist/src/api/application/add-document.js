"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDocument = void 0;
const core_1 = require("../domain/core");
class AddDocument {
    constructor(documents, fileNameLength) {
        this.documents = documents;
        this.fileNameLength = fileNameLength;
    }
    async execute(buffer) {
        return (await this.documents.add(core_1.Random.genRandomString(this.fileNameLength), buffer)).toString();
    }
}
exports.AddDocument = AddDocument;
//# sourceMappingURL=add-document.js.map