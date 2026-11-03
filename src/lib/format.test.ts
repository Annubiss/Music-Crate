import { describe, it, expect } from "vitest";
import { formatDuration, formatTotalDuration } from "./format";

describe("formatDuration", () => {
    it("formats milliseconds as minutes and seconds", () => {
        expect(formatDuration(222000)).toBe("3:42")
    })

    it("pads seconds with a leading zero", () => {
        expect(formatDuration(65000)).toBe("1:05")
    })

    it("ignores leftover milliseconds", () => {
        expect(formatDuration(222999)).toBe("3:42")
    })

    it("return an empty string when duration is missing", () => {
        expect(formatDuration(undefined)).toBe("")
    })
})

describe("formatTotalDuration", () => {
    it("shows only minutes under one hour", () => {
        expect(formatTotalDuration(38 * 60000)).toBe("38 min")
    })

    it("shows hours and minutes from one hour up", () => {
        expect(formatTotalDuration(72 * 60000)).toBe("1h 12 min")
    }) 
    
    it("rounds to the nearest minute", () => {
        expect(formatTotalDuration(90000)).toBe("2 min")
    })
})