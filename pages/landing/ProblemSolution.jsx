import { FileX2, Search, Smartphone } from "lucide-react";

export const ProblemSolution = () => {
  const problems = [
    {
      icon: FileX2,
      title: "Lost Receipts",
      description:
        "Physical receipts fade, tear, and get lost when you need them most",
    },
    {
      icon: Smartphone,
      title: "Cluttered Photos",
      description:
        "Camera rolls full of receipts make finding what you need impossible",
    },
    {
      icon: Search,
      title: "No Organization",
      description:
        "Without categories or search, retrieving receipts wastes valuable time",
    },
  ];

  return (
    <section className="py-24 bg-surface-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Receipt Problem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Managing physical receipts is frustrating and inefficient. We built
            a better solution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-surface-light-elevated p-8 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-destructive/10 rounded-xl flex items-center justify-center mb-6">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {problem.title}
              </h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-accent p-12 rounded-3xl text-center shadow-glow animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            There's a Better Way
          </h3>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Store receipts digitally, organize them automatically with AI, and
            find exactly what you need in seconds—all while tracking your
            spending effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
};
