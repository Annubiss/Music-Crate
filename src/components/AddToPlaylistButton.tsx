import type { Song } from "../types"
import Button from "./Button"
import type { ButtonSize } from "./Button"
import { useState } from "react"
import Modal from "./Modal"
import { usePlaylists } from "../context/PlaylistsContext"

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
            label="Add to playlist"
            onClick={() => setIsOpen(true)}
        >
            +
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
                            className="flex items-center justify-between gap-4 border border-line rounded-lg p-3"
                        >
                            <Button
                                variant={inPlaylist ? "saved" : "primary"}
                                label={inPlaylist ? "Remove from playlist" : "Add to playlist"}
                                onClick={() => inPlaylist
                                    ? removeSong(playlist.id, song.id)
                                    : addSong(playlist.id, song)
                                }
                            >
                                {inPlaylist ? "-" : "+"}
                            </Button>
                        </li>
                    )})}
                </ul>     
            </Modal>
        )}

        </>
    )
}


export default AddToPlaylistButton