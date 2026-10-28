"use client";

import { motion } from "framer-motion";
import { ButtonType } from "../../types/globals";

const Button = ({ children, type, use, href, onClick }: ButtonType) => {

    const backgroundColor = type === "primary" ? "var(--secondary-color)" : "var(--primary-color)";

    const hoverColor = type === "primary" ? "var(--primary-color)" : "var(--secondary-color)";

    const textColor = type === "primary" ? "var(--background)" : "var(--foreground)";

    const content = (
        <>
            <motion.span
                className="absolute inset-0"
                style={{background: `linear-gradient( 90deg, transparent 0%, ${hoverColor} 50%, transparent 100%)`, }}
                variants={{
                    rest: {
                        x: "-100%",
                    },
                    hover: {
                        x: "-50%",
                    },
                }}
                transition={{duration: 0.5, ease: "easeInOut",}}/>
            <span className="relative z-10">{children}</span>
        </>
    );

    const className = "relative hover:scale-105 transition-all duration-500 overflow-hidden cursor-pointer rounded-full py-2 px-6";
    const style = { backgroundColor, color: textColor };

    if (href) {
        return (
            <motion.a
                href={href}
                className={`inline-block ${className}`}
                style={style}
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={use === "submit" ? "submit" : "button"}
            className={className}
            style={style}
            onClick={onClick}
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            {content}
        </motion.button>
    );
};

export default Button;
