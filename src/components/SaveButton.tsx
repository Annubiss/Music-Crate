import type { Album } from "../types"
import { useCollection } from "../context/CollectionContext"
import Button from "./Button"
import type { ButtonSize } from "./Button"

type SaveButtonProps = {
    album: Album;
    size?: ButtonSize;
}

function SaveButton ({ album, size = "md" }: SaveButtonProps) {
    const { has, add, remove } = useCollection()
    const saved = has(album.id)

    return (
        <Button
            variant={saved ? "saved" : "primary"}
            size={size}
            label={saved ? "remove from collection" : "Add to collection"}
            onClick={() => (saved ? remove(album.id) : add(album))}
        >
            {saved ? "-" : "+"}

        </Button>
    )
}

export default SaveButton