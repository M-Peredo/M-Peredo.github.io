import type { Metadata } from "next";
import "@fontsource/zen-kaku-gothic-antique/latin-500.css";
import "@fontsource/zen-kaku-gothic-antique/latin-700.css";
import "@fontsource/zen-kaku-gothic-new/latin-400.css";
import "@fontsource/zen-kaku-gothic-new/latin-500.css";
import "@fontsource/zen-kaku-gothic-new/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Molly Peredo", template: "%s | Molly Peredo" },
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
