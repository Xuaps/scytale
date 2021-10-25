import * as Comlink from "comlink";
import { encryptFile, decryptFile } from "../domain/encryption";

Comlink.expose({
  encryptFile,
  decryptFile,
});
