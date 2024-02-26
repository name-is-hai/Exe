import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export interface CurrencyInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ className, type, value, ...props }, ref) => {

        const numberFormat = (value) =>
            new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);

        const inputRef = useRef<HTMLInputElement>(null);

        const formatValue = (inputValue: string) => {
            const parsedValue = parseFloat(inputValue.replace(/[^0-9.-]/g, ""));
            return numberFormat(parsedValue);
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!isNaN(parseFloat(event.target.value))) {
                event.target.value = formatValue(event.target.value);
            } else {
                event.target.value = "";
            }
        };

        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref || inputRef}
                value={value ? formatValue(value.toString()) : ""}
                onChange={handleChange}
                {...props}
            />
        );
    }
);

CurrencyInput.displayName = "CurrencyInput";