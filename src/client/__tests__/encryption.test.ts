import { expect } from "chai";
import { encryptFile, decryptFile } from "../domain/encryption";

const createMockFile = ({
  name = "file.txt",
  size = 1024,
  type = "plain/txt",
  lastModified = new Date(),
}) => {
  return new File(["a".repeat(size)], name, { type });
};

describe("encryption", () => {
  it("encrypt file", async () => {
    const fakeFileName = "test.txt";
    const mockFile = createMockFile({
      name: fakeFileName,
      size: 1024,
      type: "application/pdf",
    });
    const encryptedFile = await encryptFile(mockFile, "test");
    const decryptedFile = await decryptFile(
      new File([encryptedFile], fakeFileName),
      "test"
    );

    expect(await decryptedFile.text()).to.equal(await mockFile.text());
  });
});
