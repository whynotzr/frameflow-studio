import { describe, expect, it } from "vitest";
import { getContrastRatio, getWcagGrade } from "../utils/contrast";

describe("WCAG contrast utilities", () => {
  it("computes maximum contrast for black and white", () => {
    expect(getContrastRatio("#000000", "#FFFFFF")).toBe(21);
    expect(getWcagGrade(21)).toBe("AAA");
  });

  it("flags low contrast pairs as FAIL", () => {
    const ratio = getContrastRatio("#222222", "#333333");
    expect(getWcagGrade(ratio)).toBe("FAIL");
  });
});
