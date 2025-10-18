import { Hero } from "./landing/Hero";
import { ProblemSolution } from "./landing/ProblemSolution";
import { Features } from "./landing/Features";
import { HowItWorks } from "./landing/HowItWorks";
import { CTA } from "./landing/CallToAction";
import Navbar from "@/components/Auth/Navbar";

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
