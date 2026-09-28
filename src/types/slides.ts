import { ServiceUndercategory } from "./products";

export type Slide = {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    videoUrl?: string;
};

export type PointerEventsProps = {
    slides: ServiceUndercategory[];
    currentSlide: number;
    setCurrentSlide: (slide: number) => void;
};