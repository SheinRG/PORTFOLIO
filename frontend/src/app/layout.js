import { Lexend, Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";
import ComicHeader from "../components/ComicHeader";
import ComicFooter from "../components/ComicFooter";

const lexend = Lexend({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hero Portfolio",
  description: "A graphic narrative portfolio of the perfect intern.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${spaceGrotesk.variable} ${workSans.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col font-body-md bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300" suppressHydrationWarning>
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
