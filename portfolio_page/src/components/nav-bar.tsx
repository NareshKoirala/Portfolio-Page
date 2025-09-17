import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import mobileStyles from "../styles/nav-bar-mobile.module.css";
import desktopStyles from "../styles/nav-bar-desktop.module.css";
import Image from "next/image";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const router = useRouter();

  // Handle screen size and scroll effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Track current path safely
  useEffect(() => {
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  // Choose styles based on screen size
  const styles = isMobile ? mobileStyles : desktopStyles;

  return (
    <div>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>

          {isMobile && (
            <Link href="/">
              <Image
                className={styles.logo}
                src="/image/logo.png"
                alt="Logo"
                width={80}
                height={40} />
            </Link>
          )}

          <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${currentPath === item.href ? styles.active : ''
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button - only show on mobile */}
          {isMobile && (
            <button
              className={`${styles.mobileMenuButton} ${isOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={styles.hamburger}></span>
              <span className={styles.hamburger}></span>
              <span className={styles.hamburger}></span>
            </button>
          )}
        </div>
      </nav>

    </div>
  );
}