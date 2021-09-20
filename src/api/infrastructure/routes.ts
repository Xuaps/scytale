import { Router } from "express";
import fetch from 'node-fetch';
import multer from "multer";
import config from "config";
import { GetDocument, AddDocument, DeleteDocument } from "../application";
import { BlobStorage, createBlobServiceClient } from "./blob-storage-repo";
import rateLimit from "express-rate-limit";
import { timestamp } from "rxjs";

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

  client.trackEvent({name: "file-requested", properties: {id:req.params.slug, ip: req.ip}});

  res.send(doc);
});

router.delete("/documents/:slug", TenRequestsPerMinuteLimiter, OneHundredRequestsPerDayLimiter, async (req, res) => {
  const result = await new DeleteDocument(blobStorage).execute(req.params.slug);
  if(result instanceof Error) return res.status(404).end()

  client.trackEvent({name: "file-deleted", properties: {id:req.params.slug, ip: req.ip}});

  res.status(204).end();
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5242880, files: 1	} });
router.post("/documents/", OneRequestsPerMinuteLimiter, TenRequestsPerDayLimiter, upload.single("document"), async (req, res) => {
  const id = await new AddDocument(blobStorage).execute(req.file.buffer, req.file.originalname);

  res.send({ id });
});

router.get("/stats/:id", TenRequestsPerDayLimiter, OneHundredRequestsPerDayLimiter, async (req, res) => {
    const events = await fetch(`https://api.applicationinsights.io/v1/apps/${config.get("Azure.ApplicationInsightAppID")}/events/customEvents?timespan=P3Y6M4DT12H30M5S&$search=${req.params.id}`, {
      headers: {
        'x-api-key': config.get("Azure.ApplicationInsightAPIKey")
      }
    }).then(response => response.json()).then(data => data.value.map((v: { client: any; timestamp: any; }) => ({...v.client, timestamp: v.timestamp}) ))
      .catch(err => console.log(err))
  return res.json(events)
})

export default router;
