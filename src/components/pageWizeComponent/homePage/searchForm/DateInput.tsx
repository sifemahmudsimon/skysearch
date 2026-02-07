import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

interface Props {
    name: string;
    label: string;
    control: any;
    minDate?: Date;
    disabled?: boolean;
    rules?: any; // <-- accept rules here
}

export default function DateInput({ name, label, control, minDate, disabled, rules }: Props) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules} // <-- pass rules to Controller
            render={({ field, fieldState }) => {
                const value: Date | null = field.value instanceof Date
                    ? field.value
                    : field.value
                        ? new Date(field.value)
                        : null;

                return (
                    <DatePicker
                        label={label}
                        value={value || null}
                        onChange={(date) => field.onChange(date)}
                        minDate={minDate}
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: !!fieldState.error,
                                helperText: fieldState.error?.message,
                            },
                        }}
                    />
                );
            }}
        />
    );
}
