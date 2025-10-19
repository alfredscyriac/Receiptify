import createClient from "@/lib/utils/supabaseClient";
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

    const getReceipts = async(category_name = selectedCategory) => {
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
            .eq("user_id", user.id)
            .order('created_at', { ascending: true })
        
        if (error) {
            console.error(error);
            return [];
        }
        console.log(receipts, category_name)
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
            .ilike("store_name", `%${searchQuery}%`)
            .eq("user_id", user.id);
        
        if (error) {
            console.error(error);
            return []
        }
        console.log(receipts)
        return receipts
    }

    const deleteReceipt = async(receiptId) => {
        const supabase = createClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if(userError || !user) {
            console.error(userError);
            return;
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

    const filteredReceipts = receipts.filter(receipt => {
    // If no category selected, show all
    if (!selectedCategory) return true
    
    // Match category
    const receiptCategory = receipt.category || 'Miscellaneous'
    return receiptCategory === selectedCategory
    })

    return (
        <div className="w-full min-h-screen text-white relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />

            {/* Animated background elements - subtle */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl" />
                <div
                    className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-cyan-400 rounded-full blur-3xl"
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8 relative z-10">
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
                        <ReceiptGrid
                            receipts={isSearching ? searchResults : filteredReceipts}
                            selectedCategory={selectedCategory}
                            isSearching={isSearching}
                        />
                    </div>
                </div>
            </div>
        </div>  
  )
}

export default Dashboard