import type { Album } from "../types";
import { Link } from "react-router"
import Cover from "./Cover"
import SaveButton from "./SaveButton"

type AlbumCardProps = {
    album: Album;
}

function AlbumCard({ album } : AlbumCardProps) {
    return (
        <div className={
            "bg-surface border border-line rounded-lg overflow-hidden hover:border-fog transition-colors " + 
            "has-[button:hover]:border-line"
        }>

            <Link to={`/album/${album.id}`} className ="block">
                <Cover 
                    src={album.coverUrl}
                    title={album.title}
                    className="w-full aspect-square"
                />
            </Link>

            <div className="flex items-stretch">
                <Link
                    to={`/album/${album.id}`}
                    className="min-w-0 flex-1 px-4 py-3">

                    <h2 className="font-display text-lg text-chalk truncate">{album.title}</h2>
                    <p className="text-fog text-sm mt-1 truncate">{album.artist}</p>
                    {album.year && <p className="text-fog text-xs mt-1">{album.year}</p>}
                </Link>

                <div className="flex items-stretch">
                    <SaveButton album={album} size="sPageSave" />
                </div>
            </div>
            
            </div>
    )
}

export default AlbumCard