import { Scan, FolderKanban, TrendingUp } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Scan,
      title: "AI-Powered Scanning",
      description:
        "Upload receipts and let AI instantly extract store name, date, total, and category",
      image: "/feature-scan.jpg",
    },
    {
      icon: FolderKanban,
      title: "Smart Organization",
      description:
        "Auto-categorized folders plus custom categories make finding receipts effortless",
      image: "/feature-organize.jpg",
    },
    {
      icon: TrendingUp,
      title: "Financial Insights",
      description:
        "Track your 30-day spending patterns and see exactly where your money goes",
      image: "/feature-insights.jpg",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to make receipt management simple and
            efficient
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <feature.icon className="w-7 h-7 text-purple-400" />
              </div>

              <h3 className="text-2xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};