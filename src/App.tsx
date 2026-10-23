import { MessageCircle } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Plans from "./components/Plans";
import Journey from "./components/Journey";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Coverage from "./components/Coverage";
import Footer from "./components/Footer";
import { waLink } from "./lib";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Plans />
        <Journey />
        <Features />
        <Testimonials />
        <Coverage />
      </main>
      <Footer />
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lime text-navy shadow-[0_10px_30px_-5px_rgba(112,224,0,0.7)] transition hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
    </>
  );
}
