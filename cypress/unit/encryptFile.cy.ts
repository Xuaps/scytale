import {
  encryptFile,
  decryptFile,
  decryptData,
} from "../../src/core/encryption/encryption";
import { base642Buff } from "../../src/core/encryption/convert";

describe("encrypt file", () => {
  it("should encrypt the file", async () => {
    const testFile: File = new File(["test"], "test.txt");
    const result = await encryptFile(testFile);

    await expectEncriptedTextEqualTo(result, "test");
  });

  it("should generate a random password", async () => {
    const testFile: File = new File(["test"], "test.txt");
    const result = await encryptFile(testFile);

    expect(result.password).to.exist;
  });

  it("should generate a unique identifier containing the file name encripted", async () => {
    const testFile = new File(["test"], "test.txt");
    const result = await encryptFile(testFile);

    await expectIdEqualToFileName(result, "test.txt");
  });
});

const expectEncriptedTextEqualTo = async (
  encryptedFile: { id: string; encryptedFile: File; password: string },
  text: string
) =>
  expect(
    await (
      await decryptFile(
        encryptedFile.id,
        encryptedFile.encryptedFile,
        encryptedFile.password
      )
    ).decryptedFile.text()
  ).to.eq(text);

const expectIdEqualToFileName = async (
  encryptedFile: {
    id: string;
    password: string;
  },
  fileName: string
) =>
  expect(
    new TextDecoder().decode(
      await decryptData(base642Buff(encryptedFile.id), encryptedFile.password)
    )
  ).to.eq(fileName);
