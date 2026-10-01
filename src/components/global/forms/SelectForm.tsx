"use client";

import Select, { type SingleValue } from "react-select";
import { SelectFormProps, SelectOption } from "@/types/globals";
import "@/selectForm.css";

const SelectForm = ({
    options,
    placeholder = "Vælg...",
    value,
    onChange,
}: SelectFormProps) => {
    return (
        <Select<SelectOption, false>
            value={value ?? null}
            onChange={(option: SingleValue<SelectOption>) => {
                onChange?.(option ?? null);
            }}
            classNamePrefix="select-form"
            options={options}
            placeholder={placeholder}
            isClearable
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    border: "1px solid var(--foreground)",
                    borderRadius: "50px",
                    boxShadow: "none",
                    minHeight: "50px",
                    minWidth: "200px",
                    cursor: "pointer",

                    "&:hover": {
                        borderColor: "var(--foreground)",
                    },
                }),

                placeholder: (base) => ({
                    ...base,
                    color: "var(--foreground)",
                }),

                singleValue: (base) => ({
                    ...base,
                    color: "var(--foreground)",
                }),

                menu: (base) => ({
                    ...base,
                    backgroundColor: "var(--background)",
                    borderRadius: "5px",
                    marginTop: "10px",
                    overflow: "hidden",
                }),

                menuList: (base) => ({
                    ...base,
                    padding: 0,
                }),

                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                        ? "var(--secondary-color)"
                        : "var(--background)",
                    color: state.isFocused
                        ? "var(--background)"
                        : "var(--foreground)",
                    cursor: "pointer",
                    padding: "12px 16px",

                    "&:active": {
                        backgroundColor: "var(--foreground)",
                    },
                }),

                indicatorSeparator: (base) => ({
                    ...base,
                    backgroundColor: "var(--foreground)",
                }),

                dropdownIndicator: (base, state) => ({
                    ...base,
                    color: "var(--foreground)",
                    transform: state.selectProps.menuIsOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 1.2s cubic-bezier(0.20, 1, 0.3, 1)",

                    "&:hover": {
                        color: "var(--foreground)",
                    },
                }),

                clearIndicator: (base) => ({
                    ...base,
                    color: "var(--foreground)",

                    "&:hover": {
                        color: "var(--foreground)",
                    },
                }),
            }}
        />
    );
};

export default SelectForm;