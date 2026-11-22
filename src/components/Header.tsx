"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "À propos", href: "/#apropos" },
  { label: "Contact", href: "/contact/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-content">
        {/* Owner-approved typographic wordmark; the K favicon is a separate brand icon. */}
        <Link className="brand" href="/#accueil" aria-label="BeKlean, accueil">Be<span>Klean</span><span className="brand-dot">.</span></Link>
        <nav aria-label="Navigation principale" className="desktop-nav">
          {navigation.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-dark desktop-cta" href="/#contact">Demander un devis <span aria-hidden="true">↗</span></Link>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setOpen(v => !v)}>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Navigation mobile" className="mobile-nav">
        {navigation.map(item => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link href="/#contact" onClick={() => setOpen(false)}>Demander un devis ↗</Link>
      </nav>}
    </header>
  );
}
