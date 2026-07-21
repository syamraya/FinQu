import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Categories from "@/components/home/Categories";
import HowItWorks from "@/components/home/HowItWorks";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <Features />

      <Stats />

      <Categories />

      <HowItWorks />

      <CTA />

      <Footer />
    </>
  );
}