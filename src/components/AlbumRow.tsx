import type { Album } from "../types"
import { Link } from "react-router"

type AlbumRowProps = {
    album: Album; 
};

function AlbumRow({ album }: AlbumRowProps) {
    return (
    <Link 
    to={`/album/${album.id}`}
    className="flex items-center gap-4 bg-surface border border-line rounded-lg p-3 hover:border-fog transition-colors">
        <img className="w-14 h-14 object-cover rounded shrink-0" src={album.coverUrl} alt={album.title} />

        <div className="min-w-0">
            <h2 className="font-display text-lg text-chalk truncate">{album.title}</h2>
            <p className="text-fog text-sm truncate">{album.artist}</p>
        </div>

        {album.year && 
        <p className="text-fog text-xs ml-auto shrink-0">{album.year}</p>}
    </Link>
    )
}

export default AlbumRow;