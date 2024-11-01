import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/nav/nav";
import TemplateProvidor from "./templateProvidor";
import HistoryProvidor from "./histroyProvidor";
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
      <body className="bg-main text-secant2 overflow-x-hidden">
        <Nav />
        <HistoryProvidor>
          <TemplateProvidor>
            <main className="">{children}</main>
          </TemplateProvidor>
        </HistoryProvidor>
      </body>
    </html>
  );
}
