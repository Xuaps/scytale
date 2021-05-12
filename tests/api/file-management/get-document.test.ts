import config from "config";
import { newFile, newReadableStream } from "../../../mocks/object-mothers/file";
import { newClient } from "../../../mocks/object-mothers/blob-storage-client";
import { GetDocument } from "../../../src/api/application";
import { BlobStorage } from "../../../src/api/infrastructure/blob-storage-repo";

const fakeDoc = newFile();
const fakeReadableStream = newReadableStream(fakeDoc.buffer);
const fakeStorageClient = newClient();

describe("As a user that have I want to get a file  so I can use it", () => {
  let documentsRepo: BlobStorage;

  beforeEach(() => {
    documentsRepo = new BlobStorage(
      fakeStorageClient.client,
      config.get("Documents.ContainerName")
    );
  });

  describe("Given a document id", () => {
    it("should return the document", async () => {
      // @ts-ignore-next-line
      fakeStorageClient.blobClient.download.mockReturnValue(
        Promise.resolve({
          readableStreamBody: fakeReadableStream,
        })
      );

      const doc = await new GetDocument(documentsRepo).execute(fakeDoc.docId);
      expect(doc).toStrictEqual(fakeDoc.buffer);
    });
  });
});
