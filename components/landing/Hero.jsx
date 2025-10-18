import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-white space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Receipts,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                Perfectly Organized
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl">
              Never lose a receipt again. AI-powered organization keeps your
              finances in perfect order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 hover:cursor-pointer">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/signup" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg backdrop-blur-sm transition-all hover:cursor-pointer">
                Sign up 
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-30" />
            <img
              src="/hero-image.jpg"
              alt="Receipt management dashboard"
              className="relative rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};