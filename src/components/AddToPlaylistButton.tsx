import type { Song } from "../types"
import Button from "./Button"
import type { ButtonSize } from "./Button"
import { useState } from "react"
import Modal from "./Modal"
import { usePlaylists } from "../context/PlaylistsContext"
import { Check, ListPlus } from "lucide-react"

type AddToPlaylistButtonProps = {
    song: Song;
    size?: ButtonSize;
}

function AddToPlaylistButton({song, size = "md"}: AddToPlaylistButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { playlists, addSong, removeSong } = usePlaylists()
    return (
        <>
        <Button 
            size={size}
            label={`Add ${song.title} to a playlist`}
            onClick={() => setIsOpen(true)}
        >
            <ListPlus aria-hidden="true" className="w-5 h-5 mx-auto" />
        </Button>

        {isOpen && (
            <Modal title="Add to playlist" onClose={() => setIsOpen(false)}>
                {playlists.length == 0 &&(
                    <p className="text-fog text-sm">No playlists yet. Create one on the Playlists page.</p>
                )}
                <ul className="flex flex-col gap-2">
                    {playlists.map(playlist => {
                        const inPlaylist = playlist.songs.some(s => s.id == song.id)
                        return(
                        <li key={playlist.id}>
                            <label className={"flex items-center gap-3 border border-line rounded-lg p-3 " + 
                                "cursor-pointer hover:border-fog transition-colors"}>
                                <span className="relative w-5 h-5 shrink-0">
                                <input 
                                    type="checkbox"
                                    checked={inPlaylist}
                                    onChange={() => inPlaylist
                                        ? removeSong(playlist.id, song.id)
                                        : addSong(playlist.id, song)   
                                    }
                                    className={"peer appearance-none block w-5 h-5 rounded border-2 border-fog " +
                                        "checked:bg-accent checked:border-accent cursor-pointer " +
                                        "focus-visible:outline-2 focus-visible:outline-offset-2 " +
                                        "focus-visible:outline-accent"}
                                />
                                <Check 
                                    aria-hidden="true"
                                    className={"absolute inset-0 m-auto w-4 h-4 text-on-accent " +
                                        "opacity-0 peer-checked:opacity-100 pointer-events-none"
                                    }
                                />
                                </span>

                                <span className="truncate">{playlist.name}</span>
                            </label>
                        </li>
                    )})}
                </ul>     
            </Modal>
        )}

        </>
    )
}


export default AddToPlaylistButton