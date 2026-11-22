import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="legal-page">
        <article className="container legal-content" aria-labelledby="legal-title">
          <header>
            <p className="eyebrow">INFORMATIONS LÉGALES</p>
            <h1 id="legal-title">{title}</h1>
          </header>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
