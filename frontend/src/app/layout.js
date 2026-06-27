import { Lexend, Space_Grotesk, Work_Sans } from "next/font/google";
import "./globals.css";

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

const siteUrl = "https://raghavgangwar.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Raghav Gangwar — Full-Stack & AI Engineer",
  description:
    "Full-stack developer (MERN, FastAPI) and AI engineer building production LLM apps — RAG pipelines, agentic systems, and clean backend APIs. CS @ Amity University Rajasthan.",
  keywords: [
    "Raghav Gangwar",
    "Full-Stack Developer",
    "AI Engineer",
    "MERN",
    "FastAPI",
    "RAG",
    "LLM",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Raghav Gangwar" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Raghav Gangwar — Full-Stack & AI Engineer",
    description:
      "Production LLM apps, RAG pipelines, and full-stack systems. Backend + frontend + AI.",
    siteName: "Raghav Gangwar",
    images: [{ url: "/profile.jpg", width: 1200, height: 630, alt: "Raghav Gangwar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghav Gangwar — Full-Stack & AI Engineer",
    description:
      "Production LLM apps, RAG pipelines, and full-stack systems. Backend + frontend + AI.",
    creator: "@RaghavGangwar15",
    images: ["/profile.jpg"],
  },
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
