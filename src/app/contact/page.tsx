import { createPageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import ContactDirectory from "@/components/ContactDirectory";
import Footer from "@/components/Footer";

export const metadata = createPageMetadata("/contact/");

export default function ContactPage() {
  return (
    <>
      <Header />
      <main><ContactDirectory /></main>
      <Footer />
    </>
  );
}
