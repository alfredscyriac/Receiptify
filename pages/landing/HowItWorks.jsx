import { Upload, Sparkles, Search } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      number: "01",
      title: "Upload Your Receipt",
      description:
        "Simply drag and drop or upload a photo of any receipt from your phone or computer",
    },
    {
      icon: Sparkles,
      number: "02",
      title: "AI Does the Work",
      description:
        "Our AI instantly extracts all key information and categorizes it automatically",
    },
    {
      icon: Search,
      number: "03",
      title: "Find Anything Instantly",
      description:
        "Search by store, date, or category. Download receipts whenever you need them",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to never lose a receipt again
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-30" />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                {step.number}
              </div>

              <div className="bg-white rounded-2xl p-8 pt-16 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-purple-600" />
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};