import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"
import type { Album } from "../types"
import { loadFromStorage, saveToStorage } from "../lib/storage"

type CollectionValue = {
    albums: Album[];
    add: (album: Album) => void;
    remove: (id: string) => void;
    has: (id: string) => boolean;
}



export const CollectionContext = createContext<CollectionValue | null>(null)

export function CollectionProvider({ children }: {children: ReactNode }) {
    const [albums, setAlbums] = useState<Album[]>(() => 
    loadFromStorage<Album[]>("collection", []))

    useEffect(() => {
        saveToStorage("collection", albums)
    }, [albums])

    function add(album: Album) {
        setAlbums(prev => 
            prev.some(a => a.id == album.id) ? prev : [...prev, album]
        )
    }

    function remove(id: string) {
        setAlbums(prev => prev.filter(a => a.id !== id))
    }

    function has(id: string) {
        return albums.some(a => a.id == id)
    }

    return (
        <CollectionContext.Provider value={{albums, add, remove, has }}>
            {children}
        </CollectionContext.Provider>
    )
}

export function useCollection() {
    const value = useContext(CollectionContext)

    if(!value) {
        throw new Error("useCollection must be used inside CollectionProvider")
    }

    return value
}