import { Hero } from "../components/landing/Hero";
import { ProblemSolution } from "../components/landing/ProblemSolution";
import { Features } from "../components/landing/Features";
import { HowItWorks } from "../components/landing/HowItWorks";
import { CTA } from "../components/landing/CallToAction";
import Navbar from "@/components/auth/Navbar";

const Index = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <CTA />
      </div>
    </>
  );
};

export default Index;
