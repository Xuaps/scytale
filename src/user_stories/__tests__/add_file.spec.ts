import { renderHook } from "@testing-library/react-hooks/native";
import useAddFile from "../add_file";
import { encryptFile, decryptFile } from "../../domain/encryption";
import { createFileEncryptedDoc } from "../../actions/documents";
import { State } from "../../store";

describe("Add file", () => {
  it("should encrypt file", async () => {
    const file = new File(["test"], "test");
    const state = { upload: { encryptedFiles: [] } } as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useAddFile(encryptFile, createFileEncryptedDoc, setState));

    result.current.next({ file, state });
    await waitFor(() => setState.calls.any());

    const { id, encryptedFile, password } = setState.calls.first().args[0].upload.encryptedFiles[0];
    expect(await (await decryptFile(id, encryptedFile, password)).decryptedFile.text()).toEqual("test");
  });

  it("should add the file to the collection", async () => {
    const file = new File(["test"], "test");
    const state = { upload: { encryptedFiles: [] } } as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useAddFile(encryptFile, createFileEncryptedDoc, setState));

    result.current.next({ file, state });
    await waitFor(() => setState.calls.any());

    expect(setState).toHaveBeenCalledWith({
      upload: {
        encryptedFiles: [
          {
            id: jasmine.any(String),
            encryptedFile: jasmine.any(File),
            name: "test",
            password: jasmine.any(String),
          },
        ],
      },
    });
  });
});
