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
    <section className="py-24 bg-purple-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            The Receipt Problem
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Managing physical receipts is frustrating and inefficient
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                <problem.icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {problem.title}
              </h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 p-12 rounded-3xl text-center shadow-xl">
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