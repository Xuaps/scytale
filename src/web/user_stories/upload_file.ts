import { map, mergeMap } from "rxjs";
import { FileUploadRequested } from "../actions/events";

const useUploadFile = (createFileUploadedDoc, uploadDocuments, setState) => {
  FileUploadRequested.pipe(
    mergeMap(async file => {
      const res = await uploadDocuments({ document: file.encryptedFile });
      return {
        id: res.id,
        name: file.name,
        password: file.password
      };
    }),
    map(file => createFileUploadedDoc([file]))
  ).subscribe(
    {
      next: doc => {
        setState(doc);
        localStorage.setItem("files", JSON.stringify(doc.upload.uploadedFiles));
      },
      error: error => {
        console.log(error)
      }
    });

  return FileUploadRequested;
};

export default useUploadFile
