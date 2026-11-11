import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    label?: string;
    pressed?: boolean;
}

export type ButtonSize = "md" | "sm" | "sPageSave" | "icon"

const base = "text-sm font-medium transition active:scale-95 cursor-pointer"

const variants: Record<ButtonVariant, string> = {
    primary: "bg-accent text-on-accent hover:brightness-110",
    secondary: "bg-surface border border-fog/50 text-chalk hover:border-fog",
    danger: "bg-danger hover:border-fog hover:brightness-125"
};

const sizes: Record<ButtonSize, string> = {
    md: "px-4 py-2 text-sm min-w-24 text-center rounded-lg",
    sm: "px-2 py-2 text-xs min-w-20 text-center rounded-lg",
    sPageSave: "px-9 text-xl min-w-16 text-center h-full",
    icon: "w-9 h-9 flex items-center justify-center rounded-lg"
}

function Button({children, onClick, variant = "primary", size = "sm", label, pressed} : ButtonProps) {
    return (
        <button type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            aria-pressed={pressed}
            className={`${base} ${sizes[size]} ${variants[variant]}`}>
            {children}
        </button>
    );
}

export default Button;