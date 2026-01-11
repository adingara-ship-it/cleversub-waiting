import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cleversub — Économisez sur vos abonnements",
  description: "La solution belge pour diviser vos factures premium.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="antialiased h-full">
      <body className={`${inter.className} bg-white text-[#0F172A] flex flex-col min-h-screen`}>

        {/* Header */}
        <header className="w-full flex justify-center pt-10 md:pt-14 pb-4">
          <div className="flex items-center justify-center gap-0 leading-none">

            {/* Logo — volontairement plus grand */}
            <div className="relative w-16 h-16 md:w-18 md:h-18">
              <Image
                src="/logosite.png"
                alt="Cleversub Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Texte — ajustement optique */}
            <span className="-ml-3 md:-ml-4 text-3xl md:text-5xl font-black tracking-tighter">
              cleversub<span className="text-[#2563EB]">.</span>
            </span>

          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-400 text-xs md:text-sm font-medium flex flex-col items-center gap-2">
          <p>Fièrement propulsé depuis la Belgique 🇧🇪</p>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 opacity-70">
            <span>© {new Date().getFullYear()} Cleversub.</span>
            <span className="hidden md:inline">|</span>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-[#2563EB] transition-colors underline md:no-underline"
            >
              Politique de confidentialité
            </Link>
          </div>
        </footer>

      </body>
    </html>
  );
}
