import { Calendar, DollarSign, Download, FileQuestionIcon, FolderIcon, SearchXIcon, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'

const ReceiptGrid = ({ receipts = [], onSelectReceipt, selectedCategory, searchQuery, onDelete }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedReceipt, setSelectedReceipt] = useState(null)

    const handleDelete = async (receiptId) => {
        if (!receiptId) return
        if (onDelete) {
            // allow parent to handle deletion (e.g. API call + state update)
            await onDelete(receiptId)
        }
    }

    const handleImageClick = (imageUrl, receipt) => {
        setSelectedImage(imageUrl)
        setSelectedReceipt(receipt || null)
        // also notify parent if they want to handle selection
        if (onSelectReceipt) onSelectReceipt(receipt)
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

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

    if (!receipts || receipts.length === 0) {
        return (
            <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                {renderEmptyState()}
            </div>
        )
    }

    return (
        <>
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {receipts.map((receipt) => {
                        // Map DB fields (common names used elsewhere in project)
                        const imageUrl = receipt.image_url || receipt.imageUrl || receipt.url || null
                        const merchant = receipt.store_name || receipt.merchant_name || receipt.name || 'Unknown Merchant'
                        const amountRaw = receipt.total_amount || receipt.totalAmount || receipt.amount || 0
                        const numericAmount = parseFloat(amountRaw)
                        const displayAmount = isFinite(numericAmount) && !isNaN(numericAmount) ? numericAmount.toFixed(2) : '0.00'
                        const category = receipt.category || 'Miscellaneous'
                        const dateRaw = receipt.receipt_date || receipt.receiptDate || receipt.created_at || receipt.date || null
                        const dateObj = dateRaw ? new Date(dateRaw) : null
                        const displayDate = dateObj && !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date'

                        return (
                            <div
                                key={receipt.id}
                                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                
                                <div className="relative z-10">
                                    {/* Receipt Image */}
                                    {imageUrl ? (
                                        <div 
                                            className="w-full h-44 bg-gray-700 cursor-pointer flex items-center justify-center overflow-hidden"
                                            onClick={() => handleImageClick(imageUrl, receipt)}
                                        >
                                            <img 
                                                src={imageUrl} 
                                                alt={merchant}
                                                className="max-w-full max-h-full object-contain transition-all duration-200"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-44 bg-gray-700 flex items-center justify-center text-gray-400">
                                            <FileQuestionIcon className="w-8 h-8" />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white mb-2 truncate">
                                            {merchant}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-3">
                                            <DollarSign className="w-5 h-5 text-green-400" />
                                            <span className="text-2xl font-bold text-green-400">
                                                ${displayAmount}
                                            </span>
                                        </div>
                                        
                                        <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full mb-3">
                                            <span className="text-sm text-purple-300">{category}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                                            <Calendar className="w-4 h-4" />
                                            <span>{displayDate}</span>
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleImageClick(imageUrl, receipt)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Download className="w-4 h-4" />
                                                View
                                            </button>
                                            {imageUrl && (
                                                <a
                                                    href={imageUrl}
                                                    download
                                                    className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                                                >
                                                    <Download className="w-4 h-4 mr-1" />
                                                    Download
                                                </a>
                                            )}
                                            <button
                                                onClick={() => handleDelete(receipt.id)}
                                                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-[90vh] w-full">
                        <button
                            onClick={closeModal}
                            className="absolute -top-12 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Receipt enlarged"
                            className="w-full h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default ReceiptGrid