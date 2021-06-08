import Uploader from "./components/Uploader";
import React, { useEffect, useState } from "react";

const cypherWorker: Worker = new Worker("/assets/cypher.bundle.js");

const App = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    cypherWorker.onmessage = ($event: MessageEvent) => {
      if ($event && $event.data) {
        setFiles([...files, $event.data]);
      }
    };
  }, [cypherWorker]);

  return (
    <>
      <Uploader onAddFiles={(files: File[]) => cypherWorker.postMessage({
        file: files[0],
        password: "test",
        cmd: "encrypt"
      })} />
      <ul>
        {files.map(f => <li key={f.name}>{f.name}</li>)}
      </ul>
      <button onClick={() => {
        const formData = new FormData();
        formData.append("document", files[0].encryptedFile);
        fetch(
          "http://localhost:3000/api/documents",
          {
            method: "POST",
            body: formData
          })
          .then(res => console.log(res));
      }}>send
      </button>
    </>
  );
};

export default App;
