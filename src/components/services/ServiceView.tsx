"use client";

import { useEffect, useState } from "react";
import { ServiceViewProps } from "@/types/products";
import PointerEvents from "../global/karrusel/PointerEvents";
import { sortByIndex } from "@/utils/productUtils";

const ServiceView = ({ product }: ServiceViewProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = sortByIndex(product?.service_undercategories ?? []);

    useEffect(() => {
        setCurrentSlide(0);
    }, [product?.id]);

    const currentUndercategory = slides[currentSlide];

    return ( 
        <div>
            <div className="flex gap-5 flex-col">
            {currentUndercategory && (
                <div className="flex flex-col gap-5" key={currentUndercategory.id}>
                    <h3>{currentUndercategory.name}</h3>
                </div>
            )}
            <div className="flex justify-center items-end">
            {slides.length > 0 && (
                <PointerEvents
                slides={slides}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                />
            )}
            </div>
            </div>
          {currentUndercategory && (
            <div className="mt-5">
                <p>{currentUndercategory.description}</p>
            </div>
          )}
        </div>
     );
}
 
export default ServiceView;