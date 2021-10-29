import { base642Buff, buff2Base64, file2Buff } from "../domain/convert";
import { decryptData, encryptData } from "../domain/encryption";
import testFile from "./testfile";
var isEqual = require("arraybuffer-equal");

describe("converters", () => {
  describe("buff2Base64", () => {
    it("should convert from buffer to base64", () => {
      const buffer = new Uint8Array(10);
      expect(buff2Base64(buffer)).toEqual("AAAAAAAAAAAAAA");
    });
  });

  describe("base642Buff", () => {
    it("should convert from base64 to buffer", () => {
      expect(base642Buff("AAAAAAAAAAAAAA==")).toEqual(new Uint8Array(10));
    });
  });

  it("should convert encrypted buffer", async () => {
    const encripted = await encryptData(testFile, "test");
    const res = await decryptData(base642Buff(buff2Base64(encripted)), "test");

    expect(isEqual(res, testFile.buffer)).toBe(true);
  });

  describe("file2Buffer", () => {
    it("should convert from file to buffer", async () => {
      const file = new File(["a".repeat(10)], "test.txt", {
        type: "plain/txt",
      });
      const buffer = await file2Buff(file);
      const buffer2string = String.fromCharCode.apply(
        null,
        new Uint8Array(buffer) as any
      );

      expect(buffer2string).toEqual("a".repeat(10));
    });
  });
});
