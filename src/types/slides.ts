import { ReactNode } from 'react';
import { Employee } from './employees';

export type Slide = {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    videoUrl?: string;
};

export type PointerEventsProps<T extends { id: string | number }> = {
    slides: T[];
    currentSlide: number;
    setCurrentSlide: (slide: number) => void;
};

export type EmployeeKarruselProps = {
    employees?: Employee[];
};

export type AnimatedCarouselProps<T> = {
    slides: T[];
    currentSlide: number;
    renderSlide: (slide: T, index: number) => ReactNode;
    className?: string;
    duration?: number;
};
