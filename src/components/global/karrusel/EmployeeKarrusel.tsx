
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PointerEvents from "./PointerEvents";
import PushCardCarousel from "./PushCardCarousel";
import Button from "../Button";
import { useEmployeeData } from "@/utils/EmployeeUtils";
import type { EmployeeKarruselProps } from "@/types/slides";

const EmployeeKarrusel = ({employees: selectedEmployees,}: EmployeeKarruselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const {employees: allEmployees, loading,} = useEmployeeData(selectedEmployees === undefined);

    // Sørg for, at slides altid er et array.
    const slides = selectedEmployees ?? allEmployees ?? [];

    // Brug ID'er til at opdage ændringer i medarbejderlisten.
    const employeeIds = slides.map(({ id }) => id).join(",");

    useEffect(() => {
        setCurrentSlide(0);
    }, [employeeIds]);

    // Vent kun, hvis medarbejderne skal hentes fra hooken.
    if (selectedEmployees === undefined && loading) {
        return (
            <p role="status">Indlæser medarbejdere...</p>
        );
    }

    if (slides.length === 0) {
        return null;
    }

    return (
        <article  className="relative flex w-full items-end justify-center overflow-hidden pb-14"
            aria-label="Medarbejdere"
            aria-roledescription="karrusel">

            <PushCardCarousel
                slides={slides}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                renderSlide={(employee) => (
                    <div className="flex justify-end gap-2.5">
                        <div className="flex min-w-0 flex-col">
                            <h5>{employee.name}</h5>

                            {(employee.positions ?? employee.position) && (
                                <p>{employee.positions ?? employee.position}</p>
                            )}

                            <div className="mt-auto justify-end-safe">
                                {employee.portfolio && (<p>{employee.portfolio}</p>)}
                            </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-3">
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
                                        role="img"
                                        aria-label={`Intet billede tilgængeligt for ${employee.name}`}
                                    />
                                )}
                            </div>
                            <Button type="primary" use="href" href={`mailto:${employee.mail}`}>Kontakt</Button>
                        </div>
                    </div>
                )}/>

            {slides.length > 1 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <PointerEvents
                        slides={slides}
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}/>
                </div>
            )}
        </article>
    );
};

export default EmployeeKarrusel;
