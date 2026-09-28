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
      <body className="flex min-h-screen flex-col">
        <header>
          <Header/>
        </header>
        <main className="mt-10 md:mt-25 flex flex-1 flex-col px-10">
        {children}
        </main>
        <footer className="relative z-9999">
          <Footer/>
        </footer>
        </body>
    </html>
  );
}
