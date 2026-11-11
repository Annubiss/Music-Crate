import type { Song } from "../types"
import Button from "./Button"
import type { ButtonSize } from "./Button"
import { useState } from "react"
import Modal from "./Modal"
import { usePlaylists } from "../context/PlaylistsContext"
import { ListPlus } from "lucide-react"

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
                        <li
                            key={playlist.id}
                            className={"flex items-center gap-3 border border-line rounded-lg p-3 " + 
                                "cursor-pointer hover:border-fog transition-colors"}
                        >
                            <input 
                                type="checkbox"
                                checked={inPlaylist}
                                onChange={() => inPlaylist
                                    ? removeSong(playlist.id, song.id)
                                    : addSong(playlist.id, song)   
                                }
                                className="w-5 h-5 shrink-0 accent-accent cursor-pointer"
                            />

                            <span className="truncate">{playlist.name}</span>

                        </li>
                    )})}
                </ul>     
            </Modal>
        )}

        </>
    )
}


export default AddToPlaylistButton