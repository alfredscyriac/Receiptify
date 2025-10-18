import { ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    return (
        <div className="sticky top-0 flex justify-between h-fit z-50 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 overflow-hidden pt-3 pb-3">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-50 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
            <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
            />
        </div>


        <div className="flex items-center justify-between w-full h-20 relative z-10">
            <div className="flex items-center justify-center ml-12">
            <img src="/receiptifylogo.png" className="w-15 transform rotate-6 z-50" />
            <h1 className="font-extrabold text-4xl italic z-50">Receiptify</h1>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer px-6 py-4 mr-12 rounded-4xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
            onClick={() => router.push("/signup")}>
            Get Started Free
            <ArrowRight className="w-5 h-5" />
            </button>
        </div>
        </div>
    );
    };

export default Navbar;