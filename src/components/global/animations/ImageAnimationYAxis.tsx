"use client";

import Image from "next/image";
import {
    motion,
    useTransform,
    type MotionValue,
} from "framer-motion";

type ImageItem = {
    image: string | null;
    imageAlt: string;
};

type AnimatedImageProps = {
    item: ImageItem;
    index: number;
    itemCount: number;
    scrollProgress: MotionValue<number>;
};

type ImageAnimationYAxisProps = {
    items: ImageItem[];
    scrollProgress: MotionValue<number>;
};

const IMAGE_HEIGHT = 100;
const IMAGE_GAP = 50;
const IMAGE_STEP = IMAGE_HEIGHT + IMAGE_GAP;

const AnimatedImage = ({
    item,
    index,
    itemCount,
    scrollProgress,
}: AnimatedImageProps) => {
    const start = Math.max(
        0,
        (index * IMAGE_STEP - IMAGE_HEIGHT) /
            (itemCount * IMAGE_HEIGHT)
    );

    const center =
        (index * IMAGE_STEP) /
        (itemCount * IMAGE_HEIGHT);

    const end = Math.min(
        1,
        (index * IMAGE_STEP + IMAGE_HEIGHT) /
            (itemCount * IMAGE_HEIGHT)
    );

    const y = useTransform(
        scrollProgress,
        [0, 1],
        [
            `${index * IMAGE_STEP}%`,
            `${index * IMAGE_STEP - itemCount * IMAGE_HEIGHT}%`,
        ]
    );

    const opacity = useTransform(
        scrollProgress,
        index === 0
            ? [0, 1 / itemCount]
            : [start, center, end],
        index === 0 ? [1, 0] : [0, 1, 0]
    );

    if (!item.image) return null;

    return (
        <motion.div
            className="absolute inset-0"
            style={{
                y,
                opacity,
            }}
        >
            <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
            />
        </motion.div>
    );
};

const ImageAnimationYAxis = ({
    items,
    scrollProgress,
}: ImageAnimationYAxisProps) => {
    if (items.length === 0) return null;

    return (
        <article className="relative h-full w-full overflow-hidden">
            {items.map((item, index) => (
                <AnimatedImage
                    key={`${item.image ?? "empty"}-${index}`}
                    item={item}
                    index={index}
                    itemCount={items.length}
                    scrollProgress={scrollProgress}
                />
            ))}
        </article>
    );
};

export default ImageAnimationYAxis;