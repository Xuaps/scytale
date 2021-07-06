import { expect } from "chai";
import { base642Buff, buff2Base64, file2Buff } from "../domain/convert";

describe("converters", () => {
  describe("buff2Base64", () => {
    it("should convert from buffer to base64", () => {
      const buffer = new Uint8Array(10)
      expect(buff2Base64(buffer)).to.equal("AAAAAAAAAAAAAA==")
    })
  })

  describe("base642Buff", () => {
    it("should convert from base64 to buffer", () => {
      expect(base642Buff("AAAAAAAAAAAAAA==")).to.deep.equal(new Uint8Array(10))
    })
  })

  describe("file2Buffer", () => {
    it("should convert from file to buffer", async () => {
      const file = new File(["a".repeat(10)], "test.txt", { type: "plain/txt" })
      const buffer = await file2Buff(file)
      // @ts-ignore
      const buffer2string = String.fromCharCode.apply(null, new Uint8Array(buffer));

      expect(buffer2string).to.deep.equal("a".repeat(10))
    })
  })
});
