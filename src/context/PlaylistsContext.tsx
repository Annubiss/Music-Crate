import { createContext, useContext, useEffect, useState } from "react"
import type { Playlist, Song} from "../types"
import type { ReactNode } from "react"
import { loadFromStorage, saveToStorage } from "../lib/storage"



type PlaylistValue = {
    playlists: Playlist[];
    create: (name: string) => Playlist;
    rename: (id: string, name: string) => void;
    remove: (id: string) => void;
    addSong: (playlistId: string, song: Song) => void;
    removeSong: (playlistId: string, songId: string) => void;
}

export const PlaylistsContext = createContext<PlaylistValue | null>(null)


export function PlaylistsProvider({ children }: { children: ReactNode}) {
    const [playlists, setPlaylists] = useState<Playlist[]>(() =>
        loadFromStorage<Playlist[]>("Playlists", [])    
    )

    useEffect(() => {
        saveToStorage("Playlists", playlists)
    }, [playlists])

    function create(name: string): Playlist {
        const playlist: Playlist = {
            id: crypto.randomUUID(),
            name: name.trim(),
            createdAt: Date.now(),
            songs: [],
        }

        setPlaylists(prev => [...prev, playlist])

        return playlist
    }

    function rename(id: string, name: string) {
        setPlaylists(prev => 
            prev.map(p => (p.id == id ? {...p, name: name.trim() } : p))
        )
    }

    function remove(id: string) {
        setPlaylists(prev => prev.filter(p => p.id !== id))
    }

    function addSong(playlistId: string, song: Song) {
        setPlaylists(prev => 
            prev.map(p => {
                if(p.id !== playlistId) return p
                if(p.songs.some(s => s.id == song.id)) return p

                return {...p, songs: [...p.songs, song]}
            })
        )
    }

    function removeSong(playlistId: string, songId: string) {
        setPlaylists(prev => 
            prev.map(p => 
                p.id == playlistId ? {...p, songs: p.songs.filter(s => s.id !== songId)} : p
            )
        )
    }

    return (
        <PlaylistsContext.Provider
            value={{playlists, create, rename, remove, addSong, removeSong}}>
            {children}
        </PlaylistsContext.Provider>
    )

}

export function usePlaylists() {
    const value = useContext(PlaylistsContext)

    if(!value) {
        throw new Error("usePlaylists must be used inside PlaylistProvider")
    }

    return value
}