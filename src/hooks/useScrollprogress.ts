"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue } from "motion/react";

export function useScrollProgress(itemCount: number) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const scrollProgress = useMotionValue(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {

            const section = sectionRef.current;

            if (!section || itemCount <= 0) {
                scrollProgress.set(0);
                setActiveIndex(0);
                return;
            }

            const scrollDistance = section.offsetHeight - window.innerHeight;

            const progress = scrollDistance <= 0 ? 1 : Math.min(Math.max( -section.getBoundingClientRect().top / scrollDistance, 0), 1);

            scrollProgress.set(progress);

            const index = Math.min(Math.floor(progress * itemCount), itemCount - 1);

            setActiveIndex((current) => current === index ? current : index);
        };

        window.addEventListener("scroll", handleScroll, {passive: true,});
        
        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [itemCount, scrollProgress]);

    const scrollToIndex = useCallback(
        (index: number) => {
            const section = sectionRef.current;

            if (!section || itemCount <= 0) return;

            const safeIndex = Math.max( 0, Math.min(index, itemCount - 1));

            const scrollDistance = section.offsetHeight - window.innerHeight;

            const progress = safeIndex / itemCount;

            const target = window.scrollY + section.getBoundingClientRect().top + scrollDistance * progress;

            window.scrollTo({top: target,  behavior: "smooth",});
        },
        [itemCount]
    );

    return {
        sectionRef,
        scrollProgress,
        activeIndex,
        scrollToIndex,
    };
}