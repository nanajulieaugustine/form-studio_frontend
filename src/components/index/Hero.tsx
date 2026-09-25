"use client";

import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

const Hero = () => {
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Gradient
    const gradientY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "-50%"]
    );

    const gradientScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 2]
    );

    // Logo / intro
    // const logoY = useTransform(
    //     scrollYProgress,
    //     [0, 1],
    //     ["0%", "-35%"]
    // );

    // Heading
    // const headingY = useTransform(
    //     scrollYProgress,
    //     [0, 1],
    //     ["0%", "50%"]
    // );

    return (
        <article
            ref={heroRef}
            className="relative h-[200vh]"
        >
            {/* PINNED VIEWPORT */}
            <div className="sticky top-0 h-screen overflow-hidden bg-[#2a2a2a]">

                {/* Gradient */}
                <motion.div
                    style={{
                        y: gradientY,
                        scale: gradientScale,
                    }}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-[85vw]
                        h-[85vw]
                        pointer-events-none
                    "
                >
                    <div
                        className="w-full h-full animate-pulse"
                        style={{
                            background: `
                                radial-gradient(
                                    circle,
                                    var(--primary-color) 20%,
                                    rgba(52, 52, 52, 0) 55%,
                                    rgba(32, 32, 32, 0) 95%
                                )
                            `,
                        }}
                    />
                </motion.div>

                {/* Logo / intro */}
                <motion.div
                    style={{
                        // y: logoY,
                    }}
                    className="absolute left-8 bottom-21 z-10"
                >
                    <p className="max-w-120 mb-5">
                        Vi, hos Form-Studio stræber efter at kende
                        jeres brand ud og ind, og arbejder prioriteret
                        på at udvikle og forbedre jeres visuelle
                        tilstedeværelse på tværs af platforme.
                    </p>

                    <Image
                        src="/logo_white.svg"
                        alt="logo"
                        width={450}
                        height={150}
                        priority
                    />
                </motion.div>

                {/* WHITE BOX */}
                <motion.div
                      className="
                       hidden md:block
                        absolute
                        -right-50
                        top-1/2
                        w-190
                        h-75
                        bg-white
                    "
                    style={{
                        y: useTransform(
                            scrollYProgress,
                            [0, 1],
                            ["0%", "-50%"]
                        ),
                    }}
                />

                {/* Heading */}
                <motion.div
                    style={{
                        // y: headingY,
                    }}
                    className="absolute right-10 top-5 z-30"
                >
                    <h1 className="heading-3-size max-w-130">
                        Visuel tilstedeværelse fra strategi til eksekvering
                    </h1>
                </motion.div>

            </div>
        </article>
    );
};

export default Hero;