import type { Filters, SearchMode } from "../types"

function anyOf(field: string, value: string): string {
    const items = value.split(",").map(v => `${field}:${v}`)
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
        parts.push(anyOf("primarytype", filters.type))
    }

    if( filters.category !== "") {
        parts.push(anyOf("secondarytype", filters.category))
    }

    return parts.join(" AND ")
}