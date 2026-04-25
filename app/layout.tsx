import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jesse Obinna — Full-Stack Developer",
  description: "Full-Stack Developer crafting scalable, beautiful web experiences. Based in Abuja, Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
