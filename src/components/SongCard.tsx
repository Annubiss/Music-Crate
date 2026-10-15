import type { Song } from "../types";

type SongCardProps = {
    song: Song;
    onSelect: (song: Song) => void;
}

function SongCard({song, onSelect} : SongCardProps) {
    return (
        <div className="bg-surface px-5 py-3 border border-line rounded-lg flex flex-col gap-2" onClick={() => onSelect(song)}>
            <h2 className="text-chalk font-display text-xl">{song.title}</h2>
            <p className="text-fog text-sm">{song.artist}</p>
        </div>
    );
}

export default SongCard