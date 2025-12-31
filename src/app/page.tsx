import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Guarantee from "@/components/Guarantee";
import Difference from "@/components/Difference";
import Products from "@/components/Products";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Difference />
      <Benefits />
      <Process />
      <Testimonials />
      <Guarantee />
      <Products />
      <ContactForm />
      <Footer />
    </main>
  );
}
