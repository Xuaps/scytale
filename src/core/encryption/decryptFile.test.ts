import { decryptFile, encryptFile } from "./encryption";

describe("decrypt file", () => {
  const fileContent = "test";
  const fileName = "test.file";

  it("should decrypt the file", async () => {
    const testFile = await encryptFile(new File([fileContent], fileName));
    const result = await decryptFile(
      testFile.id,
      testFile.encryptedFile,
      testFile.password
    );

    expect(result.decryptedFile).toBeInstanceOf(File);
  });

  it("should decipher the file metadata", async () => {
    const testFile = await encryptFile(new File([fileContent], fileName));
    const result = await decryptFile(
      testFile.id,
      testFile.encryptedFile,
      testFile.password
    );

    expect(result.name).toBe(fileName);
  });
});
