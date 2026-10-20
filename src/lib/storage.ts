const PREFIX = "crate:"

export function loadFromStorage<T>(key: string, fallback: T): T {
    try{
        const raw = localStorage.getItem(PREFIX + key)
        if (raw == null) return fallback
        return JSON.parse(raw) as T
    } catch {
        return fallback
    }
}

export function saveToStorage<T>(key: string, value: T) : void {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
        //storage may be full or blocked: ignore
    }
}