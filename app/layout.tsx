import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/nav/nav";
import TemplateProvidor from "./providors/templateProvidor";
import HistoryProvidor from "./providors/histroyProvidor";
import AuthProvidor from "./providors/authProvidor";
import DocumentProvidor from "./providors/documentProvider";
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
        <AuthProvidor>
          <HistoryProvidor>
            <DocumentProvidor>
              <TemplateProvidor>
                <Nav />
                <main className="w-full">{children}</main>
              </TemplateProvidor>
            </DocumentProvidor>
          </HistoryProvidor>
        </AuthProvidor>
      </body>
    </html>
  );
}
