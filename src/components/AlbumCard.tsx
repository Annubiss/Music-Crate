import type { Album } from "../types";
import { Link } from "react-router"
import Cover from "./Cover"

type AlbumCardProps = {
    album: Album;
}

function AlbumCard({ album } : AlbumCardProps) {
    return (
        <Link to={`/album/${album.id}`}
         className='block bg-surface border border-line rounded-lg overflow-hidden hover:border-fog transition-colors'>
            <Cover 
                src={album.coverUrl}
                title={album.title}
                className="w-full aspect-square"
            />
        <div className="px-4 py-3">
            <h2 className="font-display text-lg text-chalk">{album.title}</h2>
            <p className="text-fog text-sm mt-1">{album.artist}</p>
            {album.year && <p className="text-fog text-xs mt-1">{album.year}</p>}
        </div>
        </Link>
    )
}

export default AlbumCard