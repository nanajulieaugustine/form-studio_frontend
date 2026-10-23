"use client";
import { useEffect, useState } from "react";
import PointerEvents from "./PointerEvents";
import { useEmployeeData } from "@/utils/EmployeeUtils";
import { EmployeeKarruselProps } from "@/types/slides";
import Image from "next/image";
import AnimatedCarousel from "./AnimatedCarousel";

const EmployeeKarrusel = ({ employees: selectedEmployees }: EmployeeKarruselProps) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const { employees: allEmployees, loading } = useEmployeeData(selectedEmployees === undefined);
    const slides = selectedEmployees ?? allEmployees;
    const employeeIds = slides.map(({ id }) => id).join(",");

    useEffect(() => {
        setCurrentSlide(0);
    }, [employeeIds]);


    if (selectedEmployees === undefined && loading) {
        return <p role="status">Indlæser medarbejdere...</p>;
    }

    if (!slides[currentSlide]) {
        return null;
    }

    return (
        <section className="relative flex items-end justify-center pb-14" aria-label="Medarbejdere" aria-roledescription="karrusel">
            <AnimatedCarousel
                slides={slides}
                currentSlide={currentSlide}
                className="w-full"
                duration={0.5}
                renderSlide={(employee) => (
                    <div className="flex gap-5">
                        <div>
                            <h5>{employee.name}</h5>
                            {(employee.positions ?? employee.position) && (
                                <p>{employee.positions ?? employee.position}</p>
                            )}
                            <div className="mt-auto justify-end-safe">
                                {employee.portfolio && <p>{employee.portfolio}</p>}
                            </div>
                        </div>
                        <div className="relative aspect-1/2 w-50 overflow-hidden bg-neutral-400">
                            {employee.video ? (
                                <video
                                    src={employee.video}
                                    poster={employee.profile_picture}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                    aria-label={`Video af ${employee.name}`}
                                    className="h-full w-full object-cover"
                                />
                            ) : employee.profile_picture ? (
                                <Image
                                    src={employee.profile_picture}
                                    alt={`Billede af ${employee.name}`}
                                    fill
                                    sizes="200px"
                                    className="object-cover"
                                />
                            ) : (
                                <div
                                    className="h-full w-full bg-neutral-400"
                                    aria-label={`Intet billede tilgængeligt for ${employee.name}`}
                                    role="img"
                                />
                            )}
                        </div>
                    </div>
                )}
            />

            {slides.length > 1 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <PointerEvents slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}/>
                </div>
            )}
        </section>
     );
}
 
export default EmployeeKarrusel;