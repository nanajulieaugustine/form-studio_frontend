export type Categories = {
    description_id?: string;
    name: string;
    description?: string;
    image?: string;
};

export type OpenDescriptionProps = {
    items: Categories[];
    problemStatement?: string;
    isProblemStatementActive: boolean;
    activeCategoryId: string | null;
    onSelectProblemStatement: () => void;
    onSelect: (id: string) => void;
};

export type CaseDescriptionViewProps = {
    image?: string;
    imageAlt: string;
    scrollProgress: import("framer-motion").MotionValue<number>;
    activeItemIndex: number;
    itemCount: number;
};