"use client";

import Image from "next/image";
import { easeInOut, motion, useTransform,} from "framer-motion";
import { AnimatedImageProps, ImageAnimationYAxisProps } from "@/types/animations";


const IMAGE_HEIGHT = 100;
const IMAGE_GAP = 50;
const IMAGE_STEP = IMAGE_HEIGHT + IMAGE_GAP;

const AnimatedImage = ({item, index, itemCount, scrollProgress,}: AnimatedImageProps) => {

    // udregning af animation via. index
    const lastIndex = itemCount - 1;

    const totalTravel = Math.max(lastIndex * IMAGE_STEP, IMAGE_HEIGHT);

    const center = (index * IMAGE_STEP) / totalTravel;

    const start = Math.max(0, (index * IMAGE_STEP - IMAGE_HEIGHT) / totalTravel);

    const end = Math.min(1, (index * IMAGE_STEP + IMAGE_HEIGHT) / totalTravel);

    const y = useTransform( scrollProgress, [0, 1],[`${index * IMAGE_STEP}%`, `${index * IMAGE_STEP - lastIndex * IMAGE_STEP}%`]);

    // animation værdier
    const opacity = useTransform( scrollProgress, itemCount === 1 ? [0, 1] : index === 0? [0, end] : index === lastIndex ? [start, 1] : [start, center, end], itemCount === 1 ? [1, 1] : index === 0 ? [1, 0] : index === lastIndex ? [0, 1] : [0, 1, 0]);

    const scale = useTransform( scrollProgress, itemCount === 1 ? [0, 1] : index === 0 ? [0, end] : index === lastIndex ? [start, 1]: [start, center, end], itemCount === 1 ? [1, 1] : index === 0 ? [1, 0.75]  : index === lastIndex ? [0.75, 1] : [0.75, 1, 0.75], { ease: easeInOut });

    if (!item.image) return null;

    return (
        <motion.div className="absolute inset-0" style={{y, opacity, scale}}>
        <div className="flex items-center justify-center w-full h-full">
        <Image
            src={item.image}
            alt="Beskrivelse"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-contain"
        />
        </div>
        </motion.div>
    );
};

const ImageAnimationYAxis = ({items, scrollProgress,}: ImageAnimationYAxisProps) => {
    
    if (items.length === 0) return null;

    return (
        <article className="relative h-full w-full overflow-hidden">
            {items.map((item, index) => (
                <AnimatedImage
                    key={`${item.image ?? "empty"}-${index}`}
                    item={item}
                    index={index}
                    itemCount={items.length}
                    scrollProgress={scrollProgress}/>
            ))}
        </article>
    );
};

export default ImageAnimationYAxis;