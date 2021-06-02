"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
class Document {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
    toString() {
        return this.id;
    }
    toBuffer() {
        return this.content;
    }
}
exports.Document = Document;
//# sourceMappingURL=document.js.map