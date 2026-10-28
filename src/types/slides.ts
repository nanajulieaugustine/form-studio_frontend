import { ReactNode } from 'react';
import { Employee } from './employees';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

// slides
export type Slide = {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    videoUrl?: string;
};

// pointer events
export type PointerEventsProps<T extends { id: string | number }> = {
    slides: T[];
    currentSlide: number;
    setCurrentSlide: (slide: number) => void;
};

// employee
export type EmployeeKarruselProps = {
    employees?: Employee[];
};

// animated carousel
export type AnimatedCarouselProps<T> = {
    slides: T[];
    currentSlide: number;
    renderSlide: (slide: T, index: number) => ReactNode;
    className?: string;
    duration?: number;
};

// push card carousel
export type PushCardCarouselProps<T> = {
    slides: T[];
    currentSlide: number;
    setCurrentSlide: Dispatch<SetStateAction<number>>;
    renderSlide: (slide: T, index: number) => ReactNode;
    className?: string;
    duration?: number;
};