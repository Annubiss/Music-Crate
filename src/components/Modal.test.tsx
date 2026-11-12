import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Modal from "./Modal";

describe("Modal", () => {
    it("is announced as a dialog named by its title", () => {
        render(<Modal title="Filters" onClose={() => {}}><p>Content</p></Modal>)

        expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument()
    })


    it("Closes when Escape is pressed", async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()
        render(<Modal title="Filters" onClose={onClose}><p>Content</p></Modal>)

        await user.keyboard("{Escape}")

        expect(onClose).toHaveBeenCalledOnce()
    })

    it("Closes when close button is clicked", async () => {
        const user = userEvent.setup()
        const onClose = vi.fn()

        render(<Modal title="Filters" onClose={onClose}><p>Content</p></Modal>)

        await user.click(screen.getByRole("button", {name: "Close"}))

        expect(onClose).toHaveBeenCalledOnce()
    })
})