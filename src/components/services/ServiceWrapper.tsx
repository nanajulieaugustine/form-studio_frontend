"use client";

import GetServices from "../global/getServices";
import ServiceView from "./ServiceView";
import { useScrollToService } from "@/utils/useScrollToService";

const ServiceWrapper = () => {
    const {sectionRef, handleSelect, products, activeProductId, activeProduct, loading,} = useScrollToService();

    if (loading) {
        return <p>Henter services...</p>;
    }

    return (
        <article
            ref={sectionRef}
            className="relative"
            style={{height: `${products.length * 100}vh`,}}>
            <div className="sticky top-5 md:top-30 h-screen">
                <div className="relative flex h-full flex-col gap-10 md:flex-row md:gap-0">

                    {/* Baggrund på venstre side */}
                    <div aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-0 hidden md:block md:fixed md:inset-y-0 md:left-0 md:right-auto md:w-[calc(50%-1px)]"
                        style={{ background: `linear-gradient(to right, var(--primary-color) 0%, var(--background) 100%) `,}}/>

                    {/* Serviceliste */}
                    <div className="relative z-10 min-w-0 md:w-1/2 md:shrink-0">
                        <GetServices activeProductId={activeProductId} onSelect={handleSelect}/>
                    </div>

                    {/* Vertikal skillelinje */}
                    <div aria-hidden="true" className="pointer-events-none hidden md:block absolute inset-y-0 left-1/2 z-20 border-l border-(--foreground)"/>

                   {/* ServiceView: følger sidens scroll */}
                    <div className="relative min-w-0 flex-1 md:absolute md:inset-y-0 md:left-[calc(50%+50px)] md:right-0">
                        <div className="h-120 w-full md:h-full">
                            <ServiceView product={activeProduct} />
                        </div>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default ServiceWrapper;