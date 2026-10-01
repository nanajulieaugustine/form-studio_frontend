"use client";

import { useEffect, useState } from "react";
import { useCases } from "@/hooks/useCases";
import { Case } from "@/types/cases";

export function sortByIndex<T extends { id: string | number }>(items: T[]): T[] {
    return [...items].sort((first, second) => {
        const firstIndex = parseInt(String(first.id).slice(0, 2), 10);
        const secondIndex = parseInt(String(second.id).slice(0, 2), 10);

        return firstIndex - secondIndex;
    });
}

export function configCases() {
    const { getCases } = useCases();

    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCases = async () => {
            setLoading(true);

            const data = await getCases();

            if (data) {
                setCases(sortByIndex(data));
            }

            setLoading(false);
        };

        fetchCases();
    }, [getCases]);

    return {
        cases,
        loading,
    };
}