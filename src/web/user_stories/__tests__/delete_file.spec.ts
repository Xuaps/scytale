import useDeleteFile from "../delete_file";
import { createDeleteFileDoc } from "../../actions/documents";
import { renderHook } from "@testing-library/react-hooks/native";
import { State } from "../../store";

describe("Delete file", () => {
  it("should delete the file", async () => {
    const deleteFileMock = jasmine.createSpy("deleteFileMock", async () => Promise.resolve());
    const state = { upload: { uploadedFiles: [] } } as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useDeleteFile(createDeleteFileDoc, deleteFileMock, setState));

    result.current.next({ file: { id: "", password: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(deleteFileMock).toHaveBeenCalledTimes(1);
  });

  it("should remove the file from the file collections", async () => {
    const deleteFileMock = jasmine.createSpy("deleteFileMock", async () => Promise.resolve());
    const state = { upload: { uploadedFiles: [{ id: "id" }] } } as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useDeleteFile(createDeleteFileDoc, deleteFileMock, setState));

    result.current.next({ file: { id: "id", password: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(setState).toHaveBeenCalledWith({ upload: { uploadedFiles: [], encryptedFiles: [] } });
  });
});
