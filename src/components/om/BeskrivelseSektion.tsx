
import Image from "next/image";

const BeskrivelseSektion = () => {
    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-stretch">
            <div className="flex flex-col gap-5 md:flex-1">
                <h2>Hvor vi startede</h2>

                <p>
                    Jeg har altid været fascineret af det håndværk, der ligger bag stærke fortællinger, godt design og ægte kreativitet. Men i takt med at teknologi og automatisering fylder mere og mere, oplever jeg også, at vi risikerer at miste noget vigtigt: den menneskelige tanke bag arbejdet og evnen til at være kritiske over for det, vi skaber og forbruger.

                    <br /><br />

                    Derfor stiftede jeg Form-Studio.

                    <br /><br />

                    Ikke fordi verden manglede endnu en kreativ leverandør, men fordi jeg ønskede at skabe et sted, hvor kvalitet, omtanke og kunstnerisk håndværk kommer før hurtige løsninger. Jeg tror ikke på at skabe vækst for vækstens skyld. Jeg tror på at skabe brands, fortællinger og oplevelser, som mennesker faktisk husker, og som rammer den målgruppe, de er skabt til - om det så er en annonce på SoMe eller en spillefilm.

                    <br /><br />

                    Form-Studio er også et ønske om at give plads til kunstneriske talenter og vise, at godt håndværk stadig har en plads i en digital verden. For mig handler Form-Studio ikke om at producere mest muligt, men om at skabe noget, der har værdi.
                </p>

                <p className="font-bold">- Nana Augustine</p>
            </div>

                <div className="relative w-screen md:w-auto md:flex-1 -mx-10 md:mx-0 md:-mr-10">
                <Image
                    className="w-full h-full object-cover"
                    src="https://4qtnqlnklwwvfwim.private.blob.vercel-storage.com/bts/kindsight-the-head-bts.webp?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfNHF0TnFMbktsd3dWZndpbSIsIm93bmVySWQiOiJ0ZWFtX2RaS01IUzVvNm1lbHoxdU95M3hHeVhMaSIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzkzMjI0MDc3ODkxLCJpYXQiOjE3OTMxODA4Nzc5NzV9.XPgvg_K2Z1Zba_b9gXSFGIoASxCghIYrEKUuo4N-QCA&vercel-blob-signature=6pMmnMJGBtLZor02oF8wK3Sg3nLIRhVBF9Zcpk6kNqs"
                    alt="Behind the scenes fra en filmproduktion"
                    width={1200}
                    height={1600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
};

export default BeskrivelseSektion;
