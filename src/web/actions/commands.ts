import { generateRandomPassword } from "../domain/encryption";
import { EncryptedFile, DecryptedFile } from "../model";

const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

export const encryptFile = (file: File) => new Promise<EncryptedFile>((res, rej) => {
  const channel = new MessageChannel();

  channel.port1.onmessage = ({data}) => {
    channel.port1.close();
    if (data.error) {
      rej(data.error);
    }else {
      res(data);
    }
  };

  cypherWorker.postMessage({
    file: file,
    password: generateRandomPassword(20),
    cmd: "encrypt"
  }, [channel.port2]);
});

export const decryptFile = (id: string, file: Blob, password: string) => new Promise<DecryptedFile>((res, rej) => {
  const channel = new MessageChannel();

  channel.port1.onmessage = ({data}) => {
    channel.port1.close();
    if (data.error) {
      rej(data.error);
    }else {
      res(data);
    }
  };

  cypherWorker.postMessage({
    id,
    file,
    password,
    cmd: "decrypt"
  }, [channel.port2]);
});
