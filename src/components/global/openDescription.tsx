"use client";

import { OpenDescriptionProps } from "@/types/categories";

const OpenDescription = ({ items, problemStatement, isProblemStatementActive, activeCategoryId, onSelectProblemStatement, onSelect,}: OpenDescriptionProps) => {

    return (
        <article>
            <ul>
                {problemStatement && (
                    <li>
                        <button
                            type="button"
                            className="cursor-pointer text-left"
                            onClick={onSelectProblemStatement}
                            aria-expanded={isProblemStatementActive}>
                            <div className="w-fit">
                                <h5>Problem statement</h5>

                                <div className={`h-px bg-(--foreground) origin-left transition-transform duration-1000 ease-out ${isProblemStatementActive ? "scale-x-100" : "scale-x-0"}`}/>
                            </div>

                            <div className={`grid transition-all duration-500 ease-out ${isProblemStatementActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                <div className="overflow-hidden">
                                    <p className="py-4">{problemStatement}</p>
                                </div>
                            </div>
                        </button>
                    </li>
                )}
                {items.map((item) => {
                
                const isActive = activeCategoryId === item.description_id;

                    return (
                        <li key={item.description_id ?? item.name}>

                            <button
                                type="button"
                                className="cursor-pointer text-left"
                                onClick={() => {if (item.description_id) {onSelect(item.description_id);}}}
                                aria-expanded={isActive}>
                                <div className="w-fit">
                                    <h5>{item.name}</h5>

                                    <div className={`h-px bg-(--foreground) origin-left transition-transform duration-1000 ease-out ${isActive? "scale-x-100" : "scale-x-0"}`}/>
                                </div>

                                <div className={`grid transition-all duration-500 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                    <div className="overflow-hidden">
                                        <p className="py-4">{item.description}</p>
                                    </div>
                                </div>
                            </button>

                        </li>
                    );
                })}
            </ul>
        </article>
    );
};

export default OpenDescription;