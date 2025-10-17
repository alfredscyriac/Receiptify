import { Hero } from "./landing/Hero";
import { ProblemSolution } from "./landing/ProblemSolution";
import { Features } from "./landing/Features";
import { HowItWorks } from "./landing/HowItWorks";
import { CTA } from "./landing/calltoaction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <CTA />
    </div>
  );
};

export default Index;
