
"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { CaseDescriptionViewProps } from "@/types/categories";

const CaseDescriptionView = ({image, imageAlt, scrollProgress, activeItemIndex, itemCount,}: CaseDescriptionViewProps) => {

    const imageY = useTransform(scrollProgress, [activeItemIndex / itemCount, (activeItemIndex + 1) / itemCount], ["0", "-100%"]);

    if (!image) {
        return null;
    }

    return (
        <article className="relative h-full w-full overflow-hidden">

            <motion.div
                key={image}
                className="absolute aspect-4/2.25 inset-0"
                style={{ y: imageY }}
            >
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                />
            </motion.div>

        </article>
    );
};

export default CaseDescriptionView;
