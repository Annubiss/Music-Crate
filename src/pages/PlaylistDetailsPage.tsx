import { useParams } from "react-router";
import { usePlaylists } from "../context/PlaylistsContext";

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
        </div>
    )
}

export default PlaylistDetailsPage