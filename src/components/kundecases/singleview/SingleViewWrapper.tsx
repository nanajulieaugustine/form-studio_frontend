"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCases } from "@/hooks/useCases";
import { Case } from "@/types/cases";

const SingleViewWrapper = () => {
    const params = useParams<{ id: string }>();
    const { getCaseById } = useCases();
    const [caseItem, setCaseItem] = useState<Case | null>(null);

    useEffect(() => {
        const id = params?.id;

        if (!id) return;

        const loadCase = async () => {
            const item = await getCaseById(id);
            setCaseItem(item);
        };

        loadCase();
    }, [getCaseById, params?.id]);

    if (!caseItem) {
        return <article>Henter case...</article>;
    }

    const serviceNames = Array.isArray(caseItem.service)
        ? caseItem.service.map((service) => service.name)
        : caseItem.service
            ? [caseItem.service.name]
            : caseItem.services?.map((service) => service.name) ?? [];

    return (
        <article>
            <h1>{caseItem.name}</h1>
            <p>{caseItem.problem_statement}</p>
            {serviceNames.length > 0 && (
                <ul>
                    {serviceNames.map((serviceName) => (
                        <li key={`${caseItem.id}-${serviceName}`}>{serviceName}</li>
                    ))}
                </ul>
            )}
        </article>
    );
};

export default SingleViewWrapper;