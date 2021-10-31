import { renderHook } from "@testing-library/react-hooks/native";
import { useGetStats } from "..";
import { createFileStatsDoc } from "../../actions/documents";

describe("Get stats", () => {
  it("should get the stats", () => {
    const getStatsMock = jasmine.createSpy().and.returnValue([]);
    const state = {};
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useGetStats(createFileStatsDoc, getStatsMock, state, setState));

    result.current.next({ id: "anyId", password: "" });
    waitFor(() => setState.calls.any());

    expect(getStatsMock).toHaveBeenCalledWith({ id: "anyId" });
  });
  it("should update the stats for the selected file", async () => {
    const getStatsMock = jasmine.createSpy().and.returnValue([]);
    const state = {};
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useGetStats(createFileStatsDoc, getStatsMock, state, setState));

    result.current.next({ id: "anyId", password: "" });
    await waitFor(() => setState.calls.any());

    expect(setState).toHaveBeenCalledWith({ file_stats: { loaded: true, stats: [] } });
  });
});
