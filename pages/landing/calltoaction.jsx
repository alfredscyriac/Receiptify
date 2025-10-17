import { ArrowRight, CheckCircle2 } from "lucide-react";

export const CTA = () => {
  const benefits = [
    "No credit card required",
    "Free forever plan",
    "Set up in under 2 minutes",
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500" />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Join thousands of users who've ditched paper receipts for good
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
              Start Free Today
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              Schedule a Demo
            </button>
          </div>

          <p className="text-white/80 mt-8 text-sm">
            Join users managing their receipts smarter
          </p>
        </div>
      </div>
    </section>
  );
};