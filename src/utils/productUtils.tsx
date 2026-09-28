"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/products";

export function sortByIndex<T extends { id: string | number }>(items: T[]): T[] {
    return [...items].sort((first, second) => {
        const firstIndex = parseInt(String(first.id).slice(0, 2), 10);
        const secondIndex = parseInt(String(second.id).slice(0, 2), 10);

        return firstIndex - secondIndex;
    });
}

export function useServices() {
    const { getProducts } = useProducts();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const data = await getProducts();

            if (data) {
                setProducts(sortByIndex(data));
            }

            setLoading(false);
        };

        fetchProducts();
    }, [getProducts]);

    return {
        products,
        loading,
    };
}