export type ServiceUndercategory = {
    id: number;
    name: string;
    description: string;
};

export type Product = {
    id: number;
    name: string;
    thumbnail_video?: string;
    service_undercategories: ServiceUndercategory[];
};

export type GetServicesProps = {
    activeProductId: number | null;
    onSelect: (id: number) => void;
};