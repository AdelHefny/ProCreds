import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/nav/nav";
import TemplateProvidor from "./templateProvidor";
export const metadata: Metadata = {
  title: "ProCreds",
  description: "A resume maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-main h-[100vh] text-white">
        <Nav />
        <TemplateProvidor>
          <main>{children}</main>
        </TemplateProvidor>
      </body>
    </html>
  );
}
