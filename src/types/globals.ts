export type ButtonType = {
    children: string
    type: "primary" | "secondary"
    use: "onClick" | "submit" | "href"
    href?: string
    onClick?: () => void
}

export type LineAnimationType = {
    isHovered: boolean
    isActive?: boolean
    color: string
}

export type IconTypes = {
    onClick?: () => void
    children?: string
    color: string
    size: number
}

export type SelectOption = {
  value: number | string;
  label: string;
};

export type SelectFormProps = {
  options: SelectOption[];
  placeholder?: string;
  value?: SelectOption | null;
  onChange?: (option: SelectOption | null) => void;
};