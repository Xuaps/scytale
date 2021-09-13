import config from "config";
import { newFile, newReadableStream } from "../../__mocks__/object-mothers/file";
import { newClient } from "../../__mocks__/object-mothers/blob-storage-client";
import { DeleteDocument } from "../../application";
import { BlobStorage } from "../../infrastructure/blob-storage-repo";

const fakeDoc = newFile();
const fakeReadableStream = newReadableStream(fakeDoc.buffer);
const fakeStorageClient = newClient();

describe("As a user I want to delete a document", () => {
  let documentsRepo: BlobStorage;

  beforeEach(() => {
    documentsRepo = new BlobStorage(
      fakeStorageClient.client,
      config.get("Documents.ContainerName")
    );
  });

  describe("Given a document id", () => {
    it("should delete the document", async () => {
      await new DeleteDocument(documentsRepo).execute(fakeDoc.docId);
      expect(fakeStorageClient.deleteBlob).toHaveBeenCalledWith(fakeDoc.docId);
    });
  });
});

