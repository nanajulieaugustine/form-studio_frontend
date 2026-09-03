 "use client";
import { useState } from "react";
import Link from "next/link";
import { headerType } from "@/types/navigation";
import Button from "../global/Button";
import Image from "next/image";
import LineAnimation from "../global/animations/LineAnimation";
import { usePathname } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import Close from "../global/icons/Close"

const Header = () => {

    const li: headerType = [
        { name: "Forside", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Kundecases", href: "/kundecases" },
        { name: "Om Os", href: "/om-os" }
    ];

    const pathname = usePathname();

    const [openBurgerMenu, setOpenburgerMenu] = useState(false);

    return ( 
        <>
        <div className="hidden md:block">
                <nav className="flex justify-between items-end py-5 px-10 backdrop-blur-2xl">
                    
                    <Link href="/">
                        <Image src="/logo_white.svg" className="object-cover" alt="logo" height={50} width={200}/>
                    </Link>
                
                    <ul className="flex gap-10">
                        {li.map((item) => (
                            <li className="hover:scale-105 transition-all duration-500" key={item.name}>
                                <Link href={item.href}>{item.name}</Link>
                                <LineAnimation isHovered={pathname === item.href} color="var(--foreground)" />
                            </li>
                        
                    ))}
                    </ul>

                    <Button use="onClick" type="primary">Kontakt Os</Button>
                </nav>
                <hr className="mx-10 text-(--foreground)"/>
        </div>
            <div className="block md:hidden">
            <nav className="relative z-600 flex justify-end items-center py-5 px-10 backdrop-blur-2xl">
                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                    <Image src="/logo_white.svg" className="object-cover" alt="logo" height={40} width={160}/>
                </Link>
                <Close isOpen={openBurgerMenu} onClick={() => setOpenburgerMenu(!openBurgerMenu)} />
            </nav>
            <BurgerMenu isVisible={openBurgerMenu} toggleSideMenu={() => setOpenburgerMenu(!openBurgerMenu)} />
            </div>
        </>
     );
}
 
export default Header;