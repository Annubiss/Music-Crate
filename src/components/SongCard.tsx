import type { Song } from "../types"
import Cover from "./Cover"

type SongCardProps = {
    song: Song;
}

function SongCard({ song }: SongCardProps) {
    return (
        <div className="bg-surface border border-line rounded-lg overflow-hidden">
            <Cover 
                src={song.coverUrl}
                title={song.title}
                className="w-full aspect-square"
                />

            <div className="px-4 py-3">
                <h2 className="font-display text-lg text-chalk truncate">
                    {song.title}
                </h2>
                <p className="text-fog text-sm mt-1 truncate">{song.artist}</p>

                {song.year && (
                    <p className="text-fog text-xs mt-1">{song.year}</p>
                )}
            </div>
        </div>

        
    )
}

export default SongCard;