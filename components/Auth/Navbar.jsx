import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-0 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo section */}
          <div className="flex items-center gap-2">
            <img
              src="/receiptifylogo.png"
              className="w-12 h-12 transform rotate-6"
              alt="Receiptify logo"
            />
            <h1 className="font-extrabold text-3xl md:text-4xl italic text-white">
              Receiptify
            </h1>
          </div>

          {/* CTA button */}
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-base md:text-lg flex items-center gap-2 transition-all hover:scale-105"
            onClick={() => router.push("/signup")}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;