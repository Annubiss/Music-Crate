import type { Song } from "../types"
import Button from "./Button"
import type { ButtonSize } from "./Button"

type AddToPlaylistButtonProps = {
    song: Song;
    size?: ButtonSize;
}

function AddToPlaylistButton({song, size = "md"}: AddToPlaylistButtonProps) {
    return (
        <Button 
            size={size}
            label="Add to playlist"
            onClick={() => console.log("add", song.title)}
        >
            +
        </Button>
    )
}

export default AddToPlaylistButton