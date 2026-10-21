"use client";

import { useCallback } from "react";
import { Employee } from "@/types/employees";

export function useEmployees() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1";

    //////////////////////////////////////
    //       GET ALL EMPLOYEES          //
    ////////////////////////////////////

    const getEmployees = useCallback(async (): Promise<Employee[] | null> => {
        try {
            const response = await fetch(`${baseUrl}/employees`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                return null;
            }

            const data: Employee[] = await response.json();

            return data;
        } catch {
            return null;
        }
    }, [baseUrl]);

    return {
        getEmployees,
    };
}