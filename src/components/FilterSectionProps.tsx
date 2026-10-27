import { useState } from "react";
import type { ReactNode } from "react";

type FilterSectionProps = {
    title: string;
    children: ReactNode;
}

function FilterSection({title, children}: FilterSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section>
            <button
                type="button"
                onClick={() => setIsExpanded(prev => !prev)}
                className={"flex items-center gap-1 py-2 text-sm text-fog hover:text-accent focus-visible:text-accent " + 
                    "outline-none cursor-pointer transition-colors"}
            >
                {title}
                <span
                    className={"inline-block transition-transform " + (isExpanded ? "rotate-180" : "")}
                >
                    ▾
                </span>
            </button>

            {isExpanded && (
                <div className="pt-2 pb-4">
                    {children}
                </div>
            )}
        </section>
    )
}

export default FilterSection