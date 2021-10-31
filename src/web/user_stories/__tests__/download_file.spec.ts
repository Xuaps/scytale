import { renderHook } from "@testing-library/react-hooks/native";
import { useDownloadFile } from "..";
import { decryptFile, encryptFile } from "../../domain/encryption";
import { createDownloadFileDoc } from "../../actions/documents";

describe("Download file", () => {
  it("should download the file", async () => {
    const { id, password, encryptedFile } = await encryptFile(new File(["test"], "test"));
    const getDocumentMock = jasmine.createSpy().and.returnValue(encryptedFile);
    const state = {};
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() =>
      useDownloadFile(decryptFile, createDownloadFileDoc, getDocumentMock, state, setState)
    );

    result.current.next({ id, password });
    await waitFor(() => setState.calls.any());

    expect(getDocumentMock).toHaveBeenCalledWith({ id });
  });
  it("should decrypt the file", async () => {
    const { id, password, encryptedFile } = await encryptFile(new File(["test"], "test"));
    const getDocumentMock = jasmine.createSpy().and.returnValue(encryptedFile);
    const state = {};
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() =>
      useDownloadFile(decryptFile, createDownloadFileDoc, getDocumentMock, state, setState)
    );

    result.current.next({ id, password });
    await waitFor(() => setState.calls.any());

    expect(await setState.calls.first().args[0].download.selectedFile.text()).toBe("test");
  });
  it("should select the file", async () => {
    const { id, password, encryptedFile } = await encryptFile(new File(["test"], "test"));
    const getDocumentMock = jasmine.createSpy().and.returnValue(encryptedFile);
    const state = {};
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() =>
      useDownloadFile(decryptFile, createDownloadFileDoc, getDocumentMock, state, setState)
    );

    result.current.next({ id, password });
    await waitFor(() => setState.calls.any());

    expect(await setState).toHaveBeenCalledWith({ download: { selectedFile: jasmine.any(File) } });
  });
});
