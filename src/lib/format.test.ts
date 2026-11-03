import { describe, it, expect } from "vitest";
import { formatDuration } from "./format";

describe("formatDuration", () => {
    it("formats milliseconds as minutes and seconds", () => {
        expect(formatDuration(222000)).toBe("3:42")
    })
})