import React, { useRef, useState } from 'react'
import { UploadCloudIcon } from 'lucide-react'

const UploadButton = ({ onFileSelect }) => {
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const files = e.target.files 
        if (files && files.length > 0) {
            handleFiles(files)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const files = e.dataTransfer.files
        if (files && files.length > 0) {
            handleFiles(files)
        }
    }

    const handleFiles = (files) => {
        const file = files[0]

        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!validImageTypes.includes(file.type)) {
            alert("Please upload a valid image file (JPEG, PNG, or WEBP")
            return
        }

        const maxSize = 10 * 1024 * 1024 // 10MB in bytes 
        if (file.size > maxSize) {
            alert("File size must be less than 10MB")
            return
        }

        if (onFileSelect) {
            onFileSelect(file)
        }
    }

    return (
    <>
        <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
        />
        <div 
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isDragging ? 'ring-4 ring-cyan-500 scale-105' : ''}`}
        >
            <div className='flex justify-center mb-3'>
                <div className={`bg-gray-400 rounded-full p-4 transition-all duration-300 ${isDragging ? 'bg-cyan-500 scale-110' : ''}`}>
                    <UploadCloudIcon className="h-8 w-8 text-white" />
                </div>
            </div>
            <h3 className="text-white font-medium text-lg mb-1">Upload Receipt</h3>
            <p className="text-blue-100 text-sm">
                {isDragging ? 'Drop your receipt here' : 'Drag & drop or click to browse'}
            </p>
        </div>
    </>
  )
}

export default UploadButton