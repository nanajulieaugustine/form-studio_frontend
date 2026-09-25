"use client";

import { useServices } from "@/utils/productUtils";
import { GetServicesProps } from "@/types/products";

const GetServices = ({activeProductId, onSelect,}: GetServicesProps) => {

    const { products, loading } = useServices();

    if (loading) {
        return <p>Henter services...</p>;
    }

    const activeIndex = products.findIndex((item) => item.id === activeProductId);

    return (
        <article>
            <ul>
                {products.map((product, index) => {
                    const distance = activeIndex === -1 ? null: Math.abs(index - activeIndex);

                    let opacityClass = "opacity-100";

                    if (distance === 1) {
                        opacityClass = "opacity-50";
                    } else if (distance === 2) {
                        opacityClass = "opacity-25";
                    } else if (
                        distance !== null &&
                        distance >= 3
                    ) {
                        opacityClass = "opacity-15";
                    }

                    return (
                        <li key={product.id}>
                            <button
                                className="cursor-pointer"
                                onClick={() =>
                                    onSelect(product.id)
                                }
                                aria-pressed={
                                    activeProductId === product.id
                                }
                            >
                                <h3
                                    className={`
                                        transition-opacity
                                        duration-500
                                        ease-out
                                        ${opacityClass}
                                    `}
                                >
                                    {product.name}
                                </h3>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </article>
    );
};

export default GetServices;