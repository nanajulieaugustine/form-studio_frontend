export type Categories = {
    description_id?: string;
    name: string;
    description?: string;
    image?: string;
};

export type OpenDescriptionProps = {
    items: Categories[];
    activeCategoryId: string | null;
    onSelect: (id: string) => void;
};

export type CaseDescriptionViewProps = {
    category: Categories | null;
};