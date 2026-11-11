import { useState } from "react";
import type { ReactNode } from "react";

type FilterSectionProps = {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

function FilterSection({title, children, defaultOpen = false}: FilterSectionProps) {
    const [isExpanded, setIsExpanded] = useState(defaultOpen)

    return (
        <section className="border-b border-line last:border-b-0">
            <button
                type="button"
                onClick={() => setIsExpanded(prev => !prev)}
                className={"flex w-full items-center gap-1 py-3 text-sm text-fog hover:text-accent focus-visible:text-accent " + 
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
                <div className="pt-2 pb-4 motion-safe:animate-slide-down">
                    {children}
                </div>
            )}
        </section>
    )
}

export default FilterSection