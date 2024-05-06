import React from 'react';
import Container from "@/components/Container";
import FooterList from "@/components/footer/FooterList";
import {MdFacebook} from 'react-icons/md';
import Link from 'next/link';
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from "react-icons/ai";

const Footer = () => {
    return (
        <footer className={"bg-slate-700 text-slate-200 text-sm mt-16"}>
            <Container>
                <div className={"flex flex-col md:flex-row justify-between pt-16 pb-8"}>
                    <FooterList>
                        <h3 className={"font-bold text-base mb-2"}>Shop Category</h3>
                        <a href={"#"}>Phones</a>
                        <a href={"#"}>Laptops</a>
                        <a href={"#"}>Desktops</a>
                        <a href={"#"}>Watches</a>
                        <a href={"#"}>TV</a>
                        <a href={"#"}>Accessories</a>
                    </FooterList>
                    <FooterList>
                        <h3 className={"font-bold text-base mb-2"}>Customer service</h3>
                        <a href={"#"}>Contact Us</a>
                        <a href={"#"}>shipping Pilicy</a>
                        <a href={"#"}>Return & Exchanges</a>
                        <a href={"#"}>Watches</a>
                        <a href={"#"}>FAQs</a>
                    </FooterList>
                    <div className={"w-full md:w-1/3 mb-6 md-mb-0"}>
                        <h3 className={"font-bold text-base mb-2"}>
                            About Us</h3>
                        <p className={"mb-2"}>At CSTAD ECommerce, we are more than just an online store; we are a community dedicated to enhancing your shopping experience. Founded in 2024bn, our journey began with a simple mission: to make online shopping effortless and enjoyable for everyone.</p>
                        <p>&copy; {new Date().getFullYear()} CSTAD-Ecommerce.All rights reserved</p>
                    </div>
                    <FooterList>
                        <h3 className={"font-bold text-base mb-2"}>Follow Us</h3>
                        <div className={"flex gap-2"}>
                            <Link href={"#"}>
                                <MdFacebook size={24}/>
                            </Link>
                            <Link href={"#"}>
                                <AiFillTwitterCircle size={24}/>
                            </Link>
                            <Link href={"#"}>
                                <AiFillInstagram size={24}/>
                            </Link>
                            <Link href={"#"}>
                                <AiFillYoutube size={24}/>
                            </Link>
                        </div>
                    </FooterList>

                </div>
            </Container>
        </footer>
    );
};

export default Footer;