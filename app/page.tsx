import CTA from "@/components/CTA";
import FAQs from "@/components/FAQs";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <div className="grid-background"></div>
      <HeroSection />
      <Features />
      <HowItWorks />
      <FAQs/>
      <CTA />
    </>
  );
}
