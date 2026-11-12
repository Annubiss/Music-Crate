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
})