"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("config"));
const application_1 = require("../application");
const blob_storage_repo_1 = require("./blob-storage-repo");
const connection = blob_storage_repo_1.createBlobServiceClient(config_1.default.get("Azure.Storage.AccountName"), config_1.default.get("Azure.Storage.AccountKey"));
const blobStorage = new blob_storage_repo_1.BlobStorage(connection, config_1.default.get("Documents.ContainerName"));
const storage = multer_1.default.memoryStorage();
const upload = multer_1.default({ storage: storage });
const router = express_1.Router();
router.get("/documents/:slug", async (req, res) => {
    const doc = await new application_1.GetDocument(blobStorage).execute(req.params.slug);
    res.send(doc);
});
router.post("/documents/", upload.single("document"), async (req, res) => {
    const id = await new application_1.AddDocument(blobStorage, 64).execute(req.file.buffer);
    res.send({ id });
});
exports.default = router;
//# sourceMappingURL=routes.js.map