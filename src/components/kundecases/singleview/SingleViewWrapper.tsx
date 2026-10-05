"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useCases } from "@/hooks/useCases";
import type { Case } from "@/types/cases";
import OpenDescription from "@/components/global/openDescription";
import CaseDescriptionView from "./CaseDescriptionView";

const CaseSingleViewWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const { getCaseById } = useCases();

    const [caseItem, setCaseItem] = useState<Case | null>(null);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        async function loadCase() {
            const result = await getCaseById(id);
            setCaseItem(result);
        }

        loadCase();
    }, [id, getCaseById]);

    useEffect(() => {
        if (!caseItem?.categories?.length) {
            return;
        }

        if (activeCategoryId !== null) {
            return;
        }

        const firstCategory = caseItem.categories[0];

        if (firstCategory.description_id) {
            setActiveCategoryId(firstCategory.description_id);
        }
    }, [caseItem, activeCategoryId]);

    useEffect(() => {
        if (!caseItem?.categories?.length) {
            return;
        }

        const categories = caseItem.categories;

        const handleScroll = () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();

            const scrollDistance = section.offsetHeight - window.innerHeight;

            if (scrollDistance <= 0) {
                return;
            }

            const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

            const index = Math.min(Math.floor(progress * categories.length), categories.length - 1);

            const category = categories[index];

            if (
                category?.description_id &&
                category.description_id !== activeCategoryId
            ) {
                setActiveCategoryId(category.description_id);
            }
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        handleScroll();

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, [caseItem, activeCategoryId]);

    const handleSelect = (categoryId: string) => {
        if (!caseItem?.categories?.length) {
            return;
        }

        const index =
            caseItem.categories.findIndex(
                (category) =>
                    category.description_id === categoryId
            );

        if (index === -1) {
            return;
        }

        setActiveCategoryId(categoryId);

        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const scrollDistance =
            section.offsetHeight - window.innerHeight;

        const progress =
            index / caseItem.categories.length;

        const target =
            section.offsetTop +
            scrollDistance * progress;

        window.scrollTo({
            top: target,
            behavior: "smooth",
        });
    };

    if (!caseItem) {
        return <article>Indlæser case...</article>;
    }

    const categories = caseItem.categories ?? [];

    const activeCategory =
        categories.find(
            (category) =>
                category.description_id === activeCategoryId
        ) ?? null;

    return (
        <article
            ref={sectionRef}
            className="relative"
            style={{
                height: `${Math.max(
                    categories.length,
                    1
                ) * 100}vh`,
            }}
        >
            <div
                className="
                    fixed
                    inset-x-0
                    top-35
                    bottom-0
                    flex
                    flex-col
                    md:flex-row
                "
            >
                {/* IMAGE */}

                <div
                    className="
                        order-1
                        h-auto
                        w-full
                        shrink-0
                        overflow-y-auto
                        md:order-2
                        md:h-full
                        md:w-1/2
                    "
                >
                    <CaseDescriptionView
                        category={activeCategory}
                    />
                </div>

                {/* CATEGORIES */}

                <div
                    className="
                        order-2
                        min-h-0
                        w-full
                        overflow-y-auto
                        md:order-1
                        md:h-full
                        md:w-1/2
                    "
                >
                    <OpenDescription
                        items={categories}
                        activeCategoryId={activeCategoryId}
                        onSelect={handleSelect}
                    />
                </div>
            </div>
        </article>
    );
};

export default CaseSingleViewWrapper;