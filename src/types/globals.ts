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
    children?: string
    color: string
    size: number
}