"use client";

import { useCallback } from "react";
import { Case } from "@/types/cases";

export function useCases() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1";

    //////////////////////////////////////
    //       GET ALL CASES          //
    ////////////////////////////////////

    const getCases = useCallback(async (): Promise<Case[] | null> => {
        try {
            const response = await fetch(`${baseUrl}/cases`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                return null;
            }

            const data: Case[] = await response.json();

            return data;
        } catch {
            return null;
        }
    }, [baseUrl]);


    //////////////////////////////////////
    //       GET CASE BY ID         //
    ////////////////////////////////////

    const getCaseById = useCallback(
        async (id: string): Promise<Case | null> => {
            try {
                const response = await fetch(`${baseUrl}/cases/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    return null;
                }

                const data: Case = await response.json();

                return data;
            } catch {
                return null;
            }
        },
        [baseUrl]
    );

    return {
        getCases,
        getCaseById,
    };
}