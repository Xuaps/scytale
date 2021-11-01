import { renderHook } from "@testing-library/react-hooks/native";
import { useGetStats } from "..";
import { createFileStatsDoc } from "../../actions/documents";
import { State } from "../../store";

describe("Get stats", () => {
  it("should get the stats", async () => {
    const getStatsMock = jasmine.createSpy().and.returnValue([]);
    const state = {} as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useGetStats(createFileStatsDoc, getStatsMock, setState));

    result.current.next({ file: { id: "anyId", password: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(getStatsMock).toHaveBeenCalledWith({ id: "anyId" });
  });
  it("should update the stats for the selected file", async () => {
    const getStatsMock = jasmine.createSpy().and.returnValue([]);
    const state = {} as State;
    const setState = jasmine.createSpy();
    const { result, waitFor } = renderHook(() => useGetStats(createFileStatsDoc, getStatsMock, setState));

    result.current.next({ file: { id: "anyId", password: "" }, state });
    await waitFor(() => setState.calls.any());

    expect(setState).toHaveBeenCalledWith({ file_stats: { loaded: true, stats: [] } });
  });
});
