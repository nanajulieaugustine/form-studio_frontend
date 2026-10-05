"use client";
import { configCases } from "@/utils/casesUtils";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "../global/icons/arrowRight";
import { CaseCardProps } from "@/types/cases";

const CaseCard = ({ selectedService }: CaseCardProps) => {
    const { cases } = configCases();
    
    const selectedServiceId = selectedService !== null && selectedService !== undefined ? String(selectedService) : null;

    const filteredCases = selectedServiceId ? cases.filter((item) => {
            const services = Array.isArray(item.service) ? item.service : item.service
                    ? [item.service] : item.service ?? [];

            return services.some((service) => String(service.id) === selectedServiceId);
        }) : cases;

    if (filteredCases.length === 0) {
        return (
            <div className="flex items-center justify-center h-100">
                    <div>
                        <h4>Der er desværre ingen cases på din valgte kategori i øjeblikket...</h4>
                        <p>Er du interesseret i at høre mere om denne service?</p>
                        {/* TODO: indsæt kontakt os form her*/}
                    </div>
                </div>
        );
    }

    return (
        <ul className="relative flex flex-col">
            {filteredCases.map((item, index) => {
                const serviceNames = Array.isArray(item.service)
                    ? item.service.map((service) => service.name)
                    : item.service
                        ? [item.service.name]
                        : item.services?.map((service) => service.name) ?? [];

                const imageSrc = item.thumbnail ?? "";

                return (
                    <li
                        key={item.id}
                        className={`relative w-fit ${
                            index % 2 === 0 ? "self-start" : "self-end"
                        }`}
                    >
                        <div className="relative h-100 w-170 overflow-hidden">
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="h-full w-full bg-gray-200" />
                            )}

                            <div className="absolute inset-0 bg-black/30" />
                        </div>

                        <h2 className="absolute bottom-10 left-0 z-10 text-white">
                            {item.name}
                        </h2>

                        <div className="flex items-baseline gap-5">
                            {serviceNames.map((serviceName) => (
                                <h4 key={`${item.id}-${serviceName}`}>
                                    {serviceName}
                                </h4>
                            ))}

                            <div className="group flex items-center gap-2">
                                <Link href={`/kundecases/${item.id}`}>
                                    Se kundecase
                                </Link>

                                <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                                    <ArrowRight
                                        size={25}
                                        color="var(--foreground)"
                                    />
                                </span>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default CaseCard;