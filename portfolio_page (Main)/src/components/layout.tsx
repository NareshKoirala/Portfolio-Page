import Head from "next/head";
import NavBar from "./nav-bar";
import { ReactNode, useEffect, useState } from "react";
import SocialIcons from "./social-icons";
import Resume from "./resume";
import { useRouter } from "next/router";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children}: LayoutProps) {
    const router = useRouter();
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(router.pathname === '/');
    }, [router.pathname]);

    return (
        <div className="">
            <Head>
                <title>Naresh Prasad Koirala</title>
                <meta name="description" content="Welcome to my portfolio page" />
                <link rel="icon" href="/icons/mainicon.ico" />
            </Head>
            <header>
                {isHomePage && <Resume />}
                <NavBar />
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] py-8 px-4 sm:px-6 lg:px-16 lg:pr-80 xl:px-24 xl:pr-96">
                    {children}
                </div>
                <SocialIcons />
            </header>
        </div>
    );
}