import { Base64 } from 'js-base64';

export const buff2Base64 = (buff: Uint8Array): string => Base64.fromUint8Array(buff, true);;
export const base642Buff = (b64:string): Uint8Array => Base64.toUint8Array(b64);
export const file2Buff = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      if (!fr.result || typeof fr.result === "string") {
        return reject();
      }

      resolve(fr.result);
    };
    fr.readAsArrayBuffer(file);
  });
}
