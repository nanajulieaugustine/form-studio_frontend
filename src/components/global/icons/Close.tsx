"use client";

import { motion } from "framer-motion";

type MenuButtonType = {
    isOpen: boolean
    onClick: () => void
}

const MenuButton = ({ isOpen, onClick }: MenuButtonType) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="relative w-8 h-8 cursor-pointer"
            aria-label={isOpen ? "Luk menu" : "Åbn menu"}
            aria-expanded={isOpen}
        >
            <motion.span
                className="absolute z-1000 left-1/2 top-1/2 block h-px w-7 bg-(--foreground)"
                style={{ transformOrigin: "center" }}
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -5,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
            />

            <motion.span
                className="absolute left-1/2 top-1/2 block h-px w-7 bg-(--foreground)"
                style={{ transformOrigin: "center" }}
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 4,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                }}
            />
        </button>
    );
};

export default MenuButton;