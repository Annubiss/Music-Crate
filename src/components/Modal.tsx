import type { ReactNode } from "react"
import { useEffect, useId, useRef, useState } from "react"

const FOCUSABLE = "button:not([disabled]), input:not([disabled]), a[href], select, textarea"

type ModalProps = {
    title: string;
    onClose: () => void;
    children: ReactNode;
}


function Modal({title, onClose, children}: ModalProps) {
    const titleId = useId()
    const dialogRef = useRef<HTMLDivElement>(null)
    const [ opener ] = useState(() => document.activeElement)

    useEffect(() => {
        function handleKey(event: KeyboardEvent){
            if(event.key == "Escape"){
                onClose()
            }
            if(event.key === "Tab") {
                const dialog = dialogRef.current
                if (!dialog) return

                const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE)

                if (focusable.length === 0) return

                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                const current = document.activeElement

                if (event.shiftKey && (current === first || current === dialog)) {
                    event.preventDefault()
                    last.focus()
                } else if (!event.shiftKey && current === last) {
                    event.preventDefault()
                    first.focus()
                }
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose])

    useEffect(() => {
        const dialog = dialogRef.current

        if( dialog && !dialog.contains(document.activeElement)){
            dialog.focus()
        }
        return () => {
            if(opener instanceof HTMLElement) opener.focus()
        }
    }, [opener])

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60"
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                ref={dialogRef}
                tabIndex={-1}
                className="relative w-full max-w-md bg-surface border border-line rounded-xl p-6 outline-none"
            >
                <h2 id={titleId} className="font-display text-2xl tracking-wide mb-4">
                    {title}
                </h2>
                {children}
            </div>

        
        </div>
    )
}

export default Modal