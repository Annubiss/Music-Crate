export function formatDuration(ms?: number): string {
    if(!ms) return "";

    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export function formatTotalDuration(ms: number): string {
    const totalMinutes = Math.round(ms / 60000)

    if(totalMinutes < 60) {
        return `${totalMinutes} min`
    }

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes} min`
}