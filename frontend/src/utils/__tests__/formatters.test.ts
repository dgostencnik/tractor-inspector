import { describe, expect, it } from "vitest";

import { formatISO8601Date, formatLastActive } from "../formatters";

describe("formatLastActive", () => {
  it("returns N/A when dateString is undefined", () => {
    expect(formatLastActive()).toBe("N/A");
  });

  it("returns N/A when dateString is not a valid date string", () => {
    expect(formatLastActive("test")).toBe("N/A");
  });

  it("returns N/A when dateString is null", () => {
    expect(formatLastActive(null)).toBe("N/A");
  });

  it("returns N/A when dateString is in the future", () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60);
    expect(formatLastActive(futureDate.toISOString())).toBe("N/A");
  });

  it("returns Just now when dateString is less than 1 hour ago", () => {
    const recentDate = new Date(Date.now() - 1000 * 60);
    expect(formatLastActive(recentDate.toISOString())).toBe("Just now");
  });

  it("returns number of hours ago when dateString is less than 24 hours ago", () => {
    const recentDate = new Date(Date.now() - 1000 * 60 * 60 * 2);
    expect(formatLastActive(recentDate.toISOString())).toBe("2h ago");
  });

  it("returns  number of days ago\" when dateString is more than 24 hours ago", () => {
    const oldDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2); // 2 days ago
    expect(formatLastActive(oldDate.toISOString())).toBe("2d ago");
  });
});

describe("formatISO8601Date", () => {
  it("should format a valid date string", () => {
    const date1 = new Date("2025-08-14T10:19:00Z");
    const expectedOutput = "Aug 14, 2025, 10:19:00 AM";
    expect(formatISO8601Date(date1.toISOString())).toBe(expectedOutput);
  });

  it("should return Invalid date format for valid non ISO date string", () => {
    const dateString = "Mar 14, 2020 6:42:32 AM";
    expect(formatISO8601Date(dateString)).toBe("Invalid date");
  });

  it("should return Invalid date for an invalid date string", () => {
    const dateString = "qwerty ";
    expect(formatISO8601Date(dateString)).toBe("Invalid date");
  });

  it("should return Invalid date for a numeric input", () => {
    const input = 123;
    expect(formatISO8601Date(input)).toBe("Invalid date");
  });

  it("should return Invalid date for undefined ", () => {
    expect(formatISO8601Date(undefined)).toBe("Invalid date");
  });

  it("should return Invalid date for a null input", () => {
    expect(formatISO8601Date(null)).toBe("Invalid date");
  });
});
