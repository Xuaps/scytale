import { useEffect } from "react";
import { Actions } from "../../model";

const downloadFile = async (id: string): Promise<Blob> => {
  return fetch(`http://localhost:3000/api/documents/${id}`)
    .then(response => response.blob());
};

const Download = ({ id, password, actions } : {id: string, password: string, actions: Actions}) => {
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
