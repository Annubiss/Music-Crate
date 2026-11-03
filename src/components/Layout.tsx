import { NavLink, Outlet } from "react-router"
import { useState, useEffect } from "react"

type Theme = "dark" | "light"

const navLinks =[
    { to: "/", label:"Search" },
    { to: "/genres", label: "Genres" },
    { to: "/collection", label: "Collection" },
    {to: "/playlists", label: "Playlists"},
]

const pillButton = "rounded-full border border-line bg-surface " + "px-4 py-2 text-sm text-chalk " +
                   "cursor-pointer transition-colors " + "hover:border-accent hover:text-accent " +
                   "focus-visible:outline-2 focus-visible:outline-offset-2 " +
                   "focus-visible:outline-accent"

export default function Layout() {
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState<Theme>("dark")

    useEffect(() => {
        if(!isOpen) return

        function handleKeyDown(e: KeyboardEvent) {
            if(e.key === "Escape") {
                setIsOpen(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen])

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    return (
        <div
            className={
                "transition-[padding] duration-300 " + (isOpen ? "lg:pl-72 wide:pl-0" : "")
            }>
            <button 
            type="button" 
            onClick={() => setIsOpen(true)}
            className={
                "fixed top-4 left-4 z-30 " + pillButton
                
            }>
                Menu
            </button>

            <div 
                onClick={() => setIsOpen(false)}
                className={
                    "fixed inset-0 z-40 bg-black/60 lg:hidden " +
                    "transition-opacity duration-300 " +
                    (isOpen ? "opacity-100" : "opacity-0 pointer-events-none")
                }
            />

            <aside
            inert={!isOpen}
            className={"fixed top-0 left-0 z-50 h-full w-72 " +
                       "bg-surface border-r border-line p-4 " +
                       "transition-transform duration-300 " + 
                       (isOpen ? "translate-x-0" : "-translate-x-full")}>
                <button type="button" onClick={() => setIsOpen(false)} className={pillButton}>
                    Close
                </button>

                <nav className="mt-12 flex flex-col gap-2">
                    {navLinks.map((link) =>(
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                "font-display text-4xl " +
                                "transition-colors hover:text-chalk " +
                                "focus-visible:outline-2 focus-visible:outline-offset-4 " +
                                "focus-visible:outline-accent " +
                                (isActive ? "text-accent" : "text-fog hover:text-chalk")
                            }>
                            
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <button
                    type="button"
                    role="switch"
                    aria-checked={theme === "light"}
                    aria-label="Light theme"
                    onClick={() => setTheme(prev => (prev === "dark" ? "light" : "dark"))}
                    className={"relative mt-12 w-16 h-8 rounded-full bg-line cursor-pointer " +
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    }
                >
                    <span
                        className={"absolute top-1 left-1 w-6 h-6 rounded-full bg-accent " +
                            "motion-safe:transition-transform motion-safe:duration-200 " +
                            (theme === "dark" ? "translate-x-8" : "translate-x-0")
                        }
                    />
                    <span
                        aria-hidden="true"
                        className={"absolute top-1 left-1 w-6 h-6 flex items-center justify-center " +
                            "text-sm transition-colors " + (theme === "light" ? "text-on-accent" : "text-fog")
                        }
                    >
                        ☀
                    </span>

                    <span
                        aria-hidden="true"
                        className={"absolute top-1 right-1 w-6 h-6 flex items-center justify-center " +
                            "text-sm transition-colors " + (theme === "dark" ? "text-on-accent" : "text-fog")
                        }
                    >
                        ☾
                    </span>
                </button>
            </aside>

            <main className="max-w-4xl mx-auto px-4 pt-12">

                <Outlet />
            </main>
        </div>
    )
}