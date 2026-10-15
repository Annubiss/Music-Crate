import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
}

const base = "px-4 py-2 rounded-lg text-sm font-medium transition-colors"

const variants: Record<ButtonVariant, string> = {
    primary: "bg-accent text-ink hover:brightness-110",
    secondary:"border border-line text-fog hover:text-chalk hover:border-fog"
};

function Button({children, onClick, variant = "primary"} : ButtonProps) {
    return (
        <button onClick={onClick} className={`${base} ${variants[variant]}`}>
            {children}
        </button>
    );
}

export default Button;