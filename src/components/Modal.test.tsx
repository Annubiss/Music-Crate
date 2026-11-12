import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import { useState } from "react";
import userEvent from "@testing-library/user-event"
import Modal from "./Modal";

function ModalHarness() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open</button>

            {isOpen && (
                <Modal title="Test dialog" onClose={() => setIsOpen(false)}>
                    <button>First</button>
                    <button>Last</button>
                </Modal>
            )}
        </>
    )
}

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

    it("Moves focus into the dialog when it opens", async () => {
        const user = userEvent.setup()
        render(<ModalHarness />)

        await user.click(screen.getByRole("button", {name: "Open"}))

        expect(screen.getByRole("dialog")).toHaveFocus()
    })

    it("Keeps Tab inside the dialogue", async () => {
        const user = userEvent.setup()

        render(<ModalHarness />)

        await user.click(screen.getByRole("button", { name: "Open"}))
        
        await user.tab()

        expect(screen.getByRole("button", {name: "Close"})).toHaveFocus()

        await user.tab()
        expect(screen.getByRole("button", {name: "First"})).toHaveFocus()

        await user.tab()
        expect(screen.getByRole("button", {name: "Last"})).toHaveFocus()

        await user.tab()
        expect(screen.getByRole("button", {name: "Close"})).toHaveFocus()
    })

    it("Keeps Shift+Tab inside the dialogue", async () => {
        const user = userEvent.setup()
        render(<ModalHarness />)

        await user.click(screen.getByRole("button", {name: "Open"}))

        await user.tab({ shift: true })

        expect(screen.getByRole("button", {name: "Last"})).toHaveFocus()
    })

    it("Return focus to the button that opened it", async () => {
        const user = userEvent.setup()
        render(<ModalHarness />)
        await user.click(screen.getByRole("button", { name: "Open"}))

        await user.keyboard("{Escape}")

        expect(screen.getByRole("button", {name: "Open"})).toHaveFocus()
    })
})