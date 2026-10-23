"use client";

import { useState, useEffect } from "react";
import { Case } from "@/types/cases";
import { useCases } from "@/hooks/useCases";
import { useParams } from "next/navigation";
import { useScrollProgress } from "@/hooks/useScrollprogress";

export function ScrollToCategory() {
    const { id } = useParams<{ id: string }>();
    const { getCaseById } = useCases();

    const [caseItem, setCaseItem] = useState<Case | null>(null);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [isProblemStatementActive, setIsProblemStatementActive] = useState(false);

    const categories = caseItem?.categories ?? [];
    const hasProblemStatement = Boolean(caseItem?.problem_statement);

    const itemCount = categories.length + Number(hasProblemStatement);

    const imageItemCount = Math.max(itemCount, 1);

    const {sectionRef, scrollProgress, activeIndex, scrollToIndex,} = useScrollProgress(itemCount);

    // HENT CASE
    useEffect(() => {
        let cancelled = false;

        async function loadCase() {
            setCaseItem(null);
            setActiveCategoryId(null);
            setIsProblemStatementActive(false);

            const result = await getCaseById(id);

            if (!cancelled) {
                setCaseItem(result);
            }
        }

        loadCase();

        return () => {
            cancelled = true;
        };
    }, [id, getCaseById]);

    // SYNKRONISER AKTIVT INDHOLD MED SCROLL
    useEffect(() => {
        if (!caseItem || itemCount === 0) {
            setActiveCategoryId(null);
            setIsProblemStatementActive(false);
            return;
        }

        if (hasProblemStatement && activeIndex === 0) {
            setIsProblemStatementActive(true);
            setActiveCategoryId(null);
            return;
        }

        const categoryIndex = activeIndex - Number(hasProblemStatement);

        const category = categories[categoryIndex];

        if (category?.description_id) {
            setIsProblemStatementActive(false);
            setActiveCategoryId(category.description_id);
        }
    }, [caseItem, categories, itemCount, hasProblemStatement, activeIndex,]);

    // VÆLG PROBLEMFORMULERING
    const handleSelectProblemStatement = () => {
        if (!caseItem?.problem_statement) {
            return;
        }

        setIsProblemStatementActive(true);
        setActiveCategoryId(null);

        scrollToIndex(0);
    };

    // VÆLG KATEGORI
    const handleSelect = (categoryId: string) => {
        const index = categories.findIndex((category) => category.description_id === categoryId);

        if (index === -1) {
            return;
        }

        setActiveCategoryId(categoryId);
        setIsProblemStatementActive(false);

        scrollToIndex(index + Number(hasProblemStatement));
    };

    if (!caseItem) {
        return <article>Indlæser case...</article>;
    }

    // AKTIV KATEGORI
    const activeCategory = categories.find((category) => category.description_id === activeCategoryId) ?? null;

    const activeCategoryIndex = categories.findIndex((category) => category.description_id === activeCategoryId);

    // AKTIVT BILLEDE OG INDEKS
    const activeItemIndex = isProblemStatementActive ? 0: Math.max(activeCategoryIndex, 0) + Number(hasProblemStatement);

    const activeImage = isProblemStatementActive? caseItem.thumbnail: activeCategory?.image;

    const activeImageAlt = isProblemStatementActive? caseItem.name: activeCategory?.name ?? "";

    return {
        sectionRef,
        activeImageAlt,
        caseItem,
        categories,
        itemCount,
        scrollProgress,
        activeIndex,
        isProblemStatementActive,
        activeCategoryId,
        activeImage,
        imageItemCount,
        activeItemIndex,
        handleSelect,
        handleSelectProblemStatement,
    };
}