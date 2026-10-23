
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedCarouselProps } from "@/types/slides";

const AnimatedCarousel = <T,>({slides, currentSlide, renderSlide, className = "",  duration = 0.5,}: AnimatedCarouselProps<T>) => {
    const shouldReduceMotion = useReducedMotion();

    const previousSlide = useRef(currentSlide);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const totalSlides = slides.length;

        if (totalSlides <= 1 || currentSlide === previousSlide.current) {
            previousSlide.current = currentSlide;
            return;
        }

        const forwardDistance = (currentSlide - previousSlide.current + totalSlides) % totalSlides;

        setDirection(forwardDistance <= totalSlides / 2 ? 1 : -1);

        previousSlide.current = currentSlide;
    }, [currentSlide, slides.length]);

    if (slides.length === 0 || currentSlide < 0 || currentSlide >= slides.length) {
        return null;
    }

    const transition = {
        duration: shouldReduceMotion ? 0 : duration,
        ease: "easeInOut" as const,
    };

    return (
        <div
            className={`relative min-w-0 overflow-hidden ${className}`}
            aria-live="polite"
            aria-atomic="true">
        <motion.div
            className="flex w-full"
            animate={{
                x: `${-currentSlide * 100}%`,
            }}
            transition={transition}>
            {slides.map((slide, index) => (
                <motion.div
                    key={index}
                    className="w-full min-w-0 shrink-0"
                    animate={{
                        opacity: index === currentSlide ? 1 : 0,
                    }}
                    transition={{
                        opacity: {
                            duration: shouldReduceMotion ? 0 : duration,
                            ease: "easeInOut",
                        },
                    }}
                    aria-hidden={index !== currentSlide}
                    inert={index !== currentSlide}>
                    {renderSlide(slide, index)}
                </motion.div>
            ))}
        </motion.div>

        </div>
    );
};

export default AnimatedCarousel;
