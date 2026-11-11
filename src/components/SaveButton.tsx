import type { Album } from "../types"
import { useCollection } from "../context/CollectionContext"
import Button from "./Button"
import type { ButtonSize } from "./Button"
import { Heart } from "lucide-react"

type SaveButtonProps = {
    album: Album;
    size?: ButtonSize;
}

function SaveButton ({ album, size = "md" }: SaveButtonProps) {
    const { has, add, remove } = useCollection()
    const saved = has(album.id)

    return (
        <Button
            variant={saved ? "danger" : "primary"}
            size={size}
            label={saved ? "remove from collection" : "Add to collection"}
            onClick={() => (saved ? remove(album.id) : add(album))}
        >
            <Heart 
                aria-hidden="true"
                fill={saved ? "currentColor" : "none"}
                className="w-5 h-5 mx-auto"
            />

        </Button>
    )
}

export default SaveButton