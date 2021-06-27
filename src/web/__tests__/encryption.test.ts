import { expect } from "chai";
import { encryptData, decryptData } from "../domain/encryption";

describe("encryption", () => {
  it("encrypt file", async () => {
    const enc = new TextEncoder();
    const dec = new TextDecoder();

    const data = "a".repeat(1024);
    const encryptedFile = await encryptData(enc.encode(data), "test");
    const decryptedFile = await decryptData(encryptedFile, "test");

    expect(dec.decode(decryptedFile)).to.equal(data);
  });
});
