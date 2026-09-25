import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "Form-Studio",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da">
      <body>
        <header>
          <Header/>
        </header>
        <main className="px-10 mt-25">
        {children}
        </main>
        <footer>
          <Footer/>
        </footer>
        </body>
    </html>
  );
}
