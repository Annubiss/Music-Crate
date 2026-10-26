import { usePlaylists } from "../context/PlaylistsContext";
import { useState } from "react";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Link } from "react-router";


function PlaylistsPage() {
    const { playlists, create } = usePlaylists()
    const [newName, setNewName] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    function handleCreate() {
        const trimmed = newName.trim()

        if (trimmed == "") return

        create(trimmed)
        setNewName("")
    }

    return (
        <div className="py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
            <div>
                <h1 className="font-display text-4xl tracking-wide">
                    Playlists
                </h1>

                {playlists.length > 0 && (
                    <p className="text-fog text-sm mt-2">
                        {playlists.length}{" "}
                        {playlists.length == 1 ? "playlist" : "playlists"}
                    </p>
                )}
            </div>
            <Button onClick={() => setIsCreating(true)}>
                Add playlist
            </Button>
            </div>

            {playlists.length > 0 &&(
                <ul className="flex flex-col gap-2">
                    {playlists.map(playlist => (
                        <li
                            key={playlist.id}
                            className="bg-surface border border-line rounded-lg hover:border-fog transition-colors"
                        >
                            <Link to={`/playlists/${playlist.id}`} className="block p-3 cursor-pointer">
                                <h2 className="font-display text-lg text-chalk truncate">
                                    {playlist.name}
                                </h2>
                            </Link>
                        </li>
                     ))}
                </ul>
            )}

            {isCreating && (
                <Modal title="New Playlist" onClose={() => setIsCreating(false)}>
                        <form
                            onSubmit={e =>{ e.preventDefault()
                                handleCreate()
                            }}
                            className="flex gap-2 mb-8"
                        >
                            <input
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="New playlist name"
                                className={"flex-1 bg-surface border border-line rounded-lg px-4 py-2 placeholder:text-fog " + 
                                        "focus-visible:outline-accent"}
                            
                            />
                            <Button onClick={handleCreate}>Create</Button>
                        </form>
                    </Modal>
            )}
        
        </div>
    )
}

export default PlaylistsPage