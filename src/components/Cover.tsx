import { useState } from "react"

type CoverProps = {
    src? : string;
    title: string;
    className?: string;
    letterClassName?: string;
}

function Cover({
    src,
    title,
    className = "",
    letterClassName = "text-4xl"
} : CoverProps) {

    const [failed, setFailed] = useState(false)

    if(!src || failed) {
        return (
            <div className={"bg-line flex items-center justify-center " + className}>
                <span className={"font-display text-fog " + letterClassName}>
                    {title.charAt(0)}
                </span>
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={title}
            className={"object-cover bg-line " + className}
            />
    )
}
export default Cover