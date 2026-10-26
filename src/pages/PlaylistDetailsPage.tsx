import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { usePlaylists } from "../context/PlaylistsContext";
import SongRow from "../components/SongRow";
import { formatTotalDuration } from "../lib/format";
import Button from "../components/Button";
import Modal from "../components/Modal";

function PlaylistDetailsPage() {
    const { id } = useParams()
    const { playlists, remove } = usePlaylists()
    const navigate = useNavigate()
    const [isConfirming, setIsConfirming] = useState(false)

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

    const totalMs = playlist.songs.reduce(
        (sum, song) => sum + (song.durationMs ?? 0), 0
    )

    const handleDelete = () => {
        remove(playlist.id)
        navigate("/playlists", {replace: true})
    }

    return (
        <div className="py-8">
            <div className="mb-8 flex items-center justify-between gap-4">
            <div>
            <h1 className="font-display text-4xl tracking-wide">
                {playlist.name}
            </h1>

            {playlist.songs.length > 0 && (
                <p className="text-fog text-sm mt-2">
                    {playlist.songs.length}{" "}
                    {playlist.songs.length == 1 ? "song" : "songs"}
                    {totalMs > 0 && ` · ${formatTotalDuration(totalMs)}`}
                </p>
            )}
            </div>
                <Button
                    variant="secondary"
                    label="Delete playlist"
                    onClick={() => setIsConfirming(true)}
                >
                    Delete
                </Button>
            </div>

            {playlist.songs.length > 0 && (
                <ul className="flex flex-col gap-2">
                    {playlist.songs.map(song => (
                        <li>
                            <SongRow song={song} />
                        </li>
                    ))}
                </ul>
            )}

            {playlist.songs.length == 0 && (
                <div className="text-center py-16">
                    <p className="font-display text-2xl">
                        This playlist is empty
                    </p>
                    <p className="text-fog text-sm mt-2">
                        Search for a song and press + to add it here
                    </p>
                </div>
            )}

            {isConfirming && (
                <Modal title="Delete playlist?" onClose={() => setIsConfirming(false)}>
                    <p className="text-fog text-sm mb-6">
                        "{playlist.name} will be deleted. This can't be undone"
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => setIsConfirming(false)}>
                            Cancel
                        </Button>
                        <Button variant="saved" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </Modal>
            )}

        </div>
    )
}

export default PlaylistDetailsPage