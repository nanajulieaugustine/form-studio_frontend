"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useServices } from "@/utils/productUtils";
import { useScrollProgress } from "@/hooks/useScrollprogress";

export function useScrollToService() {
    const { products, loading } = useServices();

    const {sectionRef, scrollProgress, activeIndex, scrollToIndex,} = useScrollProgress(products.length);

    useEffect(() => {
        if (products.length === 0) return;

        const section = sectionRef.current;

        if (!section) return;
    }, [products.length, sectionRef]);

    const handleSelect = useCallback(
        (id: number) => {
            const index = products.findIndex((product) => product.id === id);

            if (index === -1) return;

            scrollToIndex(index);
        },
        [products, scrollToIndex]
    );

    const activeProduct = useMemo(() => products[activeIndex] ?? null, [products, activeIndex]);

    const activeProductId = activeProduct?.id ?? null;

    return {
        sectionRef,
        activeProductId,
        activeProduct,
        handleSelect,
        products,
        loading,
        scrollProgress,
        activeItemIndex: activeIndex,
        imageItemCount: Math.max(products.length, 1),
    };
}