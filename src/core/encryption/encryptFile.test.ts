import { encryptFile, decryptFile, decryptData } from "./encryption";
import { base642Buff } from "./convert";

describe("encrypt file", () => {
  it.only("should encrypt the file", async () => {
    const testFile: File = new File(["test"], "test.txt");
    const result = await encryptFile(testFile);

    await expectEncriptedText(result);
  });

  it("should generate a random password", async () => {
    const testFile: File = new File(["test"], "test.txt");
    const result = await encryptFile(testFile);

    expect(result.password).toBeDefined;
  });

  it("should generate a unique identifier containing the file name encripted", async () => {
    const testFile = new File(["test"], "test.txt");
    const result = await encryptFile(testFile);

    await expectIdEqualToFileName(result, "test.txt");
  });
});

const expectEncriptedText = async (encryptedFile: {
  id: string;
  encryptedFile: File;
  password: string;
}) =>
  expect(
    (
      await decryptFile(
        encryptedFile.id,
        encryptedFile.encryptedFile,
        encryptedFile.password
      )
    ).decryptedFile
  ).toBeInstanceOf(File);

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
  ).toBe(fileName);
