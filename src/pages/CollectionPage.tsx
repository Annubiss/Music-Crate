import { useCollection } from "../context/CollectionContext"
import AlbumCard from "../components/AlbumCard"


function CollectionPage() {
    const { albums } = useCollection()

    return (
        <div className="py-8">
            <h1 className="font-display text-4xl tracking-wide mb8">
                Collection
            </h1>

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
                    {albums.map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CollectionPage