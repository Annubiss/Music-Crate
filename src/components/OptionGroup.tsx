import Button from "./Button";

type Option = {
    value: string;
    label: string;
}

type OptionGroupProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

function OptionsGroup({options, value, onChange}: OptionGroupProps) {
    const selected = value ? value.split(",") : []

    function toggle(option: string) {
        const next = selected.includes(option)
            ? selected.filter(v => v !== option)
            : [...selected, option]

            onChange(next.join(","))
    }

    return (
        <div>
            {options.map(option => (
                <Button
                    key={option.value}
                    variant={selected.includes(option.value) ? "primary" : "secondary"}
                    onClick={() => toggle(option.value)}
                >
                    {option.label}
                </Button>
            ))}
        </div>
    )
}

export default OptionsGroup