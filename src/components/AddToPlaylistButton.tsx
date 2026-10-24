import type { Song } from "../types"
import Button from "./Button"
import type { ButtonSize } from "./Button"
import { useState } from "react"
import Modal from "./Modal"

type AddToPlaylistButtonProps = {
    song: Song;
    size?: ButtonSize;
}

function AddToPlaylistButton({song, size = "md"}: AddToPlaylistButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
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
                <p className="text-fog text-sm">{song.title}</p>     
            </Modal>
        )}

        </>
    )
}


export default AddToPlaylistButton