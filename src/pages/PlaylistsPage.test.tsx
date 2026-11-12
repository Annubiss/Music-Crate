import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { PlaylistsProvider } from "../context/PlaylistsContext";
import PlaylistsPage from "./PlaylistsPage";

function renderPage() {
    return render(
        <MemoryRouter>
            <PlaylistsProvider>
                <PlaylistsPage />
            </PlaylistsProvider>
        </MemoryRouter>
    )
}

describe("PlaylistsPage", () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it("Creates a playlist and shows it in the page", async () => {
        const user = userEvent.setup()

        renderPage()

        await user.click(screen.getByRole("button", {name: "Add playlist"}))
        await user.type(screen.getByRole("textbox", {name: "Playlist name"}), "Gym")
        await user.click(screen.getByRole("button", {name: "Create"}))

        expect(screen.getByRole("link", {name: "Gym"})).toBeInTheDocument
    })

    it("Does not crate a playlist without a name", async () =>{
        const user = userEvent.setup()
        renderPage()

        await user.click(screen.getByRole("button", {name: "Add playlist"}))
        await user.type(screen.getByRole("textbox", {name: "Playlist name"}), "  ")
        await user.click(screen.getByRole("button", {name: "Create"}))

        expect(screen.queryByRole("link")).not.toBeInTheDocument()
    })

    it("Keeps playlists after the page is opened again", async() => {
        const user = userEvent.setup()
        const { unmount } = renderPage()

        await user.click(screen.getByRole("button", {name: "Add playlist"}))
        await user.type(screen.getByRole("textbox", {name: "Playlist name"}), "Gym")
        await user.click(screen.getByRole("button", {name: "Create"}))

        unmount()

        renderPage()

        expect(screen.getByRole("link", {name: "Gym"})).toBeInTheDocument()

    })
})