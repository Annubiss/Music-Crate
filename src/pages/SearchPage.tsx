import {useEffect, useState } from "react"
import type { SubmitEvent } from "react"
import type { Album } from "../types"
import { searchAlbums } from "../api/musicbrainz"
import AlbumCard from "../components/AlbumCard"
import Button from "../components/Button"
import AlbumRow from "../components/AlbumRow"
import AlbumCardSkeleton from "../components/AlbumCardSkeleton"

type viewMode = "grid" | "list"
type Status = "idle" | "loading" | "error" | "success"

function SearchPage() {
  const [view, setView] = useState<viewMode>("grid")

  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState<Album[]>([])
  const [status, setStatus] = useState<Status>("idle")


  async function runSearch(term: string) {
    const trimmed = term.trim()

    if(trimmed === "") {
      setStatus("idle")
      setAlbums([])
      return;
    }

    setStatus("loading")

    try {
      const results = await searchAlbums(trimmed)
      setAlbums(results)
      setStatus("success")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }


  useEffect(() => {
    const timer = setTimeout(() => runSearch(query), 500)
    return () => clearTimeout(timer) 
}, [query])


  async function handleSearch(e: SubmitEvent) {
    e.preventDefault()

    if(query.trim() === "") return;

    setStatus("loading")

    try {
      const results = await searchAlbums(query)
      setAlbums(results)
      setStatus("success")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
      <div className="py-8">
        <h1 className="font-display text-4xl tracking-wide mb-8">Crate</h1>

        <form onSubmit={e => e.preventDefault()} className="flex gap-2 mb-4">
          <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search artist or album"
          className="flex-1 bg-surface border border-line rounded-lg px-4 py-2 text-chalk placeholder:text-fog focus:outline-none focus:border-accent"
          />
          <Button>Search</Button>
        </form>


        {status === "idle" && (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-chalk">
              Search for something to listen to
            </p>
            <p className="text-fog text-sm mt-2">
              Write the name of an artist, album or song.
            </p>
          </div>
        )}

        {status === "loading" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <AlbumCardSkeleton key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-12">
            <p className="text-chalk">Results not loaded</p>
            <p className="text-fog text-sm mt-1">Check the connection and try again</p>
            <div className="mt-4">
              <Button onClick={() => runSearch(query)}>Try again</Button>
            </div>
          </div>
        )}
        {status === "success" && albums.length === 0 && (
          <div className="text-center py-12">
            <p className="text-chalk">No results for "{query}"</p>
            <p className="text-fog text-sm mt-1">
              Check the typing or try another name
            </p>
          </div>  
        )}
        {status === "success" && albums.length > 0 && (
          view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
          ) : (
            <div className="space-y-2">
              {albums.map(album => (
                <AlbumRow key={album.id} album={album} />
              ))}
            </div>
          )
        )}


       

        <Button variant="secondary" onClick={() => setView(view ==="grid" ? "list" : "grid")}>
          Switch to {view === "grid" ? "list" : "grid"} 
        </Button>
      </div>
    )
}

export default SearchPage