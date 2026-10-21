"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useMotionValue } from "framer-motion";
import { useCases } from "@/hooks/useCases";
import type { Case } from "@/types/cases";
import OpenDescription from "@/components/global/openDescription";
import CaseDescriptionView from "./CaseDescriptionView";
import Image from "next/image";
import EmployeeKarrusel from "@/components/global/karrusel/EmployeeKarrusel";

const CaseSingleViewWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const { getCaseById } = useCases();

    const [caseItem, setCaseItem] = useState<Case | null>(null);
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [isProblemStatementActive, setIsProblemStatementActive] = useState(false);

    const sectionRef = useRef<HTMLElement | null>(null);
    const scrollProgress = useMotionValue(0);

    useEffect(() => {
        async function loadCase() {
            const result = await getCaseById(id);
            setCaseItem(result);
        }

        loadCase();
    }, [id, getCaseById]);

    useEffect(() => {
        if (!caseItem) {
            return;
        }

        if (activeCategoryId !== null || isProblemStatementActive) {
            return;
        }

        if (caseItem.problem_statement) {
            setIsProblemStatementActive(true);
            return;
        }

        const firstCategory = caseItem.categories?.[0];

        if (firstCategory?.description_id) {
            setActiveCategoryId(firstCategory.description_id);
        }
    }, [caseItem, activeCategoryId, isProblemStatementActive]);

    useEffect(() => {
        if (!caseItem) {
            return;
        }

        const categories = caseItem.categories;
        const hasProblemStatement = Boolean(caseItem.problem_statement);
        const itemCount = categories.length + Number(hasProblemStatement);

        if (itemCount === 0) {
            return;
        }

        const handleScroll = () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();

            const scrollDistance = section.offsetHeight - window.innerHeight;

            if (scrollDistance <= 0) {
                scrollProgress.set(1);
                return;
            }

            const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
            scrollProgress.set(progress);

            const index = Math.min(Math.floor(progress * itemCount), itemCount - 1);

            if (hasProblemStatement && index === 0) {
                setIsProblemStatementActive(true);
                setActiveCategoryId(null);
                return;
            }

            const category = categories[index - Number(hasProblemStatement)];

            if (
                category?.description_id && category.description_id !== activeCategoryId
            ) {
                setIsProblemStatementActive(false);
                setActiveCategoryId(category.description_id);
            }
        };

        window.addEventListener( "scroll", handleScroll, { passive: true });

        handleScroll();

        return () => { window.removeEventListener("scroll", handleScroll);};
    }, [caseItem, activeCategoryId]);

    const scrollToIndex = (index: number, itemCount: number) => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const scrollDistance = section.offsetHeight - window.innerHeight;
        const progress = itemCount > 1 ? index / itemCount : 0;
        const target = section.offsetTop + scrollDistance * progress;

        window.scrollTo({top: target, behavior: "smooth"});
    };

    const handleSelectProblemStatement = () => {
        if (!caseItem?.problem_statement) {
            return;
        }

        setIsProblemStatementActive(true);
        setActiveCategoryId(null);
        scrollToIndex(0, caseItem.categories.length + 1);
    };

    const handleSelect = (categoryId: string) => {
        if (!caseItem?.categories?.length) {
            return;
        }

        const index = caseItem.categories.findIndex((category) =>category.description_id === categoryId);

        if (index === -1) {
            return;
        }

        const hasProblemStatement = Boolean(caseItem.problem_statement);
        const itemCount = caseItem.categories.length + Number(hasProblemStatement);

        setActiveCategoryId(categoryId);
        setIsProblemStatementActive(false);
        scrollToIndex(index + Number(hasProblemStatement), itemCount);
    };

    if (!caseItem) {
        return <article>Indlæser case...</article>;
    }

    const categories = caseItem.categories ?? [];
    const itemCount = categories.length + Number(Boolean(caseItem.problem_statement));
    const imageItemCount = Math.max(itemCount, 1);

    const activeCategory = categories.find((category) => category.description_id === activeCategoryId) ?? null;
    const activeCategoryIndex = categories.findIndex((category) => category.description_id === activeCategoryId);
    const activeItemIndex = isProblemStatementActive ? 0 : Math.max(activeCategoryIndex, 0) + Number(Boolean(caseItem.problem_statement));

    const activeImage = isProblemStatementActive ? caseItem.thumbnail : activeCategory?.image;

    const activeImageAlt = isProblemStatementActive ? caseItem.name : activeCategory?.name ?? "";

    return (
        <>
            <article ref={sectionRef} className="relative" style={{height: `${Math.max(itemCount,1) * 100}vh`,}}>
                <div className="sticky top-5 flex h-[calc(100vh-1.25rem)] flex-col md:top-35 md:h-[calc(100vh-8.75rem)] md:flex-row">
                    {/* CATEGORIES */}
                    <div className="order-2 min-h-0 w-full flex-1 overflow-y-auto p-10 md:order-1 md:h-full md:w-1/2 md:flex-none">
                        <OpenDescription items={categories} problemStatement={caseItem.problem_statement} isProblemStatementActive={isProblemStatementActive} activeCategoryId={activeCategoryId} onSelectProblemStatement={handleSelectProblemStatement} onSelect={handleSelect}/>
                    </div>
                    {/* IMAGE */}
                    {caseItem.thumbnail && (
                        <div className="relative order-1 aspect-video w-full shrink-0 overflow-hidden md:hidden">
                            <Image
                                src={caseItem.thumbnail}
                                alt={caseItem.name}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="order-1 hidden h-auto w-full shrink-0 overflow-hidden md:order-2 md:block md:h-full md:w-1/2">
                        <CaseDescriptionView
                            image={activeImage}
                            imageAlt={activeImageAlt}
                            scrollProgress={scrollProgress}
                            activeItemIndex={activeItemIndex}
                            itemCount={imageItemCount}
                        />
                    </div>
                </div>
            </article>
        {caseItem.quote && (
            <article className="ml-auto flex w-full max-w-2xl flex-col items-start gap-5 px-10">
                <h5>{caseItem.name} siger</h5>
                <div className="flex w-full gap-5">
                    <h2>"</h2>
                    <p>{caseItem.quote}</p>
                </div>
            </article>
        )}
        <article className="ml-auto flex w-full max-w-2xl py-20 flex-col items-start gap-5 ">
            <h4>Udviklet af</h4>
            <EmployeeKarrusel employees={caseItem.employees} />
        </article>
        </>
    );
};

export default CaseSingleViewWrapper;