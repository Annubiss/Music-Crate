import type { Album } from "../types"
import { Link } from "react-router"
import Cover from "./Cover"
import SaveButton from "./SaveButton"

type AlbumRowProps = {
    album: Album; 
};

function AlbumRow({ album }: AlbumRowProps) {
    return (
        <div className={"flex items-stretch bg-surface border border-line rounded-lg hover:border-fog " + 
            "has-[button:hover]:border-line transition-colors"
        }>
            <Link 
            to={`/album/${album.id}`}
            className="flex items-center min-w-0 flex-1 gap-4 p-3">
                <Cover 
                    src={album.coverUrl}
                    title={album.title}
                    className="w-14 h-14 rounded shrink-0"
                    letterClassName="text-xl"
                />

                <div className="min-w-0">
                    <h2 className="font-display text-lg text-chalk truncate">{album.title}</h2>
                    <p className="text-fog text-sm truncate">{album.artist}</p>
                </div>

                {album.year && 
                <p className="text-fog text-xs ml-auto shrink-0">{album.year}</p>}
            </Link>

            <div className="flex items-stretch">
                <SaveButton album={album} size = "sm"/>
            </div>
            </div>
    )
}

export default AlbumRow;