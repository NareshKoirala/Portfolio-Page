import { useEffect, useState } from "react";

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null means "unknown on server"

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // While rendering on server or before effect runs, fallback to false
  return isMobile ?? false;
}
