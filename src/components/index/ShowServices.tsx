"use client";

import Link from "next/link";
import GetServices from "../global/getServices";
import ArrowRight from "../global/icons/arrowRight";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useServices } from "@/utils/productUtils";

const ShowServices = () => {
    const { products, loading } = useServices();

    const sectionRef = useRef<HTMLDivElement>(null);

    const [activeProductId, setActiveProductId] = useState<number | null>(null);

    useEffect(() => {
        if (products.length > 0 && activeProductId === null) {
            setActiveProductId(products[0].id);
        }
    }, [products, activeProductId]);

    useEffect(() => {
        if (!products.length) return;

        const handleScroll = () => {
            const section = sectionRef.current;

            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const scrollDistance = section.offsetHeight - viewportHeight;

            if (scrollDistance <= 0) return;

            const scrolled = Math.min(Math.max(-rect.top, 0), scrollDistance);

            const progress = scrolled / scrollDistance;

            const index = Math.min(Math.floor(progress * products.length), products.length - 1);

            const product = products[index];

            if (
                product &&
                product.id !== activeProductId
            ) {
                setActiveProductId(product.id);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true, });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [products, activeProductId]);

    const handleSelect = (id: number) => {
        const index = products.findIndex(
            (product) => product.id === id
        );

        if (index === -1) return;

        setActiveProductId(id);

        const section = sectionRef.current;

        if (!section) return;

        const viewportHeight = window.innerHeight;

        const scrollDistance = section.offsetHeight - viewportHeight;

        const progress = products.length === 1 ? 0 : index / (products.length - 1);

        const targetScroll = section.offsetTop + scrollDistance * progress;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });
    };

    const activeProduct = products.find(
        (product) => product.id === activeProductId
    );

    if (loading) {
        return <p>Henter services...</p>;
    }

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{
                height: `${products.length * 100}vh`,
            }}
        >
            <div className="sticky top-5 md:top-30 h-screen">
                <article className="flex h-full flex-col gap-10 md:flex-row md:gap-35">
                    <div>
                        <GetServices
                            activeProductId={activeProductId}
                            onSelect={handleSelect}
                        />
                    </div>

                    <div>
                        <div className="relative h-120 w-80 overflow-hidden">
                            {activeProduct?.thumbnail_video && (
                                <Image
                                    src={
                                        activeProduct.thumbnail_video
                                    }
                                    fill
                                    alt={activeProduct.name}
                                    className="object-cover"
                                />
                            )}
                        </div>

                        <div className="group flex items-center gap-2">
                            <Link href="/services">
                                læs mere om{" "}
                                {activeProduct?.name}
                            </Link>

                            <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                                <ArrowRight
                                    size={25}
                                    color="var(--foreground)"
                                />
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default ShowServices;