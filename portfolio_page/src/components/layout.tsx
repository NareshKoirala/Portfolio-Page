import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import SocialIcons from "./social-icons";
import Resume from "./resume";
import { useRouter } from "next/router";
import styles from "../styles/layout.module.css";
import Stars from "./stars";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children}: LayoutProps) {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);

    const isAdminPage = router.pathname === '/admin';

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.layoutContainer}>
            <Stars
                count={isMobile ? 60 : 150}
                minSize={isMobile ? 0.5 : 1}
                maxSize={isMobile ? 1.5 : 2.5}
            />
            <Head>
                <title>Naresh Prasad Koirala</title>
                <meta name="description" content="Welcome to my portfolio page" />
                <link rel="icon" href="/icons/mainicon.ico" />
            </Head>
            <header style={{ width: "100vw" }}>
                <Resume />
                <div className={`${styles.mainContent} ${isMobile ? styles.mobile : styles.desktop} ${isAdminPage ? styles.admin : ''}`}>
                    {children}
                </div>
                <SocialIcons />
            </header>
        </div>
    );
}