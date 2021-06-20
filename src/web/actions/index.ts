const fileEncrypted = (state, file) => ({
  ...state,
  upload: {
    ...state.upload,
    encryptedFiles: [...state.upload.encryptedFiles, file]
  }
});

const fileDecrypted = (state, file) => ({
  ...state,
  download: {
    ...state.download,
    selectedFile: file.decryptedFile
  }
});


const uploadFile = (state, file) => {
  const formData = new FormData();
  formData.append("document", file.encryptedFile);
  return fetch("http://localhost:3000/api/documents", {
    method: "POST",
    body: formData
  }).then((res) => res.json()).then((res: { id: string }) =>
    fileUploaded(state, [
      {
        id: res.id,
        name: file.name,
        password: file.password
      }
    ])
  );
};

const fileUploaded = (state, files) => {
  const nextFiles = [...state.upload.uploadedFiles, ...files];

  return {
    ...state,
    upload: {
      ...state.upload,
      uploadedFiles: nextFiles,
      encryptedFiles: [],
    }
  }
};


export default function({state, setState}) {
  const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

  const encryptFile = (files: File[]) => {
    cypherWorker.postMessage({
      file: files[0],
      password: window.btoa(
        String.fromCharCode(...crypto.getRandomValues(new Uint8Array(20)))
      ),
      cmd: "encrypt"
    });
  };

  const decryptFile = (file: Blob, password) => {
    cypherWorker.postMessage({
      file,
      password,
      cmd: "decrypt"
    });
  };

  cypherWorker.onmessage = ($event: MessageEvent) => {
    if ($event && $event.data && $event.data.encryptedFile) {
      setState(fileEncrypted(state, $event.data));
    }
    if ($event && $event.data && $event.data.decryptedFile) {
      setState(fileDecrypted(state, $event.data));
    }
  };

  return ({
    encryptFile: (files: File[]) => encryptFile(files),
    decryptFile: (file: Blob, password) => decryptFile(file, password),
    uploadFile: async (file) => {
      const doc = await uploadFile(state, file);
      setState(doc)
      localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
    }
  });
}
