const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

export const encryptFile = (file: File) => new Promise((res, rej) => {
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
    password: window.btoa(
      String.fromCharCode(...crypto.getRandomValues(new Uint8Array(20)))
    ),
    cmd: "encrypt"
  }, [channel.port2]);
});

export const decryptFile = (file: Blob, password) => new Promise((res, rej) => {
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
    file,
    password,
    cmd: "decrypt"
  }, [channel.port2]);
});
