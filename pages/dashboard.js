import CategorySidebar from "@/components/dashboard/CategorySidebar";

const Dashboard = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pl-10">
            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Receipt Manager
            </h1>
            <div className="flex flex-col">
                <h2 className="text-lg font-medium mb-3 text-blue-300">
                    Categories
                </h2>
                <CategorySidebar />
            </div>
        </div>  
  )
}

export default Dashboard