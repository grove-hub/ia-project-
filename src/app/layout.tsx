import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EcoMind - Recherche instantanée dans les textes de loi",
    template: "%s | EcoMind"
  },
  description: "Recherche instantanée dans les textes de loi, jurisprudences et normes environnementales. Conformité, audits et veille en un clic pour la gestion des déchets.",
  keywords: ["IA juridique", "droit des déchets", "conformité environnementale", "recherche juridique", "veille réglementaire", "audit déchets"],
  authors: [{ name: "EcoMind" }],
  creator: "EcoMind",
  publisher: "EcoMind",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ia-juridique-dechets.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ia-juridique-dechets.com",
    title: "L'IA qui révolutionne la recherche juridique en gestion des déchets",
    description: "Recherche instantanée dans les textes de loi, jurisprudences et normes environnementales. Conformité, audits et veille en un clic.",
    siteName: "EcoMind",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'IA qui révolutionne la recherche juridique en gestion des déchets",
    description: "Recherche instantanée dans les textes de loi, jurisprudences et normes environnementales.",
    creator: "@ecomind",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
