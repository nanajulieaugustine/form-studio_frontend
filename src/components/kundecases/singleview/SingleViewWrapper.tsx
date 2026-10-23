"use client";
import OpenDescription from "@/components/global/openDescription";
import ImageAnimationYAxis from "@/components/global/animations/ImageAnimationYAxis";
import Image from "next/image";
import EmployeeKarrusel from "@/components/global/karrusel/EmployeeKarrusel";
import { useScrollToCase } from "@/hooks/useScrollToCase";

const CaseSingleViewWrapper = () => {
    const {sectionRef, caseItem, categories, itemCount, activeImage, activeImageAlt, scrollProgress, activeItemIndex, imageItemCount, isProblemStatementActive, activeCategoryId, handleSelectProblemStatement, handleSelect,} = useScrollToCase();

    if (!caseItem) {
        return <article>Indlæser case...</article>;
    }

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
                        <ImageAnimationYAxis
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