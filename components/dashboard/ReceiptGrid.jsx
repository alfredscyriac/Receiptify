import React from 'react'

const ReceiptGrid = ({ receipts, onSelectReceipt, selectedCategory, searchQuery, }) => {
    const renderEmptyState = () => {
        if (searchQuery && receipts.length === 0) {
            return (
                <div className="text-center py-16 flex flex-col items-center">
                    <div className="bg-gray-700 bg-opacity-40 rounded-full p-4 mb-4">
                        <SearchXIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-300 mb-1">
                        No matching receipts
                    </h3>
                    <p className="text-gray-400">Try adjusting your search terms</p>
                </div>
            )
        }
        if (selectedCategory && receipts.length === 0) {
            return (
                <div className="text-center py-16 flex flex-col items-center">
                    <div className="bg-gray-700 bg-opacity-40 rounded-full p-4 mb-4">
                        <FolderIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-300 mb-1">
                        This category is empty
                    </h3>
                    <p className="text-gray-400">Upload receipts to see them here</p>
                </div>
            )
        }
        if (!selectedCategory && !searchQuery) {
            return (
                <div className="text-center py-16 flex flex-col items-center">
                    <div className="bg-gray-700 bg-opacity-40 rounded-full p-4 mb-4">
                        <FileQuestionIcon className="h-10 w-10 text-gray-400"/>
                    </div>
                    <h3 className="text-xl font-medium text-gray-300 mb-1">
                        Select a category or search
                    </h3>
                    <p className="text-gray-400">Upload receipts to get started</p>
                </div>
            )
        }
        return null
    }
    return (
        <div className='w-full grid-cols-4 border-2 border-white'>

        </div>
    )
}

export default ReceiptGrid