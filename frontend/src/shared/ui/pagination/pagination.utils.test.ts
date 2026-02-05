import { describe, it, expect } from "vitest";
import { getPageNumbers } from "./pagination.utils";

describe("getPageNumbers", () => {
  describe("when total pages is 5 or less", () => {
    it("should return all pages for 1 total page", () => {
      expect(getPageNumbers(1, 1)).toEqual([1]);
    });

    it("should return all pages for 3 total pages", () => {
      expect(getPageNumbers(1, 3)).toEqual([1, 2, 3]);
      expect(getPageNumbers(2, 3)).toEqual([1, 2, 3]);
      expect(getPageNumbers(3, 3)).toEqual([1, 2, 3]);
    });

    it("should return all pages for 5 total pages", () => {
      expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getPageNumbers(3, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getPageNumbers(5, 5)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("when total pages is more than 5", () => {
    it("should show first pages with ellipsis at end when current is near start", () => {
      expect(getPageNumbers(1, 10)).toEqual([1, 2, 3, 4, "...", 10]);
      expect(getPageNumbers(2, 10)).toEqual([1, 2, 3, 4, "...", 10]);
      expect(getPageNumbers(3, 10)).toEqual([1, 2, 3, 4, "...", 10]);
    });

    it("should show last pages with ellipsis at start when current is near end", () => {
      expect(getPageNumbers(8, 10)).toEqual([1, "...", 7, 8, 9, 10]);
      expect(getPageNumbers(9, 10)).toEqual([1, "...", 7, 8, 9, 10]);
      expect(getPageNumbers(10, 10)).toEqual([1, "...", 7, 8, 9, 10]);
    });

    it("should show current page in middle with ellipsis on both sides", () => {
      expect(getPageNumbers(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
      expect(getPageNumbers(6, 10)).toEqual([1, "...", 5, 6, 7, "...", 10]);
      expect(getPageNumbers(7, 10)).toEqual([1, "...", 6, 7, 8, "...", 10]);
    });

    it("should handle edge case at transition point", () => {
      // At current = 4, should switch from start pattern to middle pattern
      expect(getPageNumbers(4, 10)).toEqual([1, "...", 3, 4, 5, "...", 10]);
    });
  });
});
