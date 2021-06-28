const enc = new TextEncoder();

const getPasswordKey = (password) =>
  crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

const deriveKey = (passwordKey, salt, keyUsage) =>
  crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    keyUsage
  );

async function encryptData(secretData: Uint8Array, password: string): Promise<Uint8Array> {
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
    const encryptedContent = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      secretData
    );

    const encryptedContentArr = new Uint8Array(encryptedContent);
    let buff = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
    );
    buff.set(salt, 0);
    buff.set(iv, salt.byteLength);
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
    return buff;
  } catch (e) {
    console.log(`Error - ${e}`);
    throw e;
  }
}

async function decryptData(encryptedData: Uint8Array, password: string): Promise<ArrayBuffer> {
  try {
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 16 + 12);
    const data = encryptedData.slice(16 + 12);
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
    return await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      data
    );
  } catch (e) {
    console.log(`Error - ${e}`);
    throw e;
  }
}

const generateRandomPassword = (length: number) => window.btoa(
  String.fromCharCode(...crypto.getRandomValues(new Uint8Array(length)))
)

export {
  generateRandomPassword,
  encryptData,
  decryptData,
}
