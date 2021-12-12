import { renderHook } from "@testing-library/react-hooks/native";
import { useUploadFile } from "..";
import { createFileUploadedDoc } from "../../actions/documents";
import { State } from "../../store";

describe("Upload file", () => {
  it("should upload the file", async () => {
    const uploadFileMock = jasmine.createSpy().and.returnValue({ id: "" });
    const setState = jasmine.createSpy();
    const state = { upload: { uploadedFiles: {} } } as State;
    const { result, waitFor } = renderHook(() => useUploadFile(createFileUploadedDoc, uploadFileMock, setState));

    result.current.next({ file: { id: "anyId", encryptedFile: new File([], ""), password: "", name: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(uploadFileMock).toHaveBeenCalledWith({ id: "anyId", document: jasmine.any(File) });
  });
  it("should move the file to the list of uploaded files", async () => {
    const uploadFileMock = jasmine.createSpy().and.returnValue({ id: "anyId" });
    const setState = jasmine.createSpy();
    const state = { upload: { uploadedFiles: {} } } as State;
    const { result, waitFor } = renderHook(() => useUploadFile(createFileUploadedDoc, uploadFileMock, setState));

    result.current.next({ file: { id: "anyId", encryptedFile: new File([], ""), password: "", name: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(setState).toHaveBeenCalledWith({
      upload: { uploadedFiles: [{ id: "anyId", name: "", password: "" }], encryptedFiles: [] },
    });
  });
  it("should persist the changes into the local storage", async () => {
    const uploadFileMock = jasmine.createSpy().and.returnValue({ id: "anyId" });
    const setState = jasmine.createSpy();
    const state = { upload: { uploadedFiles: {} } } as State;
    const { result, waitFor } = renderHook(() => useUploadFile(createFileUploadedDoc, uploadFileMock, setState));

    result.current.next({ file: { id: "anyId", encryptedFile: new File([], ""), password: "", name: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(localStorage.getItem("files")).toEqual(JSON.stringify([{ id: "anyId", name: "", password: "" }]));
  });
});
