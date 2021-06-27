import { encryptData, decryptData } from "../domain/encryption";
import { file2Buff } from "../domain/convert";

onmessage = async function (e) {
  const { file, password, cmd } = e.data;

  const buff = await file2Buff(file);
  if (cmd === "encrypt") {
    const encryptedData = await encryptData(new Uint8Array(buff), password);
    // @ts-ignore
    e.ports[0].postMessage({
      encryptedFile: new Blob([encryptedData], {
        type: "application/download",
      }),
      name: file.name,
      password,
    });
  } else {
    const decryptedData = await decryptData(new Uint8Array(buff), password);
    // @ts-ignore
    e.ports[0].postMessage({
      decryptedFile: new Blob([new Uint8Array(decryptedData)], {
        type: "application/download",
      }),
    });
  }
};
