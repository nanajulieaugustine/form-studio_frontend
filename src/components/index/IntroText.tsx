"use client";

import { easeInOut, motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.5,
        },
    },
};

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -8,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: easeInOut,
        },
    },
};

const IntroText = () => {
    return (
        <article className="p-5 flex flex-col items-center top-10 relative md:-top-30 w-full">
            <h4 className="mb-5 ml-2 md:ml-6 w-full max-w-300">løsninger i samarbejde med jer</h4>
            <motion.h3
                className="heading-1-size italic w-full max-w-300"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5 }}
            >
                Her finder{" "}
                <motion.span
                    className="inline-block"
                    variants={wordVariants}
                >
                    kreativitet
                </motion.span>{" "}
                og{" "}
                <motion.span
                    className="inline-block"
                    variants={wordVariants}
                >
                    strategi
                </motion.span>{" "}
                fælles{" "}
                <motion.span
                    className="inline-block"
                    variants={wordVariants}
                >
                    form
                </motion.span>
            </motion.h3>
        <video
            src="/background-long-form.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute left-0 top-0 -z-100 h-screen w-screen object-cover blur-xl"
            />
        <p className="mt-30 max-w-[60ch] w-full mx-auto">Vi arbejder tæt sammen med vores kunder som en del af deres team og skaber en rød tråd på tværs af platforme og medier. Hos Form-Studio får du derfor én kreativ samarbejdspartner, der både kan udvikle idéen, producere indholdet og sikre, at brandet lever videre, så I slipper for at gentage jeres tanker og risikere at miste retning. <br/> <br/> Når vi har alfeveret jeres produkt, afsluttes vores samarbejde ikke. Vi drifter, dokumenterer, rapporterer og vedligeholder, så vi kan vækste jeres virksomhed og analysere hvad, der skaber resultater, for netop jer.</p>
        </article>
    );
};

export default IntroText;