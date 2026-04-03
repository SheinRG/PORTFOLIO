import { Bangers, Comic_Neue } from "next/font/google";
import "./globals.css";
import ComicHeader from "../components/ComicHeader";
import ComicFooter from "../components/ComicFooter";

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  variable: "--font-comic-neue",
  subsets: ["latin"],
});

export const metadata = {
  title: "Raghav Gangwar - Code-Squashing Avenger",
  description: "A comic book portfolio of the perfect intern.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bangers.variable} ${comicNeue.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-comic bg-comicWhite">
        <ComicHeader />
        <div className="flex-1">
          {children}
        </div>
        <ComicFooter />
      </body>
    </html>
  );
}
