import { MotionValue } from "motion";

export type ImageAnimationXAxisProps = {
    image: string | null | undefined;
    imageAlt: string;
    scrollProgress: MotionValue<number>;
    activeItemIndex: number;
    itemCount: number;
};

export type ImageItem = {
    image: string | null;
    imageAlt: string;
};

export type AnimatedImageProps = {
    item: ImageItem;
    index: number;
    itemCount: number;
    scrollProgress: MotionValue<number>;
};

export type ImageAnimationYAxisProps = {
    items: ImageItem[];
    scrollProgress: MotionValue<number>;
};