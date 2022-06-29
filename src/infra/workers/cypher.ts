import * as Comlink from "comlink";
import { encryptFile, decryptFile } from "../../core/encryption/encryption";

Comlink.expose({
  encryptFile,
  decryptFile,
});
