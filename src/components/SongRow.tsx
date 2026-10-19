import type { Song } from "../types"
import Cover from "./Cover"

type SongRowProps = {
    song: Song;
}

function SongRow({ song }: SongRowProps) {
    return (
        <div className="flex items-center gap-4 bg-surface border border-line rounded-lg p-3">
            <Cover 
                src={song.coverUrl}
                title={song.title}
                className="w-14 h-14 rounded shrink-0"
                letterClassName="text-xl"
            />

            <div className="min-w-0">
                <h2 className="font-display text-lg text-chalk truncate">
                    {song.title}
                </h2>
                <p className="text-fog text-sm truncate">{song.artist}</p>
                {song.year && (
                    <p className="text-fog text-xs ml-auto shrink-0">{song.year}</p>
                )}
            </div>
        </div>
    )
}

export default SongRow