"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Button from "../global/Button";
import { BurgerMenuType, headerType } from "@/types/navigation";

const BurgerMenu = ({ isVisible, toggleSideMenu }: BurgerMenuType) => {
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const li: headerType = [
    { name: "Forside", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Kundecases", href: "/kundecases" },
    { name: "Om Os", href: "/om-os" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed top-0 left-0 pt-25 w-full h-screen bg-(--primary-color) z-500 overflow-y-scroll"
        >
 
          <ul className="p-10 overflow-y-auto grid">
            {li.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="py-3 hover:scale-105 flex items-center justify-center transition-all duration-300"
                  onMouseEnter={() => setHoveredLink(idx)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={item.href}
                    onClick={toggleSideMenu}
                    onFocus={() => setHoveredLink(idx)}
                    onBlur={() => setHoveredLink(null)}
                    className="inline-block relative"
                  >
                    <span className="text-(--foreground)">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
            <div className="mt-auto py-5 flex justify-center">
            <Button
              type="primary"
              use="onClick"
              onClick={toggleSideMenu}
            >
              Kontakt os
            </Button>
            </div>
          </ul>


        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BurgerMenu;