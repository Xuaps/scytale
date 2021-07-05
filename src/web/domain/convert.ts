export const buff2Base64 = (buff: Uint8Array): string => btoa(String.fromCharCode.apply(null, buff));
export const base642Buff = (b64:string): Uint8Array =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));
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
