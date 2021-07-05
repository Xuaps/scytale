import { encryptData, decryptData } from "../domain/encryption";
import { base642Buff, buff2Base64, file2Buff } from "../domain/convert";

const enc = new TextEncoder();
const dec = new TextDecoder();

onmessage = async function (e: MessageEvent) {
  const { id, file, password, cmd } = e.data;

  const buff = await file2Buff(file);
  if (cmd === "encrypt") {
    const encryptedData = await encryptData(new Uint8Array(buff), password);
    const encryptedName = await encryptData(
      new Uint8Array(enc.encode(file.name)),
      password
    );
    // @ts-ignore
    e.ports[0].postMessage({
      id: buff2Base64(encryptedName),
      encryptedFile: new File([encryptedData], buff2Base64(encryptedName), {
        type: "application/download",
      }),
      name: file.name,
      password,
    });
  } else {
    const decryptedData = await decryptData(new Uint8Array(buff), password);
    const decryptedName = await decryptData(base642Buff(id), password);
    // @ts-ignore
    e.ports[0].postMessage({
      name: dec.decode(decryptedName),
      decryptedFile: new File([new Uint8Array(decryptedData)], dec.decode(decryptedName),
        { type: "application/download" }
      ),
    });
  }
};
