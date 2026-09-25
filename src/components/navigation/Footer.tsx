import LinkedInIcon from "../global/icons/LinkedInIcon";
import FacebookIcon from "../global/icons/FacebookIcon";
import InstagramIcon from "../global/icons/InstagramIcon";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="pt-20 md:pt-5 pb-5 px-10">
            <hr className="pb-5" />
            <div className="grid grid-cols-1 items-center gap-8 px-10 md:grid-cols-[1fr_auto_1fr] md:gap-0">
                <div className="order-1 flex flex-col gap-5 justify-self-start">
                    <h4>Kontakt</h4>
                    <p>nana@form-studio.dk</p>
                    <p>
                        Sankelmandsvej 11, <br /> 1676 København V <br /> FREQENSEN
                    </p>
                </div>

                <div className="order-3 justify-self-center md:order-2">
                    <h4 className="display">FORM</h4>
                </div>

                <div className="order-2 justify-self-center md:justify-self-end md:order-3">
                    <ul className="flex flex-row gap-5 md:flex-col">
                        <li>
                            <Link
                                href="https://www.facebook.com/profile.php?id=61591037556764"
                                className="inline-flex text-var(--foreground) transition-all duration-300 hover:scale-105"
                            >
                                <FacebookIcon size={40} color="currentColor" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://www.instagram.com/formstudiodk/"
                                className="inline-flex text-var(--foreground) transition-all duration-300 hover:scale-105"
                            >
                                <InstagramIcon size={40} color="currentColor" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://www.linkedin.com/company/146646984"
                                className="inline-flex text-var(--foreground) transition-all duration-300 hover:scale-105"
                            >
                                <LinkedInIcon size={40} color="currentColor" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
 
export default Footer;