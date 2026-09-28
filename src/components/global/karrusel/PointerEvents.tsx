
import ArrowRight from "../icons/arrowRight";
import { PointerEventsProps } from "@/types/slides";


const PointerEvents = ({slides, currentSlide, setCurrentSlide,}: PointerEventsProps) => {

    const totalSlides = slides.length;

    const previousSlide = () => {
        if (totalSlides === 0) return;
        setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
    };

    const nextSlide = () => {
        if (totalSlides === 0) return;
        setCurrentSlide((currentSlide + 1) % totalSlides);
    };

    return (
        <div className="flex gap-5">
            <div className="rotate-180">
                <ArrowRight
                    onClick={previousSlide}
                    size={30}
                    color="foreground"
                />
            </div>

            <span>
                {currentSlide + 1}/{totalSlides}
            </span>
            <ArrowRight
                onClick={nextSlide}
                size={30}
                color="foreground"
            />

        </div>
    );
};

export default PointerEvents;