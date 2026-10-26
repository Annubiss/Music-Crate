import { useParams } from "react-router";
import { usePlaylists } from "../context/PlaylistsContext";
import SongRow from "../components/SongRow";

function PlaylistDetailsPage() {
    const { id } = useParams()
    const { playlists } = usePlaylists()

    const playlist = playlists.find(p => p.id == id)

    if(!playlist) {
        return (
            <div className="py-8">
                <h1 className="font-display text-4xl tracking-wide">
                    Playlist not found
                </h1>
            </div>
        )
    }

    return (
        <div className="py-8">
            <h1 className="font-display text-4xl tracking-wide">
                {playlist.name}
            </h1>

            {playlist.songs.length > 0 && (
                <ul className="flex flex-col gap-2 mt-8">
                    {playlist.songs.map(song => (
                        <li>
                            <SongRow song={song} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PlaylistDetailsPage