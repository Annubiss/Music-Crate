import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import OptionsGroup from "./OptionGroup"


const options = [
    {value: "album", label: "Album"},
    {value: "ep", label: "EP"},
    {value: "single", label: "Single"},
]

describe("OptionGroup", () => {
    it("Shows a button for every option", () => {
        render(<OptionsGroup options={options} value="" onChange={() => {}} />)

        expect(screen.getByRole("button", {name: "Album" })).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "EP" })).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "Single" })).toBeInTheDocument()
    })

    it("Marks only the chosen options as pressed", () => {
        render(<OptionsGroup options={options} value="album,ep" onChange={() => {}}/>)

        expect(screen.getByRole("button", {name: "Album"})).toHaveAttribute("aria-pressed", "true")
        expect(screen.getByRole("button", {name: "EP" })).toHaveAttribute("aria-pressed", "true")
        expect(screen.getByRole("button", {name: "Single"})).toHaveAttribute("aria-pressed", "false")
    })
})