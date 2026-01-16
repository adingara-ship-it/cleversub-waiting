"use client";

import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const services = [
  { name: "Netflix", emoji: "🍿", color: "#E50914" },
  { name: "Spotify", emoji: "🎧", color: "#1DB954" },
  { name: "YouTube", emoji: "▶️", color: "#FF0000" },
  { name: "ChatGPT", emoji: "🤖", color: "#10A37F" },
  { name: "Adobe CC", emoji: "🎨", color: "#FF0000" },
  { name: "Disney+", emoji: "🏰", color: "#113CCF" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardsRef.current) return;
      
      const rect = cardsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      
      // Calculate progress when element enters viewport
      const progress = Math.max(0, Math.min(1, 1 - (elementTop / windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("waiting_list").insert([{ email }]);

    if (error) {
      setStatus(error.code === "23505" ? "duplicate" : "error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Animated Liquid Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      {/* Subtle Grain Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 py-12 sm:px-6 sm:py-20">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Status Badge */}
          <div className="status-badge mb-8 sm:mb-12">
            <div className="pulse-dot" />
            <span>Lancement exclusif — Belgique</span>
          </div>

          {/* Hero Title */}
          <h1 className="hero-title mb-4 sm:mb-6">
            Divisez vos factures
            <br />
            <span className="gradient-text">premium par 4</span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle mb-10 sm:mb-16">
            La première expérience de partage d'abonnements ultra-sécurisée en Belgique.
            <br className="hidden sm:block" />
            <span className="sm:inline block mt-1 sm:mt-0"> Économisez jusqu'à <strong>75%</strong> sur vos services favoris.</span>
          </p>

          {/* Premium Form */}
          <div className="form-container mb-6 sm:mb-8">
            <div className="form-glow" />
            <form onSubmit={handleSubmit} className="glass-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.be"
                disabled={status === "loading"}
                className="form-input"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="form-button"
              >
                {status === "loading" ? (
                  <div className="loader" />
                ) : (
                  "Accès prioritaire"
                )}
              </button>
            </form>
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="status-message success">
              <span>✓</span> Inscription confirmée. Préparez-vous.
            </div>
          )}
          {status === "duplicate" && (
            <div className="status-message info">
              <span>→</span> Vous êtes déjà dans la liste VIP
            </div>
          )}
          {status === "error" && (
            <div className="status-message error">
              <span>×</span> Erreur technique. Réessayez.
            </div>
          )}

          {/* Founder Benefit */}
          <p className="founder-text mt-10 mb-20 sm:mt-16 sm:mb-32">
            🎁 Membres fondateurs : Frais de service offerts à vie
          </p>
        </div>
      </div>

      {/* Stacked Cards Section */}
      <div ref={cardsRef} className="stacked-cards-section">
        <div className="stacked-cards-container">
          {services.map((service, index) => {
            const delay = index * 0.1;
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.3));
            
            return (
              <div
                key={service.name}
                className="stacked-card"
                style={{
                  transform: `translateY(${(1 - cardProgress) * 100}px) scale(${0.9 + cardProgress * 0.1})`,
                  opacity: cardProgress,
                  zIndex: services.length - index,
                }}
              >
                <div className="card-content">
                  <div className="card-emoji">{service.emoji}</div>
                  <div className="card-info">
                    <h3 className="card-title">{service.name}</h3>
                    <p className="card-subtitle">Jusqu'à 75% d'économies</p>
                  </div>
                  <div className="card-badge">Disponible</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cards-footer">
          <p>Et 9 autres services premium</p>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Instrument Sans', -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Animated Liquid Blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .blob-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #2563EB 0%, #60A5FA 100%);
          top: -10%;
          left: -5%;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(225deg, #60A5FA 0%, #2563EB 100%);
          bottom: -10%;
          right: -5%;
          animation-delay: -5s;
        }

        .blob-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #60A5FA 0%, transparent 70%);
          top: 30%;
          right: 10%;
          animation-delay: -10s;
        }

        .blob-4 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #2563EB 0%, transparent 70%);
          bottom: 20%;
          left: 15%;
          animation-delay: -15s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -40px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 30px) scale(0.9);
          }
          75% {
            transform: translate(40px, 20px) scale(1.05);
          }
        }

        /* Status Badge */
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: rgba(37, 99, 235, 0.06);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(37, 99, 235, 0.12);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563EB;
          animation: fadeInUp 0.6s ease-out;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background: #2563EB;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(37, 99, 235, 0);
          }
        }

        /* Hero Title */
        .hero-title {
          font-size: clamp(40px, 12vw, 96px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #0F172A;
          animation: fadeInUp 0.8s ease-out 0.1s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #2563EB 0%, #60A5FA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtitle */
        .subtitle {
          font-size: clamp(15px, 3.5vw, 20px);
          font-weight: 400;
          line-height: 1.6;
          color: #64748B;
          max-width: 680px;
          padding: 0 8px;
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        @media (min-width: 640px) {
          .subtitle {
            padding: 0;
          }
        }

        .subtitle strong {
          color: #0F172A;
          font-weight: 600;
        }

        /* Glass Form */
        .form-container {
          position: relative;
          max-width: 540px;
          width: 100%;
          animation: fadeInUp 0.8s ease-out 0.3s both;
        }

        .form-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #2563EB, #60A5FA);
          border-radius: 20px;
          opacity: 0.15;
          filter: blur(20px);
          transition: opacity 0.3s ease;
        }

        .form-container:hover .form-glow {
          opacity: 0.25;
        }

        .glass-form {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 6px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(37, 99, 235, 0.1);
          border-radius: 16px;
          box-shadow: 
            0 4px 24px rgba(37, 99, 235, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        @media (min-width: 640px) {
          .glass-form {
            flex-direction: row;
            gap: 12px;
            padding: 8px;
            border-radius: 18px;
          }
        }

        .form-input {
          flex: 1;
          padding: 16px 20px;
          background: transparent;
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 500;
          color: #0F172A;
          font-family: 'Instrument Sans', sans-serif;
        }

        @media (min-width: 640px) {
          .form-input {
            padding: 18px 24px;
          }
        }

        .form-input::placeholder {
          color: #94A3B8;
        }

        .form-input:disabled {
          opacity: 0.6;
        }

        .form-button {
          padding: 16px 28px;
          background: #2563EB;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Instrument Sans', sans-serif;
          white-space: nowrap;
        }

        @media (min-width: 640px) {
          .form-button {
            padding: 18px 32px;
            border-radius: 12px;
          }
        }

        .form-button:hover:not(:disabled) {
          background: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .form-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .form-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loader {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Status Messages */
        .status-message {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          animation: fadeInUp 0.4s ease-out;
        }

        @media (min-width: 640px) {
          .status-message {
            padding: 12px 20px;
            border-radius: 12px;
            font-size: 14px;
          }
        }

        .status-message.success {
          color: #059669;
          border: 1px solid rgba(5, 150, 105, 0.2);
        }

        .status-message.info {
          color: #2563EB;
          border: 1px solid rgba(37, 99, 235, 0.2);
        }

        .status-message.error {
          color: #DC2626;
          border: 1px solid rgba(220, 38, 38, 0.2);
        }

        .status-message span {
          font-size: 14px;
          font-weight: 600;
        }

        @media (min-width: 640px) {
          .status-message span {
            font-size: 16px;
          }
        }

        /* Founder Text */
        .founder-text {
          font-size: 11px;
          font-weight: 600;
          color: #64748B;
          letter-spacing: 0.05em;
          animation: fadeInUp 0.8s ease-out 0.4s both;
          padding: 0 8px;
        }

        @media (min-width: 640px) {
          .founder-text {
            font-size: 12px;
            padding: 0;
          }
        }

        /* Stacked Cards Section */
        .stacked-cards-section {
          position: relative;
          padding: 60px 16px 80px;
          background: linear-gradient(to bottom, transparent, rgba(37, 99, 235, 0.02));
        }

        @media (min-width: 640px) {
          .stacked-cards-section {
            padding: 100px 24px 120px;
          }
        }

        .stacked-cards-container {
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          min-height: 500px;
        }

        @media (min-width: 640px) {
          .stacked-cards-container {
            min-height: 600px;
          }
        }

        .stacked-card {
          position: sticky;
          top: 80px;
          margin-bottom: 16px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @media (min-width: 640px) {
          .stacked-card {
            top: 100px;
            margin-bottom: 24px;
          }
        }

        .card-content {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(37, 99, 235, 0.1);
          border-radius: 16px;
          box-shadow: 
            0 8px 32px rgba(37, 99, 235, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .card-content {
            gap: 20px;
            padding: 24px 28px;
            border-radius: 20px;
          }
        }

        .stacked-card:hover .card-content {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(37, 99, 235, 0.2);
          transform: translateY(-4px);
          box-shadow: 
            0 16px 48px rgba(37, 99, 235, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .card-emoji {
          font-size: 36px;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .card-emoji {
            font-size: 48px;
          }
        }

        .card-info {
          flex: 1;
          text-align: left;
          min-width: 0;
        }

        .card-title {
          font-size: 17px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 2px;
        }

        @media (min-width: 640px) {
          .card-title {
            font-size: 20px;
            margin-bottom: 4px;
          }
        }

        .card-subtitle {
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
        }

        @media (min-width: 640px) {
          .card-subtitle {
            font-size: 14px;
          }
        }

        .card-badge {
          padding: 6px 12px;
          background: rgba(37, 99, 235, 0.1);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #2563EB;
          white-space: nowrap;
          flex-shrink: 0;
        }

        @media (min-width: 640px) {
          .card-badge {
            padding: 6px 14px;
            font-size: 12px;
          }
        }

        .cards-footer {
          text-align: center;
          margin-top: 40px;
          padding: 16px;
        }

        @media (min-width: 640px) {
          .cards-footer {
            margin-top: 60px;
            padding: 20px;
          }
        }

        .cards-footer p {
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(37, 99, 235, 0.08);
          border-radius: 100px;
          display: inline-block;
        }

        @media (min-width: 640px) {
          .cards-footer p {
            font-size: 14px;
            padding: 12px 24px;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Selection */
        ::selection {
          background: #2563EB;
          color: white;
        }
      `}</style>
    </div>
  );
}