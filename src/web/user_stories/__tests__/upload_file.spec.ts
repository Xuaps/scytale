import { renderHook } from "@testing-library/react-hooks/native";
import { useUploadFile } from "..";
import { createFileUploadedDoc } from "../../actions/documents";

describe("Upload file", () => {
  it("should upload the file", async () => {
    const uploadFileMock = jasmine.createSpy().and.returnValue({ id: "" });
    const setState = jasmine.createSpy();
    const state = { upload: { uploadedFiles: {} } };
    const { result, waitFor } = renderHook(() => useUploadFile(createFileUploadedDoc, uploadFileMock, state, setState));

    result.current.next({ id: "anyId", encryptedFile: new File([], ""), password: "", name: "" });
    await waitFor(() => setState.calls.any());

    expect(uploadFileMock).toHaveBeenCalledWith({ document: jasmine.any(File) });
  });
  it("should move the file to the list of uploaded files", async () => {
    const uploadFileMock = jasmine.createSpy().and.returnValue({ id: "anyId" });
    const setState = jasmine.createSpy();
    const state = { upload: { uploadedFiles: {} } };
    const { result, waitFor } = renderHook(() => useUploadFile(createFileUploadedDoc, uploadFileMock, state, setState));

    result.current.next({ id: "", encryptedFile: new File([], ""), password: "", name: "" });
    await waitFor(() => setState.calls.any());

    expect(setState).toHaveBeenCalledWith({
      upload: { uploadedFiles: [{ id: "anyId", name: "", password: "" }], encryptedFiles: [] },
    });
  });
  it("should persist the changes into the local storage", async () => {
    const uploadFileMock = jasmine.createSpy().and.returnValue({ id: "anyId" });
    const setState = jasmine.createSpy();
    const state = { upload: { uploadedFiles: {} } };
    const { result, waitFor } = renderHook(() => useUploadFile(createFileUploadedDoc, uploadFileMock, state, setState));

    result.current.next({ id: "", encryptedFile: new File([], ""), password: "", name: "" });
    await waitFor(() => setState.calls.any());

    expect(localStorage.getItem("files")).toEqual(JSON.stringify([{ id: "anyId", name: "", password: "" }]));
  });
});
