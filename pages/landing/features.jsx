import { Scan, FolderKanban, TrendingUp } from "lucide-react";
import featureScan from "@/assets/feature-scan.jpg";
import featureOrganize from "@/assets/feature-organize.jpg";
import featureInsights from "@/assets/feature-insights.jpg";

export const Features = () => {
  const features = [
    {
      icon: Scan,
      title: "AI-Powered Scanning",
      description:
        "Upload receipts and let AI instantly extract store name, date, total, and category",
      image: featureScan,
    },
    {
      icon: FolderKanban,
      title: "Smart Organization",
      description:
        "Auto-categorized folders plus custom categories make finding receipts effortless",
      image: featureOrganize,
    },
    {
      icon: TrendingUp,
      title: "Financial Insights",
      description:
        "Track your 30-day spending patterns and see exactly where your money goes",
      image: featureInsights,
    },
  ];

  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-glow rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-glow rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
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
              className="group bg-surface-dark-elevated/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-6 relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
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
