import { ArrowRight } from "lucide-react";

const Navbar = () => {
    return (
        <div className="sticky top-0 flex justify-between h-fit z-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 overflow-hidden blur-1xl">
            <div className="flex items-center justify-between w-full h-20">
                <div className="flex items-center justify-center ml-8">
                    <img src="/receiptifylogo.png" className="w-15 transform rotate-6 z-50" />
                    <h1 className="font-extrabold text-4xl italic z-50 ">Receiptify</h1>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer px-6 py-4 mr-8 rounded-4xl font-semibold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
} 

export default Navbar;