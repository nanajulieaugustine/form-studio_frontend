import Image from "next/image";
const BeskrivelseSektion = () => {
    return ( 
        <div className="flex gap-10 md:gap-20 flex-col md_flex-row">
            <div className="flex flex-col gap-5">
                <h2>Hvor vi startede</h2>
                <p>
                    Jeg har altid været fascineret af det håndværk, der ligger bag stærke fortællinger, godt design og ægte kreativitet. Men i takt med at teknologi og automatisering fylder mere og mere, oplever jeg også, at vi risikerer at miste noget vigtigt: den menneskelige tanke bag arbejdet og evnen til at være kritiske over for det, vi skaber og forbruger.
                    <br/> <br/>
                    Derfor stiftede jeg Form-Studio.
                    <br/> <br/>
                    Ikke fordi verden manglede endnu et kreativt leverandør, men fordi jeg ønskede at skabe et sted, hvor kvalitet, omtanke og kunstnerisk håndværk kommer før hurtige løsninger. Jeg tror ikke på at skabe vækst for vækstens skyld. Jeg tror på at skabe brands, fortællinger og oplevelser, som mennesker faktisk husker, og som rammer den målgruppe, de er skabt til - om det så er en annonce på SoMe eller en spillefilm.
                    <br/> <br/>
                    Form-Studio er også et ønske om at give plads til kunstneriske talenter og vise, at godt håndværk stadig har en plads i en digital verden. For mig handler Form-Studio ikke om at producere mest muligt, men om at skabe noget, der har værdi.
                </p>
                <p className="font-bold">- Nana Augustine</p>
            </div>
            <Image src="" alt="" width="40" height="40"/>
        </div>
     );
}
 
export default BeskrivelseSektion;