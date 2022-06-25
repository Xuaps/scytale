import { base642Buff, buff2Base64, file2Buff } from "../domain/convert";

const enc = new TextEncoder();
const dec = new TextDecoder();

const getPasswordKey = (password: string): Promise<CryptoKey> =>
  crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

const deriveKey = (
  passwordKey: CryptoKey,
  salt: Uint8Array,
  keyUsage: KeyUsage[]
): Promise<CryptoKey> =>
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

async function encryptData(
  secretData: Uint8Array,
  password: string
): Promise<Uint8Array> {
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
    const buff = new Uint8Array(
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

async function decryptData(
  encryptedData: Uint8Array,
  password: string
): Promise<ArrayBuffer> {
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

async function encryptFile(file: File): Promise<{
  id: string;
  encryptedFile: File;
  name: string;
  password: string;
}> {
  const password = generateRandomPassword(20);
  const buff = await file2Buff(file);
  const encryptedData = await encryptData(new Uint8Array(buff), password);
  const encryptedName = await encryptData(
    new Uint8Array(enc.encode(file.name)),
    password
  );

  return {
    id: buff2Base64(encryptedName),
    encryptedFile: new File([encryptedData], buff2Base64(encryptedName), {
      type: "application/download",
    }),
    name: file.name,
    password,
  };
}

async function decryptFile(id: string, file: File, password: string) {
  const buff = await file2Buff(file);
  const decryptedData = await decryptData(new Uint8Array(buff), password);
  const decryptedName = await decryptData(base642Buff(id), password);

  return {
    name: dec.decode(decryptedName),
    decryptedFile: new File(
      [new Uint8Array(decryptedData)],
      dec.decode(decryptedName),
      {
        type: "application/download",
      }
    ),
  };
}
const generateRandomPassword = (length: number): string =>
  self.btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(length)))
  );

export {
  generateRandomPassword,
  encryptData,
  decryptData,
  encryptFile,
  decryptFile,
};
