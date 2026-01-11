"use client";

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="flex-grow flex flex-col items-center py-12 md:py-20 px-6">
      <div className="max-w-3xl w-full">
        {/* Bouton Retour */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-bold text-[#2563EB] mb-8 hover:underline"
        >
          ← Retour à l'accueil
        </Link>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0F172A] mb-10">
          Politique de <span className="text-[#2563EB]">Confidentialité.</span>
        </h1>

        <div className="prose prose-slate max-w-none text-gray-600 space-y-8 font-medium leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Introduction</h2>
            <p>
              Bienvenue sur Cleversub. Nous accordons une importance capitale à la protection de vos données personnelles. 
              Cette page vous explique comment nous traitons votre adresse e-mail lorsque vous vous inscrivez sur notre liste d'attente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Collecte des données</h2>
            <p>
              Dans le cadre de notre page de lancement, nous collectons une seule donnée personnelle : 
              votre **adresse e-mail**. Cette collecte s'effectue uniquement lorsque vous la saisissez volontairement dans le formulaire prévu à cet effet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Finalité du traitement</h2>
            <p>
              Votre adresse e-mail est utilisée exclusivement pour :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>Vous informer personnellement du lancement officiel de Cleversub.</li>
              <li>Vous transmettre des informations importantes liées à votre accès prioritaire.</li>
            </ul>
            <p className="mt-3">
              Nous ne pratiquons aucun spam et ne revendons jamais vos données à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Stockage et Sécurité (Supabase)</h2>
            <p>
              Vos données sont stockées de manière sécurisée via la technologie **Supabase**, qui garantit un haut niveau de protection et de chiffrement. 
              En tant que plateforme belge, nous veillons à ce que nos prestataires respectent les normes de sécurité en vigueur au sein de l'Union Européenne.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Durée de conservation</h2>
            <p>
              Nous conservons votre adresse e-mail jusqu'au lancement de la plateforme. Une fois le service lancé, vous aurez la possibilité de maintenir votre compte ou de demander la suppression immédiate de vos informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Vos droits (RGPD)</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
              À tout moment, vous pouvez demander à être retiré de notre liste d'attente.
            </p>
            <p className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
              Pour toute demande concernant vos données, contactez-nous à : <span className="text-[#2563EB] font-bold">[Cleversubteams@gmail.com]</span>
            </p>
          </section>

          <section className="pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              Dernière mise à jour : 8 janvier 2026 — Cleversub Belgique 🇧🇪
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}