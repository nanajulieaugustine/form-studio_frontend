import EmployeeKarrusel from "../global/karrusel/EmployeeKarrusel";
import BeskrivelseSektion from "./BeskrivelseSektion";
const OmWrapper = () => {
    return ( 
        <article className="py-10">
            <EmployeeKarrusel />
            <BeskrivelseSektion/>
        </article>
     );
}
 
export default OmWrapper;