import { MdArrowRightAlt } from "react-icons/md";
import { IconTypes } from "@/types/globals";

const ArrowRight = ({ color, size }: IconTypes) => {
    return (
        <MdArrowRightAlt size={size} color={color}/>
    );
};
 
export default ArrowRight;