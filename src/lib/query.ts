import type { Filters } from "../types"

export function buildQuery(text: string, filters: Filters): string {
    const parts: string[] = []

    const trimmed = text.trim()
    if(trimmed !== "") parts.push(`(${trimmed})`)

    if( filters.genre !== "") {
        for (const g of filters.genre.split(",")){
            parts.push(`tag:"${g}"`)
        }
    }

    return parts.join(" AND ")
}