
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naresh's Portfolio",
  description: "A portfolio website showcasing my projects and skills.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
