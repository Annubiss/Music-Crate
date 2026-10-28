import {useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import type { Album } from "../types"
import type { Song } from "../types"
import { searchAlbums, searchSongs } from "../api/musicbrainz"
import AlbumCard from "../components/AlbumCard"
import Button from "../components/Button"
import AlbumRow from "../components/AlbumRow"
import AlbumCardSkeleton from "../components/AlbumCardSkeleton"
import SongCard from "../components/SongCard"
import SongRow from "../components/SongRow"
import FiltersButton from "../components/FiltersButton"
import type { Filters } from "../types"
import { buildQuery } from "../lib/query"


type viewMode = "grid" | "list"
type Status = "idle" | "loading" | "error" | "success"
type SearchMode = "albums" | "songs"

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const mode: SearchMode = searchParams.get("mode") === "songs" ? "songs" : "albums"
  const view: viewMode = searchParams.get("view") === "list" ? "list" : "grid"
  const query = searchParams.get("q") ?? ""

  const filters: Filters = {
    genre: searchParams.get("genre") ?? ""
  }

  const fullQuery = buildQuery(query, filters)
  const hasFilters = Object.values(filters).some(value => value !== "")

  const [albums, setAlbums] = useState<Album[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const resultCount = mode == "albums" ? albums.length : songs.length

  function updateParam(key: string, value: string, replace = false) {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      if(value === ""){
        params.delete(key)
      } else {
        params.set(key, value)
      }
      return params
    }, {replace})
  }

  function setMode(next: SearchMode){
    updateParam("mode", next)
  }

  function setView(next: viewMode){
    updateParam("view", next)
  }

  function setQuery(next: string) {
    updateParam("q", next, true)
  }

  async function runSearch(term: string, searchMode: SearchMode) {
    const trimmed = term.trim()

    if(trimmed === "") {
      setStatus("idle")
      setAlbums([])
      setSongs([])
      return;
    }

    setStatus("loading")

    try {
      if(searchMode == "albums") {
        setAlbums(await searchAlbums(trimmed))
      } else {
        setSongs(await searchSongs(trimmed))
      }
      setStatus("success")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }


  useEffect(() => {
    const timer = setTimeout(() => runSearch(fullQuery, mode), 500)
    return () => clearTimeout(timer) 
}, [fullQuery, mode])

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
        
        </form>


        <div className="flex gap-2 mb-8">
          <Button
            variant={mode == "albums" ? "primary" : "secondary"}
            onClick={() => setMode("albums")}
            >
              Albums
            </Button>

            <Button
              variant={mode == "songs" ? "primary" : "secondary"}
              onClick={() => setMode("songs")}
              >
                Songs
            </Button>
            <FiltersButton filters={filters} onChange={updateParam}/>
        </div>




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
              <Button onClick={() => runSearch(fullQuery, mode)}>Try again</Button>
            </div>
          </div>
        )}
        {status === "success" && resultCount === 0 && (
          <div className="text-center py-12">
            <p className="text-chalk">{query.trim() !== "" ? `No results for "${query.trim()}"` : "No results"}</p>
            <p className="text-fog text-sm mt-1">
              {hasFilters ? "Try removing some filters" : "Check the typing or try another name"}
            </p>
          </div>  
        )}
        {status === "success" && mode == "albums" && resultCount > 0 && (
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

        {status == "success" && mode == "songs" && resultCount > 0 && (
          view == "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {songs.map(song => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {songs.map(song => (
                <SongRow key={song.id} song={song}/>
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