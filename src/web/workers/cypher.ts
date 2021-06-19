import { encryptFile, decryptFile } from "../domain/encryption";

onmessage = async function(e) {
  console.log('Worker: Message received from main script');
  const msg = e.data

  if (msg.cmd === 'encrypt') {
    const encryptedFile = await encryptFile(msg.file, msg.password)
    // @ts-ignore
    postMessage({encryptedFile, name: msg.file.name, password: msg.password} );
  } else {
    console.log(msg)
    const decryptedFile = await decryptFile(msg.file, msg.password)
    console.log(decryptedFile)
    // @ts-ignore
    postMessage({decryptedFile});
  }
}
