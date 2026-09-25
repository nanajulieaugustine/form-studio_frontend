"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/products";

export function useServices() {
    const { getProducts } = useProducts();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const data = await getProducts();

            if (data) {
                setProducts(data);
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