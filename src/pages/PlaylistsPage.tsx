import { usePlaylists } from "../context/PlaylistsContext";
import { useState, useEffect } from "react";
import Button from "../components/Button";

function PlaylistsPage() {
    const { playlists, create } = usePlaylists()
    const [newName, setNewName] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() =>{
        if(!isCreating) return

        function handleKey(event: KeyboardEvent) {
            if(event.key == "Escape") {
                setIsCreating(false)
            }
        }

        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [isCreating])

    function handleCreate() {
        const trimmed = newName.trim()

        if (trimmed == "") return

        create(trimmed)
        setNewName("")
    }

    return (
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

            {isCreating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        onClick={() => setIsCreating(false)}
                        className="absolute inset-0 bg-black/60"
                    />
                    <div className="relative w-full max-w-md bg-surface border border-line rounded-xl p-6">
                        <h2 className="font-display text-2xl tracking-wide mb-4">New Playlist</h2>
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlaylistsPage