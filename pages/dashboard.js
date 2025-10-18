import CategorySidebar from "@/components/dashboard/CategorySidebar";
import UploadButton from "@/components/dashboard/UploadButton";
import SearchBar from "@/components/dashboard/SearchBar";
import { useState } from "react";

const Dashboard = () => {
    const [receipts, setReceipts] = useState([])

    const handleUploadComplete = (newReceipt) => {
        console.log('New receipt uploaded:', newReceipt)
        setReceipts(prev => [newReceipt, ...prev])
    }
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Receipt Manager
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                    <div className="md:col-span-1">
                        <UploadButton onUploadComplete={handleUploadComplete}/>
                        <div className="mt-6">
                            <h2 className="text-lg font-medium mb-3 text-blue-300">
                                Categories
                            </h2>
                            <CategorySidebar/>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <SearchBar/>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
  )
}

export default Dashboard