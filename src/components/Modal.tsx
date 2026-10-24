import type { ReactNode } from "react"
import { useEffect } from "react"

type ModalProps = {
    title: string;
    onClose: () => void;
    children: ReactNode;
}


function Modal({title, onClose, children}: ModalProps) {

    useEffect(() => {
        function handleKey(event: KeyboardEvent){
            if(event.key == "Escape"){
                onClose()
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose])

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60"
            />
            <div
                className="relative w-full max-w-md bg-surface border border-line rounded-xl p-6"
            >
                <h2 className="font-display text-2xl tracking-wide mb-4">
                    {title}
                </h2>
                {children}
            </div>

        
        </div>
    )
}

export default Modal