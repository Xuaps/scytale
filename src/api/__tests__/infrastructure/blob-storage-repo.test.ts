import fs from "fs";
import config from "config";
import { promisify } from "util";
import {
  BlobStorage,
  createBlobServiceClient,
} from "../../infrastructure/blob-storage-repo";

const docId = "src/api/__mocks__/assets/test.txt";
const connection = createBlobServiceClient(
  config.get("Azure.Storage.AccountName"),
  config.get("Azure.Storage.AccountKey")
);
const blobStorage = new BlobStorage(
  connection,
  config.get("Documents.ContainerName")
);

describe("BlobStorageRepo", () => {
  let buffer: Buffer;
  beforeEach(async () => {
    buffer = await promisify(fs.readFile)(docId);
  });

  describe("Add a blob", () => {
    it("should add a blob to the storage", async () => {
      const doc = await blobStorage.add(docId, buffer);

      expect(await blobStorage.exists(doc.toString())).toBe(true);
    });
  });

  describe("Get a blob", () => {
    it("should get a blob from the storage", async () => {
      const doc = await blobStorage.getById(docId);

      expect(doc.toBuffer()).toStrictEqual(buffer);
    });
  });

  describe("Delete a blob", () => {
    it("should delete a blob from the storage", async () => {
      const doc = await blobStorage.add(docId, buffer);

      expect(await blobStorage.exists(doc.toString())).toBe(true);

      await blobStorage.delete(docId);

      expect(await blobStorage.exists(doc.toString())).toBe(false);
    });
  });
});
