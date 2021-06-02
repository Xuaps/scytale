import { encryptFile, decryptFile } from "../domain/encryption";

onmessage = async function(e) {
  console.log('Worker: Message received from main script');
  const msg = e.data
  console.log(e)
  if (msg.cmd === 'encrypt') {
    const encryptedFile = await encryptFile(msg.file, msg.password)
    // @ts-ignore
    postMessage(encryptedFile);
  } else {
    const decryptedFile = await decryptFile(msg.file, msg.password)
    // @ts-ignore
    postMessage(decryptedFile);
  }
}
