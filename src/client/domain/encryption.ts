function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      if (!fr.result || typeof fr.result === "string") {
        return reject();
      }

      resolve(fr.result);
    };
    fr.readAsArrayBuffer(file);
  });
}

async function encryptFile(
  objFile: File,
  encPassPhrase: string
): Promise<Blob> {
  const plainTextBytes = new Uint8Array(await readFile(objFile));
  const pbkdf2iterations = 10000;
  const passPhraseBytes = new TextEncoder().encode(encPassPhrase);
  const pbkdf2salt = window.crypto.getRandomValues(new Uint8Array(8));
  const passPhraseKey = await window.crypto.subtle.importKey(
    "raw",
    passPhraseBytes,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  console.log("passphrasekey imported");

  const pbkdf2bytes = new Uint8Array(
    await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: pbkdf2salt,
        iterations: pbkdf2iterations,
        hash: "SHA-256",
      },
      passPhraseKey,
      384
    )
  );

  console.log("pbkdf2bytes derived");

  const keyBytes = pbkdf2bytes.slice(0, 32);
  const ivBytes = pbkdf2bytes.slice(32);

  const key = await window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC", length: 256 },
    false,
    ["encrypt"]
  );

  console.log("key imported");

  const cipherBytes = new Uint8Array(
    await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: ivBytes },
      key,
      plainTextBytes
    )
  );

  console.log("plaintext encrypted");

  const resultBytes = new Uint8Array(cipherBytes.length + 16);
  resultBytes.set(new TextEncoder().encode("Salted__"));
  resultBytes.set(pbkdf2salt, 8);
  resultBytes.set(cipherBytes, 16);

  const blob = new Blob([resultBytes], { type: "application/download" });
  
  return blob;
}

async function decryptFile(
  objFile: File,
  decPassPhrase: string
): Promise<Blob> {
  const cipherBytesA = new Uint8Array(await readFile(objFile));
  const pbkdf2iterations = 10000;
  const passPhraseBytes = new TextEncoder().encode(decPassPhrase);
  const pbkdf2salt = cipherBytesA.slice(8, 16);
  const passPhraseKey = await window.crypto.subtle.importKey(
    "raw",
    passPhraseBytes,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  console.log("passphrasekey imported");

  const pbkdf2bytes = new Uint8Array(
    await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: pbkdf2salt,
        iterations: pbkdf2iterations,
        hash: "SHA-256",
      },
      passPhraseKey,
      384
    )
  );

  console.log("pbkdf2bytes derived");

  const keyBytes = pbkdf2bytes.slice(0, 32);
  const ivBytes = pbkdf2bytes.slice(32);
  const cipherBytes = cipherBytesA.slice(16);

  const key = await window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC", length: 256 },
    false,
    ["decrypt"]
  );

  console.log("key imported");

  const plainTextBytes = new Uint8Array(
    await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: ivBytes },
      key,
      cipherBytes
    )
  );

  console.log("ciphertext decrypted");

  return new Blob([plainTextBytes], { type: "application/download" });
}

export {encryptFile, decryptFile}
