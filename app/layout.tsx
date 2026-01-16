import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <body className={`${instrumentSans.className} bg-white text-[#0F172A] flex flex-col min-h-screen relative overflow-x-hidden`}>
        
        {/* Subtle background blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-[#2563EB]/5 to-[#60A5FA]/5 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-[#60A5FA]/5 to-[#2563EB]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-gradient-to-br from-[#2563EB]/3 to-transparent rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-[#2563EB]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center h-16 sm:h-20">
              
              {/* Logo */}
              <Link 
                href="/" 
                className="flex items-center gap-0 leading-none group"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-transform group-hover:scale-105">
                  <Image
                    src="/logosite.png"
                    alt="Cleversub Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                
                <span className="-ml-2 sm:-ml-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter transition-colors">
                  cleversub<span className="text-[#2563EB] group-hover:text-[#60A5FA] transition-colors">.</span>
                </span>
              </Link>

            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative mt-auto border-t border-[#2563EB]/5 bg-gradient-to-b from-transparent to-[#2563EB]/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            
            {/* Footer Content */}
            <div className="flex flex-col items-center gap-6">
              
              {/* Logo Small */}
              <Link href="/" className="flex items-center gap-0 leading-none group opacity-60 hover:opacity-100 transition-opacity">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src="/logosite.png"
                    alt="Cleversub Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="-ml-2 text-lg sm:text-xl font-bold tracking-tighter">
                  cleversub<span className="text-[#2563EB]">.</span>
                </span>
              </Link>

              {/* Links */}
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm">
                <Link
                  href="/politique-de-confidentialite"
                  className="text-[#64748B] hover:text-[#2563EB] transition-colors font-medium"
                >
                  Politique de confidentialité
                </Link>
              </div>

              {/* Copyright & Location */}
              <div className="flex flex-col items-center gap-2 text-xs sm:text-sm text-[#94A3B8]">
                <p className="font-medium">Fièrement propulsé depuis la Belgique 🇧🇪</p>
                <p className="text-[#CBD5E1]">
                  © {new Date().getFullYear()} Cleversub. Tous droits réservés.
                </p>
              </div>

            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}