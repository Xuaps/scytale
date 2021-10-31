import useDeleteFile from "../delete_file"
import { createDeleteFileDoc } from "../../actions/documents"
import { renderHook } from "@testing-library/react-hooks/native"

describe("Delete file", () => {
    it("should delete the file", async () => {
        const deleteFileMock = jasmine.createSpy("deleteFileMock", async () => Promise.resolve()) 
        const state = {upload: { uploadedFiles: [] }}
        const setState = jasmine.createSpy()
        const { result, waitFor } = 
            renderHook(() => useDeleteFile(createDeleteFileDoc, deleteFileMock, state, setState)) 

        result.current.next({id: "", password: ""})
        await waitFor(() => setState.calls.any())

        expect(deleteFileMock).toHaveBeenCalledTimes(1)
    })

    it("should remove the file from the file collections", async () => {
        const deleteFileMock = jasmine.createSpy("deleteFileMock", async () => Promise.resolve()) 
        const state = {upload: { uploadedFiles: [{id: "id"}] }}
        const setState = jasmine.createSpy()
        const { result, waitFor } = 
            renderHook(() => useDeleteFile(createDeleteFileDoc, deleteFileMock, state, setState)) 

        result.current.next({id: "id", password: ""})
        await waitFor(() => setState.calls.any())

        expect(setState).toHaveBeenCalledWith({upload: {uploadedFiles: [], encryptedFiles: [] }})
    })
})