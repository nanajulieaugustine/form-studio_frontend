"use client";
import GetServices from "../global/getServices";
import { useState, useEffect} from "react";
import ServiceView from "./ServiceView";
import { useServices } from "@/utils/productUtils";

const ServiceWrapper = () => {
    const { products, loading } = useServices();

    const [activeProductId, setActiveProductId] = useState<number | null>(null);
    const activeProduct = products.find(
        (product) => product.id === activeProductId
    ) ?? null;

        useEffect(() => {
            if (products.length > 0 && activeProductId === null) {
                setActiveProductId(products[0].id);
            }
        }, [products, activeProductId]);
    
   const handleSelect = (id: number) => {
        const index = products.findIndex(
            (product) => product.id === id
        );

        if (index === -1) return;

        setActiveProductId(id);

    };

    return ( 
        <article className="relative flex md:min-h-[calc(100vh-8.75rem)] flex-1 flex-col">
            <div className="relative flex flex-col gap-10 md:flex-row flex-1 justify-between">

            <div className="relative isolate flex flex-col md:fixed md:bottom-0 md:left-10 md:top-35 md:w-[calc(55%-2.5rem)] md:overflow-y-auto">
             <div
                        aria-hidden="true"
                        className="hidden md:block pointer-events-none absolute inset-0 z-0 md:fixed md:inset-y-0 md:left-0 md:right-auto md:w-[calc(55%-2.5rem)]"
                        style={{
                            background: `
                                linear-gradient(
                                    to right,
                                    var(--primary-color) 0%,
                                    var(--background) 100%
                                )
                            `,
                        }}
                    />
             <div className="relative z-10">
             <GetServices
                            activeProductId={activeProductId}
                            onSelect={handleSelect}
                        />
             </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none w-full border-t border-(--foreground) md:absolute md:inset-y-0 md:left-1/2 md:w-0 md:border-t-0 md:border-l"
            />

            <div className=" md:ml-[55%] md:h-[calc(100vh-8.75rem)] md:w-1/2 md:overflow-y-auto md:overscroll-contain">
                <ServiceView product={activeProduct} />
            </div>
            </div>
        </article>
     );
}
 
export default ServiceWrapper;