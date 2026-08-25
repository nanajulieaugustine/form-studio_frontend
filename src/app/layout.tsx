import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/navigation/Header";

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
        <main>
        {children}
        </main>
        <footer>
          
        </footer>
        </body>
    </html>
  );
}
