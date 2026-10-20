import { useParams } from "react-router";
import { useEffect, useState} from "react"
import type { Album, Song } from "../types"
import { getAlbum } from "../api/musicbrainz"
import { getTracks } from "../api/musicbrainz";
import { Link } from "react-router";
import { formatDuration } from "../lib/format";
import { formatTotalDuration } from "../lib/format";
import { useCollection } from "../context/CollectionContext"
import Button from "../components/Button"

type Status = "loading" | "error" | "success"



function AlbumPage() {
    const { id } = useParams()
    const [album, setAlbum] = useState<Album | null>(null)
    const [status, setStatus] = useState<Status>("loading")
    const [tracks, setTracks] = useState<Song[]>([])
    const [tracksStatus, setTracksStatus] = useState<Status>("loading")

    const collection = useCollection()

    useEffect(() => {
        if(!id) return

        setStatus("loading")

        getAlbum(id)
            .then(result => {
            setAlbum(result)
            setStatus("success")
            })
            .catch(err => {
                console.error(err)
                setStatus("error")
            })

        getTracks(id)
            .then(result => {
                setTracks(result)
                setTracksStatus("success")
            })
            .catch(err => {
                console.error(err)
                setTracksStatus("error")
            })
    }, [id])

    const totalMs = tracks.reduce(
        (sum, track) => sum + (track.durationMs ?? 0), 0
    )

    if(status === 'loading') {
       return <p>Loading...</p>
    }

    if(status === "error" || !album) {
        return (
            <div className="py-16 text-center">
                <p className="font-display text-2xl text-chalk">Album not found</p>

                <p className="text-fog text-sm mt-2">
                    The link may be wrong, or the album no longer exists.
                </p>

                <Link
                    to="/"
                    className="inline-block mt-6 text-fog text-sm hover:text-chalk transition-colors"> 
                    ← Back to search
                </Link>
            </div>
        )
    }

    return (
        <div className="py-8">
            <Link to="/" className="text-fog text-sm hover:text-chalk transition-colors">
            ← Home
            </Link>
            <div className="flex flex-col sm:flex-row gap-8 mt-8">
                <div className="sm:w-64 shrink-0">
                    <img 
                        src={album.coverUrl} 
                        alt={album.title}
                        className="w-full aspect-square rounded-lg object-cover bg-line"
                    />

                    <p className="text-fog text-xs uppercase tracking-widest mt-6">Album</p>

                    <h1 className="font-display text-4xl tracking-tight mt-2">
                        {album.title}
                    </h1>

                    <p className="text-chalk text-xl mt-4">{album.artist}</p>
                    
                    <p className="text-chalk text-sm mt-2">
                        {album.year} · {tracks.length} tracks
                        {totalMs > 0 && ` · ${formatTotalDuration(totalMs)}`}
                    </p>

                    <div className="mt-6">
                        <Button
                            variant={collection.has(album.id) ? "secondary" : "primary"}
                            onClick={() =>
                                collection.has(album.id)
                                ? collection.remove(album.id)
                                : collection.add(album)
                            }
                        >
                            {collection.has(album.id) ? "Remove" : "Save"}
                        </Button>
                    </div>

                    
             </div>
            <div className="flex flex-col justify-end">
                

            </div>

            <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl">Tracks:</h2>
                <div className="mt-4 border-t border-line pt-4">
                    {tracksStatus == "loading" && (
                        <p className="text-fog">Loading tracks...</p>
                    )}
                    {tracksStatus == "error" && (
                        <p className="text-fog">Couldn't load the tracks</p>
                    )}
                    {tracksStatus == "success" && tracks.length == 0 && (
                        <p className="text-fog">This album has no track list</p>
                    )}

                    {tracksStatus == "success" && tracks.length > 0 && (
                        <ol className="space-y-1">
                            {tracks.map(track => (
                                <li 
                                key={track.id}
                                className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-surface transition-colors">
                                    <span className="text-fog text-sm w-6 shrink-0 text-right">{track.trackNumber}.</span>
                                    <span className="text-chalk truncate">{track.title}</span>

                                    <span className="text-fog text-sm ml-auto shrink-0">
                                        {formatDuration(track.durationMs)}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    )}
                
                </div>
            </div>
            </div>
        </div>
    )
}

export default AlbumPage