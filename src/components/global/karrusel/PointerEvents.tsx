
import { MdArrowRightAlt } from "react-icons/md";
import { PointerEventsProps } from "@/types/slides";

const PointerEvents = <T extends { id: string | number }>({slides, currentSlide, setCurrentSlide,}: PointerEventsProps<T>) => {

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
        <nav className="flex items-center gap-5" aria-label="Karruselkontroller">
            <button type="button" className="inline-flex transition-transform duration-300 ease-out hover:-translate-x-0.5 cursor-pointer" onClick={previousSlide} aria-label="Forrige element">
                <MdArrowRightAlt className="rotate-180" size={30} aria-hidden="true" />
            </button>

            <span aria-live="polite" aria-atomic="true">
                {currentSlide + 1} af {totalSlides}
            </span>

            <button type="button" className="inline-flex transition-transform duration-300 ease-out hover:translate-x-0.5 cursor-pointer" onClick={nextSlide} aria-label="Næste element">
                <MdArrowRightAlt size={30} aria-hidden="true" />
            </button>

        </nav>
    );
};

export default PointerEvents;