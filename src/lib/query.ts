import type { Filters, SearchMode } from "../types"

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
        const types = filters.type.split(",").map(t => `primarytype:${t}`)
        parts.push(`(${types.join(" OR ")})`)
    }

    return parts.join(" AND ")
}