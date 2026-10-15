import type { Album } from "../types";
import { useState } from "react"
import { Link } from "react-router"

type AlbumCardProps = {
    album: Album;
}

function AlbumCard({ album } : AlbumCardProps) {
    const [coverFailed, setCoverFailed] = useState(false)
    return (
        <Link to={`/album/${album.id}`}
         className='block bg-surface border border-line rounded-lg overflow-hidden hover:border-fog transition-colors'>
            {coverFailed ? (
            <div className="w-full aspect-square bg-line flex items-center justify-center">
                <span className="font-display text-4xl text-fog">{album.title.charAt(0)}</span>
            </div>
            ) : (
            <img className="w-full aspect-square object-cover bg-line"
                src={album.coverUrl}
                alt={album.title}
                onError={() => setCoverFailed(true)}
            />
            )}
        <div className="px-4 py-3">
            <h2 className="font-display text-lg text-chalk">{album.title}</h2>
            <p className="text-fog text-sm mt-1">{album.artist}</p>
            {album.year && <p className="text-fog text-xs mt-1">{album.year}</p>}
        </div>
        </Link>
    )
}

export default AlbumCard