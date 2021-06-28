import { useEffect } from "react";

const downloadFile = async (id) => {
  return fetch(`http://localhost:3000/api/documents/${id}`)
    .then(response => response.blob());
};

const Download = ({ id, password, actions }) => {
  useEffect(() => {
    const processFile = async () => {
      const file = await downloadFile(id);
      await actions.decryptFile(id, file, password);
    };

    processFile().then();
  }, [id, password]);

  return <div>Decrypting file...</div>;
};

export default Download;
