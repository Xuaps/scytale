import { renderHook } from "@testing-library/react-hooks/native";
import { useDownloadFile } from "..";
import { decryptFile, encryptFile } from "../../domain/encryption";
import { createDownloadFileDoc } from "../../actions/documents";
import { State } from "../../store";

describe("Download file", () => {
  it("should download the file", async () => {
    const { id, password, encryptedFile } = await encryptFile(new File(["test"], "test"));
    const getDocumentMock = jasmine.createSpy().and.returnValue(encryptedFile);
    const state = {} as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() =>
      useDownloadFile(decryptFile, createDownloadFileDoc, getDocumentMock, setState)
    );

    result.current.next({ file: { id, password }, state });
    await waitFor(() => setState.calls.any());

    expect(getDocumentMock).toHaveBeenCalledWith({ id });
  });
  it("should decrypt the file", async () => {
    const { id, password, encryptedFile } = await encryptFile(new File(["test"], "test"));
    const getDocumentMock = jasmine.createSpy().and.returnValue(encryptedFile);
    const state = {} as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() =>
      useDownloadFile(decryptFile, createDownloadFileDoc, getDocumentMock, setState)
    );

    result.current.next({ file: { id, password }, state });
    await waitFor(() => setState.calls.any());

    expect(await setState.calls.first().args[0].download.selectedFile.text()).toBe("test");
  });
  it("should select the file", async () => {
    const { id, password, encryptedFile } = await encryptFile(new File(["test"], "test"));
    const getDocumentMock = jasmine.createSpy().and.returnValue(encryptedFile);
    const state = {} as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() =>
      useDownloadFile(decryptFile, createDownloadFileDoc, getDocumentMock, setState)
    );

    result.current.next({ file: { id, password }, state });
    await waitFor(() => setState.calls.any());

    expect(await setState).toHaveBeenCalledWith({ download: { selectedFile: jasmine.any(File) } });
  });
});
