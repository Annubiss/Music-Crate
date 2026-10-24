import type { Song } from "../types"
import Cover from "./Cover"
import AddToPlaylistButton from "./AddToPlaylistButton"

type SongRowProps = {
    song: Song;
}

function SongRow({ song }: SongRowProps) {
    return (
        <div className="flex items-center bg-surface border border-line rounded-lg">
            <div className="flex items-center min-w-0 flex-1 gap-4 p-2">
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
            <div className="ml-auto shrink-0 self-stretch flex">
                <AddToPlaylistButton song={song} size="sm" />
            </div>
        </div>
    )
}

export default SongRow