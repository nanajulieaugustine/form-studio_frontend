"use client";
import Link from "next/link";
import { headerType } from "@/types/navigation";
import Button from "../global/Button";
import Image from "next/image";

const Header = () => {

    const li: headerType = [
        { name: "Forside", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Kundecases", href: "/kundecases" },
        { name: "Om Os", href: "/om-os" }
    ];

    return ( 
        <>
                <nav className="flex justify-between items-end py-5 px-10 backdrop-blur-2xl">
        
                    <Image src="/logo_white.svg" className="object-cover" alt="logo" height={50} width={200}/>
                
                    <ul className="flex gap-10">
                        {li.map((item) => (
                            <li key={item.name}>
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        
                    ))}
                    </ul>

                    <Button>Kontakt Os</Button>
                </nav>

            <hr className="mx-10 text-(--foreground)"/>
        </>
     );
}
 
export default Header;