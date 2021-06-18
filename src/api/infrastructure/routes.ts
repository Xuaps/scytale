import { Router } from "express";
import multer from "multer";
import config from "config";
import { GetDocument, AddDocument } from "../application";
import { BlobStorage, createBlobServiceClient } from "./blob-storage-repo";
import rateLimit from "express-rate-limit";

let appInsights = require("applicationinsights");
let client = new appInsights.TelemetryClient();
const router = Router();

const connection = createBlobServiceClient(
  config.get("Azure.Storage.AccountName"),
  config.get("Azure.Storage.AccountKey")
);
const blobStorage = new BlobStorage(
  connection,
  config.get("Documents.ContainerName")
);

const OneRequestsPerMinuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2 // limit each IP to 2 requests per windowMs
});
const TenRequestsPerDayLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 10 // limit each IP to 10 requests per windowMs
});
const TenRequestsPerMinuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  keyGenerator: req => req.params.slug
});
const OneHundredRequestsPerDayLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 1 day
  max: 100,
  keyGenerator: req => req.params.slug
});

router.get("/documents/:slug", TenRequestsPerMinuteLimiter, OneHundredRequestsPerDayLimiter, async (req, res) => {
  const doc = await new GetDocument(blobStorage).execute(req.params.slug);
  client.trackTrace({message: `file downloaded ${req.params.slug}` });

  res.send(doc);
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5242880, files: 1	} });
router.post("/documents/", OneRequestsPerMinuteLimiter, TenRequestsPerDayLimiter, upload.single("document"), async (req, res) => {
  const id = await new AddDocument(blobStorage, 64).execute(req.file.buffer);
  client.trackTrace({message: `file uploaded ${id}` });

  res.send({ id });
});

export default router;
