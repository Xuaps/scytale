import { Router } from "express";
import multer from "multer";
import config from "config";
import { GetDocument, AddDocument } from "../application";
import { BlobStorage, createBlobServiceClient } from "./blob-storage-repo";

const connection = createBlobServiceClient(
  config.get("Azure.Storage.AccountName"),
  config.get("Azure.Storage.AccountKey")
);
const blobStorage = new BlobStorage(
  connection,
  config.get("Documents.ContainerName")
);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get("/documents/:slug", async (req, res) => {
  const doc = await new GetDocument(blobStorage).execute(req.params.slug);

  res.send(doc);
});

router.post("/documents/", upload.single("document"), async (req, res) => {
  const id = await new AddDocument(blobStorage, 64).execute(req.file.buffer);

  res.send({ id });
});

export default router;
