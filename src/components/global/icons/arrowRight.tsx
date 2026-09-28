import { MdArrowRightAlt } from "react-icons/md";
import { IconTypes } from "@/types/globals";

const ArrowRight = ({ color, size, onClick }: IconTypes) => {
    return (
        <MdArrowRightAlt
            className={onClick ? "cursor-pointer" : undefined}
            size={size}
            color={color}
            onClick={onClick}
        />
    );
};
 
export default ArrowRight;