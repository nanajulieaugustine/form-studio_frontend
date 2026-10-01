"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { SelectOption } from "@/types/globals";
import CaseCard from "./CaseCard";
import SelectForm from "../global/forms/SelectForm";

const CaseWrapper = () => {
    const { getProducts } = useProducts();

    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selectedService, setSelectedService] = useState<SelectOption | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            const products = await getProducts();

            const formattedOptions = (products ?? []).map((product) => ({
                value: product.id,
                label: product.name,
            }));

            setOptions(formattedOptions);
        };

        loadProducts();
    }, [getProducts]);

    return (
        <article className="mt-10">
            <div className="fixed top-30 left-15 z-100 rounded-3xl backdrop-blur-3xl">
                <SelectForm
                    options={options}
                    placeholder="Vælg ydelse"
                    value={selectedService}
                    onChange={setSelectedService}
                />
            </div>
            <CaseCard selectedService={selectedService?.value ?? null} />
        </article>
    );
};

export default CaseWrapper;