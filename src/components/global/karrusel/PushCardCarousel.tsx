
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PushCardCarouselProps } from "@/types/slides";

const PushCardCarousel = <T,>({slides, currentSlide, setCurrentSlide, renderSlide, className = "", duration = 0.7,}: PushCardCarouselProps<T>) => {
    const shouldReduceMotion = useReducedMotion();

    if (slides.length === 0) return null;

    return (
        <section className={`relative w-full overflow-hidden ${className}`} aria-label="Kortkarrusel">
            <motion.div
                className="flex w-max gap-[10vw]"
                animate={{x: `-${currentSlide * 68}vw`,}}
                transition={{
                    duration: shouldReduceMotion ? 0 : duration,
                    ease: [0.22, 1, 0.36, 1],
                }}>
                {slides.map((slide, index) => (
                    <motion.div
                        key={index}
                        className="w-[58vw] shrink-0"
                        animate={{opacity: index === currentSlide ? 1 : 0.8,}}
                        transition={{
                            duration: shouldReduceMotion ? 0 : duration,
                            ease: "easeInOut",
                        }}
                        aria-hidden={index !== currentSlide}
                        inert={index !== currentSlide}>
                        {renderSlide(slide, index)}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default PushCardCarousel;
