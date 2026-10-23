"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import { useParams } from "next/navigation";
import { useCases } from "@/hooks/useCases";
import type { Case } from "@/types/cases";

export function useScrollToCase() {
    const { id } = useParams<{ id: string }>();
    const { getCaseById } = useCases();
    const sectionRef = useRef<HTMLElement>(null);
    const scrollProgress = useMotionValue(0);
    const [caseItem, setCaseItem] = useState<Case | null>(null);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [isProblemStatementActive, setIsProblemStatementActive] = useState(false);

    useEffect(() => {
        let isCurrent = true;

        const loadCase = async () => {
            const result = await getCaseById(id);

            if (isCurrent) {
                setCaseItem(result);
                setActiveCategoryId(null);
                setIsProblemStatementActive(false);
            }
        };

        void loadCase();

        return () => {
            isCurrent = false;
        };
    }, [id, getCaseById]);

    const categories = caseItem?.categories ?? [];
    const hasProblemStatement = Boolean(caseItem?.problem_statement);
    const itemCount = categories.length + Number(hasProblemStatement);
    const imageItemCount = Math.max(itemCount, 1);

    useEffect(() => {
        if (!caseItem || activeCategoryId !== null || isProblemStatementActive) {
            return;
        }

        if (caseItem.problem_statement) {
            setIsProblemStatementActive(true);
            return;
        }

        const firstCategory = categories[0];

        if (firstCategory?.description_id) {
            setActiveCategoryId(firstCategory.description_id);
        }
    }, [caseItem, categories, activeCategoryId, isProblemStatementActive]);

    useEffect(() => {
        if (!caseItem || itemCount === 0) return;

        const handleScroll = () => {
            const section = sectionRef.current;

            if (!section) return;

            const scrollDistance = section.offsetHeight - window.innerHeight;

            if (scrollDistance <= 0) {
                scrollProgress.set(1);
                return;
            }

            const progress = Math.min(
                Math.max(-section.getBoundingClientRect().top / scrollDistance, 0),
                1
            );
            scrollProgress.set(progress);

            const index = Math.min(Math.floor(progress * itemCount), itemCount - 1);

            if (hasProblemStatement && index === 0) {
                setIsProblemStatementActive(true);
                setActiveCategoryId(null);
                return;
            }

            const category = categories[index - Number(hasProblemStatement)];

            if (category?.description_id) {
                setIsProblemStatementActive(false);
                setActiveCategoryId((currentId) =>
                    currentId === category.description_id
                        ? currentId
                        : category.description_id ?? null
                );
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [caseItem, categories, hasProblemStatement, itemCount, scrollProgress]);

    const scrollToIndex = (index: number) => {
        const section = sectionRef.current;

        if (!section) return;

        const scrollDistance = section.offsetHeight - window.innerHeight;
        const progress = itemCount > 1 ? index / itemCount : 0;
        const target = window.scrollY + section.getBoundingClientRect().top + scrollDistance * progress;

        window.scrollTo({ top: target, behavior: "smooth" });
    };

    const handleSelectProblemStatement = () => {
        if (!caseItem?.problem_statement) return;

        setIsProblemStatementActive(true);
        setActiveCategoryId(null);
        scrollToIndex(0);
    };

    const handleSelect = (categoryId: string) => {
        const categoryIndex = categories.findIndex(
            (category) => category.description_id === categoryId
        );

        if (categoryIndex === -1) return;

        setActiveCategoryId(categoryId);
        setIsProblemStatementActive(false);
        scrollToIndex(categoryIndex + Number(hasProblemStatement));
    };

    const activeCategoryIndex = categories.findIndex(
        (category) => category.description_id === activeCategoryId
    );
    const activeItemIndex = isProblemStatementActive
        ? 0
        : Math.max(activeCategoryIndex, 0) + Number(hasProblemStatement);
    const activeCategory = categories[activeCategoryIndex] ?? null;
    const activeImage = isProblemStatementActive
        ? caseItem?.thumbnail
        : activeCategory?.image;
    const activeImageAlt = isProblemStatementActive
        ? caseItem?.name ?? ""
        : activeCategory?.name ?? "";

    return {
        sectionRef,
        caseItem,
        categories,
        itemCount,
        activeImage,
        activeImageAlt,
        scrollProgress,
        activeItemIndex,
        imageItemCount,
        isProblemStatementActive,
        activeCategoryId,
        handleSelectProblemStatement,
        handleSelect,
    };
}