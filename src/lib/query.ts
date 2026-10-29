import type { Filters, SearchMode } from "../types"

const DURATION_RANGES: Record<string, string> = {
    short: "[0 TO 179999]",
    medium: "[180000 TO 359999]",
    long: "[360000 TO *]",
}

function anyOf(field: string, value: string[]): string {
    const items = value.map(v => `${field}:${v}`)
    return `(${items.join(" OR ")})`
}

export function buildQuery(text: string, filters: Filters, mode: SearchMode): string {
    const parts: string[] = []

    const trimmed = text.trim()
    if(trimmed !== "") parts.push(`(${trimmed})`)

    if( filters.genre !== "") {
        for (const g of filters.genre.split(",")){
            parts.push(`tag:"${g}"`)
        }
    }

    if( mode === "albums" && filters.type !== "") {
        parts.push(anyOf("primarytype", filters.type.split(",")))
    }

    if( filters.category !== "") {
        parts.push(anyOf("secondarytype", filters.category.split(",")))
    }

    if( mode === "songs" && filters.duration !== "") {
        const ranges = filters.duration
            .split(",")
            .map(d => DURATION_RANGES[d])
            .filter(r => r !== undefined)

        if( ranges.length > 0) parts.push(anyOf("dur", ranges))
    }

    if( filters.decade !== "") {
        const ranges = filters.decade
            .split(",")
            .map(d => Number(d))
            .filter(start => !Number.isNaN(start))
            .map(start => `[${start} TO ${start + 9}-12-31]`)

            if( ranges.length > 0) parts.push(anyOf("firstreleasedate", ranges))
    }

    return parts.join(" AND ")
}