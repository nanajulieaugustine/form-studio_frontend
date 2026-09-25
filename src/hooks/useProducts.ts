"use client";

import { useCallback } from "react";
import { Product } from "@/types/products";

export function useProducts() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1";

    //////////////////////////////////////
    //       GET ALL PRODUCTS          //
    ////////////////////////////////////

    const getProducts = useCallback(async (): Promise<Product[] | null> => {
        try {
            const response = await fetch(`${baseUrl}/services`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                return null;
            }

            const data: Product[] = await response.json();

            return data;
        } catch {
            return null;
        }
    }, [baseUrl]);


    //////////////////////////////////////
    //       GET PRODUCT BY ID         //
    ////////////////////////////////////

    const getProductById = useCallback(
        async (id: string): Promise<Product | null> => {
            try {
                const response = await fetch(`${baseUrl}/services/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    return null;
                }

                const data: Product = await response.json();

                return data;
            } catch {
                return null;
            }
        },
        [baseUrl]
    );

    return {
        getProducts,
        getProductById,
    };
}