"use client";

import { useState } from "react";
import useIsMobile from "@/section/helper/useIsMobile";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const hireMeText = "</> Hire Me";

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="w-full flex items-center justify-between bg-[#00111c] px-4 md:px-10 py-4 shadow-md relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-14 md:h-20" />
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden p-2 text-orange-600 focus:outline-none"
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
        className={`absolute md:static top-full left-0 w-full md:w-auto flex flex-col md:flex-row items-center transition duration-1000 ease-in-out
          ${menuOpen ? "opacity-100 visible bg-[#001a2c]" : "opacity-0 invisible"}
          md:opacity-100 md:visible md:bg-transparent`}
      >
        {["Home", "Skills", "Resume", "Projects", "Contact"].map((item) => (
          <li key={item} className="w-full md:w-auto">
            <a
              href={`#${item.toLowerCase()}`}
              className="block p-4 md:px-6 text-white hover:bg-orange-900 text-center"
              onClick={() => isMobile && setMenuOpen(false)}
            >
              {item}
            </a>
          </li>
        ))}

        <li>
          <button className="m-4 px-6 py-3 border-2 border-orange-600 text-orange-200 rounded-lg hover:bg-orange-900">
            {hireMeText}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
