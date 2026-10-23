
"use client";

import { useEffect, useState } from "react";
import { ServiceViewProps } from "@/types/products";
import PointerEvents from "../global/karrusel/PointerEvents";
import AnimatedCarousel from "../global/karrusel/AnimatedCarousel";
import { sortByIndex } from "@/utils/productUtils";

const ServiceView = ({ product }: ServiceViewProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = sortByIndex(product?.service_undercategories ?? []);

    useEffect(() => {
        setCurrentSlide(0);
    }, [product?.id]);

    return (
        <div className="flex flex-col gap-5">
            {/* Animeret overskrift */}
            <AnimatedCarousel
                slides={slides}
                currentSlide={currentSlide}
                className="overflow-hidden"
                duration={0.5}
                renderSlide={(undercategory) => (
                    <h3>{undercategory.name}</h3>
                )}
            />

            {/* Navigation mellem slides */}
            {slides.length > 0 && (
                <div className="flex justify-center items-end">
                    <PointerEvents
                        slides={slides}
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}
                    />
                </div>
            )}

            {/* Animeret beskrivelse */}
            <AnimatedCarousel
                slides={slides}
                currentSlide={currentSlide}
                className="overflow-hidden"
                duration={0.5}
                renderSlide={(undercategory) => (
                    <p>{undercategory.description}</p>
                )}
            />
        </div>
    );
};

export default ServiceView;
