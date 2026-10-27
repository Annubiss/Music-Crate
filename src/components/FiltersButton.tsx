import { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import FilterSection from "./FilterSectionProps";
import { getGenres } from "../api/musicbrainz";


type Status = "loading" | "error" | "success"

function FiltersButton() {
    const [isOpen, setIsOpen] = useState(false)
    const [genres, setGenres] = useState<string[]>([])
    const [status, setStatus] = useState<Status>("loading")
    const [isListOpen, setIsListOpen] = useState(false)

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

    return (
        <>
            <Button variant="secondary" onClick={() => setIsOpen(true)}>
                Filter
            </Button>

            {isOpen && (
                <Modal title="Filters" onClose={() => setIsOpen(false)}>
                    <FilterSection title="Genre">

                        <div className="relative">
                            <div className="flex border border-line rounded-lg focus-within:border-accent">
                                <input 
                                    aria-label="Add a genre"
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
                                {genres.map(g => (
                                    <li key={g} className="capitalize text-sm px-4 py-2">
                                        {g}
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
            )}
            </div>
                    </FilterSection>
                </Modal>
            )}
        </>
    )
}

export default FiltersButton