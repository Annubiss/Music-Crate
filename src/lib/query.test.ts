import { describe, it, expect } from "vitest";
import { buildQuery } from "./query";
import type { Filters } from "../types";

const noFilters = {
    genre: "",
    type: "",
    category: "",
    duration: "",
    decade: "",
}

describe("buildQUery", () => {
    it("return an empty query when there is nothing to search", () => {
        expect(buildQuery("", noFilters, "albums")).toBe("")
    })

    it("wraps the search text in parentheses", () => {
        expect(buildQuery("radiohead", noFilters, "albums")).toBe("(radiohead)")
    })

    it("trims spaces around the search text", () => {
        expect(buildQuery(" radiohead ", noFilters, "albums")).toBe("(radiohead)")
    })

    it("requires every chosen genre", () => {
        const filters = {...noFilters, genre: "electronic,rock"}

        expect(buildQuery("", filters, "albums")).toBe('tag:"electronic" AND tag:"rock"')
    })

    it("combines search text and filters with AND", () => {
        const filters = {...noFilters, genre: "rock"}

        expect(buildQuery("radiohead", filters, "albums")).toBe('(radiohead) AND tag:"rock"')
    })

    it("accepts any of the chosen types", () => {
        const filters = {...noFilters, type: "album,ep"}

        expect(buildQuery("", filters, "albums")).toBe("(primarytype:album OR primarytype:ep)")
    })

    it("ignores the type filter when searching songs", () => {
        const filters = {...noFilters, type:"album"}

        expect(buildQuery("", filters, "songs")).toBe("")
    })

    it("accepts any of the chosen categories", () => {
        const filters = {...noFilters, category: "live,remix"}

        expect(buildQuery("", filters, "songs")).toBe("(secondarytype:live OR secondarytype:remix)")
    })

    it("turns durations into millisecond ranges for songs", () => {
        const filters = {...noFilters, duration: "short,long"}

        expect(buildQuery("", filters, "songs")).toBe("(dur:[0 TO 179999] OR dur:[360000 TO *])")
    })

    it("ignores the duration filter when searching albums", () => {
        const filters = {...noFilters, duration: "short"}

        expect(buildQuery("", filters, "albums")).toBe("")
    })

    it("skips unknown durations", () => {
        const filters = {...noFilters, duration: "banana"}

        expect(buildQuery("", filters, "songs")).toBe("")
    })

    it("turns decades into date ranges that include the whole last year", () => {
        const filters = {...noFilters, decade: "1990"}

        expect(buildQuery("", filters, "albums")).toBe("(firstreleasedate:[1990 TO 1999-12-31])")
    })

    it("skips decades that are not numbers", () => {
        const filters = {...noFilters, decade: "banana"}

        expect(buildQuery("", filters, "albums")).toBe("")
    })
})