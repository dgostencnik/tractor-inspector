/* eslint-disable import/first */
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("../../utils/env", () => ({
  default: {
    VITE_TRACTOR_API_URL: "VITE_TRACTOR_API_URL",
  },
}));

import env from "../../utils/env";
import { tractorsApi } from "../tractors";

describe("tractorsApi.getTractors", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns list of tractors on success", async () => {
    const mockTractors = [
      { id: 1, name: "T1" },
      { id: 2, name: "T2" },
    ];

    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockTractors),
    };
    const mockFetch = vi.fn().mockResolvedValue(mockResponse);

    vi.stubGlobal("fetch", mockFetch);

    const result = await tractorsApi.getTractors();

    expect(fetch).toHaveBeenCalledWith(`${env.VITE_TRACTOR_API_URL}/tractors`);
    expect(result).toEqual(mockTractors);
  });

  it("throws an error when response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 418,
      statusText: "oh no",
    };

    const mockFetch = vi.fn().mockResolvedValue(mockResponse);
    vi.stubGlobal("fetch", mockFetch);

    await expect(tractorsApi.getTractors()).rejects.toThrow("418 oh no");
  });
});
