import {
  encryptData,
  decryptData,
  encryptFile,
  decryptFile,
} from "../domain/encryption";

describe("encryption", () => {
  it("encrypt file", async () => {
    const enc = new TextEncoder();
    const dec = new TextDecoder();

    const data = "a".repeat(1024);
    const encryptedFile = await encryptData(enc.encode(data), "test");
    const decryptedFile = await decryptData(encryptedFile, "test");

    expect(dec.decode(decryptedFile)).toEqual(data);
  });

  it("encrypt file new", async () => {
    const password = "pwd";
    const fileName = "test";
    const fileText = "aaa";
    const file = new File(["aaa"], fileName);

    const { id, encryptedFile } = await encryptFile(file);
    const { name, decryptedFile } = await decryptFile(
      id,
      encryptedFile,
      password
    );

    expect(name).toEqual(fileName);
    expect(await decryptedFile.text()).toEqual(fileText);
  });
});
