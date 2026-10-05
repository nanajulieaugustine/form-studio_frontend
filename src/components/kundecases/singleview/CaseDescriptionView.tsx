"use client";

import Image from "next/image";
import { CaseDescriptionViewProps } from "@/types/categories";

const CaseDescriptionView = ({
    category,
}: CaseDescriptionViewProps) => {

    if (!category) {
        return null;
    }

    return (
        <article className="flex flex-col">

            {category.image && (
                <div className="relative aspect-4/3 w-full">
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

        </article>
    );
};

export default CaseDescriptionView;