import { afterEach, describe, expect, it, vi } from "vitest";

import { TRACTOR_API_ENDPOINT, tractorsApi } from "../tractors";

describe("tractorsApi.getTractors", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns list of tractors on success", async () => {
    const mockTractors = [
      { id: 1, name: "Big Red" },
      { id: 2, name: "Green Beast" },
    ];

    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockTractors),
    };
    const mockFetch = vi.fn().mockResolvedValue(mockResponse);

    vi.stubGlobal("fetch", mockFetch);

    const result = await tractorsApi.getTractors();

    expect(fetch).toHaveBeenCalledWith(`${TRACTOR_API_ENDPOINT}/tractors`);
    expect(result).toEqual(mockTractors);
  });

  it("throws an error when response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 418,
    };

    const mockFetch = vi.fn().mockResolvedValue(mockResponse);
    vi.stubGlobal("fetch", mockFetch);

    await expect(tractorsApi.getTractors()).rejects.toThrow("HTTP error! status: 418");
  });
});
