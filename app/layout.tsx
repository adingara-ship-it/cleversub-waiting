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
      <body className={`${inter.className} bg-[#FFFFFF] text-[#0F172A] flex flex-col min-h-screen`}>
        {/* Header Responsive */}
        <header className="w-full flex justify-center pt-10 md:pt-16 pb-4 z-20">
          <div className="flex items-center gap-2 md:gap-3 leading-none transition-transform duration-300 cursor-pointer hover:scale-105">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/logosite.png"
                alt="Cleversub Logo"
                fill
                priority
                className="object-contain relative z-10"
              />
              <div className="absolute inset-0 bg-[#60A5FA]/20 blur-2xl rounded-full -z-10" />
            </div>
            
            <span className="text-3xl md:text-5xl font-black tracking-tighter text-[#0F172A]">
              cleversub<span className="text-[#2563EB]">.</span>
            </span>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>

        {/* Footer avec lien vers la Politique de Confidentialité */}
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