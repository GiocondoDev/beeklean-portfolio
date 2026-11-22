import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.page} aria-labelledby="not-found-title">
        <div className={`container ${styles.content}`}>
          <h1 id="not-found-title" className={styles.title}>404 — Page introuvable</h1>
          <p className={styles.description}>La page que vous recherchez n&apos;existe pas ou a été déplacée.</p>
          <Link className={`button button-dark ${styles.homeLink}`} href="/">Retour à l&apos;accueil</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
