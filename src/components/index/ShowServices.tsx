"use client";

import Link from "next/link";
import GetServices from "../global/getServices";
import ArrowRight from "../global/icons/arrowRight";
import { useScrollToService } from "@/utils/useScrollToService";
import ImageAnimationYAxis from "../global/animations/ImageAnimationYAxis";

const ShowServices = () => {
    const {sectionRef, handleSelect, products, activeProductId, activeProduct, loading, scrollProgress, activeItemIndex,imageItemCount,} = useScrollToService();

    if (loading) {
        return <p>Henter services...</p>;
    }

    return (
        <section
            ref={sectionRef}
            className="relative"
            style={{height: `${Math.max(products.length, 1) * 100}vh`,}}>
            <div className="sticky top-5 h-screen md:top-30">
                <article className="flex h-full flex-col gap-10 md:flex-row md:gap-35">
                    <div>
                        <GetServices activeProductId={activeProductId} onSelect={handleSelect}/>
                    </div>

                    <div>
                        <div className="relative h-120 w-80 overflow-hidden">
                           <ImageAnimationYAxis
                            items={products.map((product) => ({
                                image: product.thumbnail_video || null,
                                imageAlt: product.name,
                            }))}
                            scrollProgress={scrollProgress}/>
                        </div>

                        <div className="group flex items-center gap-2">
                            <Link href="/services">
                                læs mere om {activeProduct?.name}
                            </Link>

                            <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                                <ArrowRight
                                    size={25}
                                    color="var(--foreground)"/>
                            </span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default ShowServices;