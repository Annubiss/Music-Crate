import { useCollection } from "../context/CollectionContext"
import AlbumCard from "../components/AlbumCard"
import { useState } from "react"

type SortMode = "recent" | "title" | "artist"

function CollectionPage() {
    const { albums } = useCollection()
    const sortedAlbums = [...albums]
    const [sort, setSort] = useState<SortMode>("recent")

    if(sort == "recent") {
        sortedAlbums.reverse()
    } else if(sort == "title") {
        sortedAlbums.sort((a, b) => a.title.localeCompare(b.title))
    } else {
        sortedAlbums.sort((a, b) => a.title.localeCompare(b.title))
    }

    return (

        <div className="py-8">
            <h1 className="font-display text-4xl tracking-wide mb8">
                Collection
            </h1>

            {albums.length > 0 && (
                <p className="text-fog text-sm mt-2">
                    {albums.length} {albums.length == 1 ? "album" : "albums"}
                </p>
            )}

            {albums.length > 0 && (
                <div className="flex items-center gap-2 mb-6">
                    <label htmlFor="sort" className="text-fog text-sm">
                        Sort by
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={e => setSort(e.target.value as SortMode)}
                        className={"bg-surface border border-line rounded-lg px-3 py-0.3 text-sm text-chalk " +
                        "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus:visible:outline-accent"}
                        >
                            <option value="recent">Recently saved</option>
                            <option value="title">Title</option>
                            <option value="artist">Artist</option>

                    </select>
                </div>
            )}

            {albums.length == 0 && (
                <div className="text-center py-16">
                    <p className="font-display text-2xl text-chalk">
                        No saved albums
                    </p>
                    <p className="text-fog text-sm mt-2">
                        Search for an album and press the Save button to keep it in here
                    </p>
                </div>
            )}
            {albums.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedAlbums.map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CollectionPage