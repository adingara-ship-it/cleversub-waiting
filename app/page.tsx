"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const services = [
  { name: "Netflix", emoji: "🍿" },
  { name: "Spotify", emoji: "🎧" },
  { name: "YouTube", emoji: "▶️" },
  { name: "ChatGPT", emoji: "🤖" },
  { name: "Adobe CC", emoji: "🎨" },
  { name: "Disney+", emoji: "🏰" },
  { name: "Prime Video", emoji: "📦" },
  { name: "Canva Pro", emoji: "✨" },
  { name: "Apple One", emoji: "🍎" },
  { name: "Office 365", emoji: "💼" },
  { name: "HBO Max", emoji: "🎬" },
  { name: "PS Plus", emoji: "🎮" },
  { name: "Game Pass", emoji: "❎" },
  { name: "Deezer", emoji: "🎵" },
  { name: "Audible", emoji: "📖" },
];

export default function Home() {
  const marqueeList = [...services, ...services];

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("waiting_list")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        setStatus("duplicate"); // email déjà présent (unique constraint)
      } else {
        setStatus("error");
      }
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center overflow-hidden">
      {/* Marquee */}
      <div className="w-full max-w-full mb-8 md:mb-12 relative fade-sides">
        <div className="marquee-track flex gap-4 md:gap-8 w-max">
          {marqueeList.map((service, index) => (
            <div key={index} className="logo-card group">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl mb-2 md:mb-4 flex items-center justify-center bg-[#FFFFFF] border border-gray-100 shadow-sm">
                <span className="text-xl md:text-4xl">
                  {service.emoji}
                </span>
              </div>
              <span className="text-[9px] md:text-[12px] font-bold uppercase tracking-widest text-gray-400">
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Texte */}
      <div className="max-w-5xl w-full text-center px-6 mb-12 md:mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#2563EB] text-sm font-bold mb-8 border border-blue-100">
          <span className="animate-pulse">⏳</span> Site en construction — Belgique 🇧🇪
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-[#0F172A] leading-[0.95] md:leading-[1]">
          Divisez vos factures <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#60A5FA]">
            premium par 4.
          </span>
        </h1>

        <p className="text-base md:text-xl lg:text-2xl text-gray-500 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          Nous créons la première plateforme belge de partage d'abonnements.
          Bientôt, économisez jusqu'à 75% sur Netflix, Spotify et plus encore, en toute sécurité.
        </p>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xl mx-auto w-full"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.be"
            className="px-6 py-4 md:py-5 rounded-2xl border-2 border-gray-100 bg-[#FFFFFF] shadow-sm focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] w-full transition-all text-[#0F172A] font-semibold text-lg"
            disabled={status === "loading"}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-[#2563EB] text-white font-bold text-lg shadow-xl shadow-[#2563EB]/25 hover:bg-[#1d4ed8] hover:-translate-y-1 transition-all active:scale-95 w-full sm:w-auto whitespace-nowrap disabled:opacity-50"
          >
            {status === "loading" ? "Envoi..." : "M'avertir du lancement"}
          </button>
        </form>

        {/* Feedback */}
        {status === "success" && (
          <p className="mt-6 text-green-600 font-semibold">
            ✅ Merci ! Tu seras averti du lancement.
          </p>
        )}

        {status === "duplicate" && (
          <p className="mt-6 text-blue-600 font-semibold">
            ℹ️ Cet email est déjà inscrit.
          </p>
        )}

        {status === "error" && (
          <p className="mt-6 text-red-600 font-semibold">
            ❌ Une erreur est survenue. Réessaie plus tard.
          </p>
        )}

        <p className="mt-6 text-sm text-gray-400 font-medium italic">
          Inscrivez-vous pour bénéficier des frais de service offerts au lancement.
        </p>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          animation: scroll 45s linear infinite;
          will-change: transform;
        }

        .logo-card {
          flex-shrink: 0;
          width: 90px;
          height: 110px;
          background: #FFFFFF;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #F1F5F9;
          box-shadow: 0 4px 15px -10px rgba(0, 0, 0, 0.05);
        }

        @media (min-width: 768px) {
          .logo-card {
            width: 150px;
            height: 170px;
            border-radius: 40px;
          }
        }

        .fade-sides {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </div>
  );
}
