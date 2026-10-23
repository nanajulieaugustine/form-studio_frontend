import { MotionValue } from "motion";

export type ImageAnimationXAxisProps = {
    image: string | null | undefined;
    imageAlt: string;
    scrollProgress: MotionValue<number>;
    activeItemIndex: number;
    itemCount: number;
};