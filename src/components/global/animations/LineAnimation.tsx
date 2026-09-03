"use client";
import { motion } from "framer-motion";
import { LineAnimationType } from "../../../types/globals";

const LineAnimation = ({ isHovered, isActive = false, color }: LineAnimationType) => {
  const isVisible = isHovered || isActive;

  return (
    <motion.span
      initial={false}
      animate={{
        scaleX: isVisible ? 1 : 0,
        rotate: isActive ? -2 : 0,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ backgroundColor: color, transformOrigin: "left center" }}
      className="block h-1 w-full"
    />
  );
};

export default LineAnimation;