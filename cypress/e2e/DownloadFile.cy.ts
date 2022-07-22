import { Scytale } from "./page-objects";

describe("Download file", () => {
  it("should download a file", () => {
    Scytale.load()
      .uploadFile("cypress/fixtures/test.file")
      .downloadFile()
      .checkFileDownloaded();
  });
});
