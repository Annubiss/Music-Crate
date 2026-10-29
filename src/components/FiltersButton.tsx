import { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import FilterSection from "./FilterSectionProps";
import { getGenres } from "../api/musicbrainz";
import type { Filters, SearchMode } from "../types"
import OptionsGroup from "./OptionGroup";


type Status = "loading" | "error" | "success"

const TYPE_OPTIONS = [
    { value: "album", label: "Album"},
    { value: "ep", label: "EP"},
    { value: "single", label: "Single"},
]

type FilterButtonProps = {
    filters: Filters;
    onChange: (key: keyof Filters, value: string) => void;
    mode: SearchMode;
}

function FiltersButton({ filters, onChange, mode }: FilterButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [genres, setGenres] = useState<string[]>([])
    const [status, setStatus] = useState<Status>("loading")
    const [isListOpen, setIsListOpen] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if(!isOpen) return

        async function load() {
            try {
                setGenres(await getGenres())
                setStatus("success")
            } catch (err) {
                console.error(err)
                setStatus("error")
            }
        }

        load()
    }, [isOpen])


    const selected = filters.genre ? filters.genre.split(",") : []
    const term = search.trim().toLocaleLowerCase()
    const visibleGenres = genres.filter(g => g.includes(term) && !selected.includes(g))

    function addGenre(genre: string) {
        const next = [...selected, genre].sort().join(",")

        onChange("genre", next)
        setSearch("")
        setIsListOpen(false)
    }

    function handleEnter() {
        if(term === "") return

        if(selected.includes(term)) {
            setSearch("")
            return
        }

        if(genres.includes(term)) {
            addGenre(term)
        } else {
            setIsListOpen(true)
        }
    }

    function removeGenre(genre: string) {
        const next = selected.filter(g => g !== genre).join(",")

        onChange("genre", next)
    }

    const active: string[] = []
    if( selected.length > 0 ) active.push("Genres")
    if( mode === "albums" && filters.type !== "") active.push("Type")
    
        const buttonLabel = active.length > 0 ? `Filter: ${active.join(", ")}` : "Filter"

    return (
        <>
            <Button variant="secondary" onClick={() => setIsOpen(true)}>
                {buttonLabel}
            </Button>

            {isOpen && (
                <Modal title="Filters" onClose={() => setIsOpen(false)}>
                    <FilterSection title="Genre">

                        <div className="relative">
                            <div className="flex border border-line rounded-lg focus-within:border-accent">
                                <input 
                                    aria-label="Add a genre"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyDown={e => {
                                        
                                        if(e.key == "Enter") handleEnter()
                                    }}
                                    placeholder="Add a genre"
                                    className="flex-1 min-w-0 bg-transparent px-4 py-2 placeholder:text-fog focus:outline-none" 
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsListOpen(prev => !prev)}
                                    aria-label={isListOpen ? "Hide genres" : "Show genres"}
                                    aria-expanded={isListOpen}
                                    className="px-3 text-fog hover:text-chalk cursor-pointer"
                                >
                                    <span
                                        className={"inline-block transition-transform " + (isListOpen ? "rotate-180" : "")}    
                                    >
                                        ▾
                                    </span>
                                </button>
                            </div>

                        {isListOpen && (
                            <div
                                className={"absolute left-0 right-0 top-full mt-1 z-10 bg-surface border border-line " +
                                    "rounded-lg max-h-60 overflow-y-auto"}
                            >

                        {status === "loading" && (
                            <p className="text-fog text-sm px-4 py-2">Loading genres...</p>
                        )}

                        {status === "error" && (
                            <p className="text-sm text-fog px-4 py-2">Genres could not be loaded, please try again</p>
                        )}

                        {status === "success" && (
                            <ul>
                                {visibleGenres.map(g => (
                                    <li key={g} className="capitalize text-sm px-4 py-2">
                                        {g}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {status === "success" && visibleGenres.length === 0 && (
                            <p>
                                No genres match "{search.trim()}"
                            </p>
                        )}
                        </div>
                            )}
                        </div>

                        {selected.length > 0 && (
                            <ul className="flex flex-wrap gap-2 mt-3">
                                {selected.map(g => (
                                    <li 
                                        key={g}
                                        className={"flex items-center gap-1 bg-accent text-ink rounded-full pl-3 " +
                                            "pr-1 py-1 text-sm"}
                                    
                                    >
                                        <span className="capitalize">{g}</span>

                                        <button
                                            type="button"
                                            onClick={() => removeGenre(g)}
                                            aria-label={`Remove ${g}`}
                                            className="w-5 h-5 rounded-full hover:bg-black/20 cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </FilterSection>
                    {mode === "albums" && (
                    <FilterSection title="Type">
                        <OptionsGroup 
                            options={TYPE_OPTIONS}
                            value={filters.type}
                            onChange={value => onChange("type", value)}
                        />
                    </FilterSection>
                    )}
                </Modal>
            )}
        </>
    )
}

export default FiltersButton