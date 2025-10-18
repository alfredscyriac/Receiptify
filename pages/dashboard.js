import createClient, { supabase } from "@/lib/utils/supabaseClient";
import CategorySidebar from "@/components/dashboard/CategorySidebar";
import UploadButton from "@/components/dashboard/UploadButton";
import SearchBar from "@/components/dashboard/SearchBar";
import ReceiptGrid from "@/components/dashboard/ReceiptGrid";
import { useState, useEffect } from "react";

const Dashboard = () => {
    const [receipts, setReceipts] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("Food & Dining")

    useEffect(() => {
        handleCategorySelect("Food & Dining")
    }, [])

    const handleUploadComplete = (newReceipt) => {
        console.log('New receipt uploaded:', newReceipt)
        setReceipts(prev => [newReceipt, ...prev])
    }

    const handleSearch = async (searchQuery) => {
        if (!searchQuery || searchQuery.trim() === '') {
            setSearchResults([])
            setIsSearching(false)
            return
        }

        setIsSearching(true)
        const results = await getRecieptsBySearchQuery(searchQuery)
        setSearchResults(results)
    }

    const handleCategorySelect = async (categoryName) => {
        setSelectedCategory(categoryName)
        setIsSearching(false)
        const results = await getReceipts(categoryName)
        setReceipts(results)
    }

    const getReceipts = async(category_name) => {
        const supabase = createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if(userError || !user) {
            console.error(userError);
            return;
        }

        const { data: receipts, error } = await supabase
            .from("receipts")
            .select("*")
            .eq("category", category_name)
            .eq("user_id", user.id);
        
        if (error) {
            console.error(error);
            return [];
        }
        return receipts
    }

    const getRecieptsBySearchQuery = async(searchQuery) => {
        const supabase = createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if(userError || !user) {
            console.error(userError);
            return [];
        }

        const { data: receipts, error } = await supabase
            .from("receipts")
            .select("*")
            .ilike("name", `%${searchQuery}%`)
            .eq("user_id", user.id);
        
        if (error) {
            console.error(error);
            return []
        }
        return receipts
    }

    const deleteReceipt = async(receiptId) => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if(userError || !user) {
            console.error(userError);
            return;git 
        }
        try {
            const response = await fetch("/api/db/deleteReceipts", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ receiptId, userId: user.id }),
            });

            const result = await response.json()
            if (!response.ok) {
                console.error("Delete failed:", result);
                return { error: result };
            }
            return result

        } catch(err) {
            console.error(err)
            return
        }
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
                            <CategorySidebar
                                onSelectCategory={handleCategorySelect}
                                selectedCategory={selectedCategory}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <SearchBar onSearch={handleSearch}/>
                        </div>
                        <ReceiptGrid />
                    </div>
                </div>
            </div>
        </div>  
  )
}

export default Dashboard