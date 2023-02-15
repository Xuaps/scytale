import Environment from "jest-environment-jsdom";
import { TextEncoder, TextDecoder } from "util";
import crypto from "crypto";

module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    if (typeof this.global.TextEncoder === "undefined") {
      this.global.TextEncoder = TextEncoder;
      this.global.TextDecoder = TextDecoder;
      Object.defineProperty(this.global.self, "crypto", {
        value: Object.setPrototypeOf({ subtle: crypto.subtle }, crypto),
      });
    }
  }
};
