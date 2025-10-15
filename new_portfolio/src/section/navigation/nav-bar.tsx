"use client";
import { useState } from "react";
import useIsMobile from "@/section/helper/useIsMobile";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex flex-col md:flex-row items-center justify-center bg-transparent px-4 md:px-10 py-4 shadow-md">
      {/* Logo */}
      <div className="flex justify-center w-full md:w-auto mb-2 md:mb-0">
        <img src="/logo.png" alt="Logo" className="h-10 md:h-14" />
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden p-2 text-orange-600 focus:outline-none absolute top-4 right-4"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? (
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Navigation links */}
      <ul
        className={`absolute md:static top-full left-0 w-full md:w-auto flex flex-col md:flex-row items-center transition duration-500 ease-in-out ${
          menuOpen ? "opacity-100 visible bg-[#001523]" : "opacity-0 invisible"
        } md:opacity-100 md:visible`}
      >
        {["Home", "Skills", "Projects", "Contact"].map((item) => (
          <li key={item} className="w-full md:w-auto">
            <a
              href={`#${item.toLowerCase()}`}
              className="block p-3 md:px-6 text-center text-xl hover:text-orange-500"
              onClick={() => isMobile && setMenuOpen(false)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
