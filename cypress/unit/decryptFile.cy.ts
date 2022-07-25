import { decryptFile, encryptFile } from "../../src/core/encryption/encryption";

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

    expect(await result.decryptedFile.text()).to.eq("test");
  });

  it("should decipher the file metadata", async () => {
    const testFile = await encryptFile(new File([fileContent], fileName));
    const result = await decryptFile(
      testFile.id,
      testFile.encryptedFile,
      testFile.password
    );

    expect(result.name).to.eq(fileName);
  });
});
