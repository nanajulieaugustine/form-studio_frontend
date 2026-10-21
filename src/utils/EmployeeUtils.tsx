"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/types/employees";
import { useEmployees } from "@/hooks/useEmployees";

export function sortByIndex<T extends { id: string | number }>(items: T[]): T[] {
    return [...items].sort((first, second) => {
        const firstIndex = parseInt(String(first.id).slice(0, 2), 10);
        const secondIndex = parseInt(String(second.id).slice(0, 2), 10);

        return firstIndex - secondIndex;
    });
}

export function useEmployeeData(enabled = true) {
    const { getEmployees } = useEmployees();

    const [employees, setemployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!enabled) {
            setLoading(false);
            return;
        }

        const fetchCases = async () => {
            setLoading(true);

            const data = await getEmployees();

            if (data) {
                setemployees(sortByIndex(data));
            }

            setLoading(false);
        };

        fetchCases();
    }, [enabled, getEmployees]);

    return {
        employees,
        loading,
    };
}