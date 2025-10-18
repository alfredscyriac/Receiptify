import React, { useRef, useState } from 'react'
import { UploadCloudIcon, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { uploadReceipt } from '@/lib/utils/uploadReceipt'
import { createClient } from '@/lib/utils/supabaseClient'

const UploadButton = ({ onUploadComplete }) => {
    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null) 
    const [uploadedCategory, setUploadedCategory] = useState(null)

    const handleClick = () => {
        if (!uploading) {
            fileInputRef.current?.click()
        }
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
        if (!uploading) {
            setIsDragging(true)
        }
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

        if (!uploading) {
            const files = e.dataTransfer.files
            if (files && files.length > 0) {
                handleFiles(files)
            }
        }
    }

    const handleFiles = async (files) => {
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

        await processUpload(file)
    }

    const processUpload = async (file) => {
        setUploading(true)
        setUploadStatus(null)

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser()

            if (userError || !user) {
                throw new Error('You must be logged in to upload receipts')
            }

            const result = await uploadReceipt(file, user.id)

            if (result.success) {
                setUploadStatus('success')
                setUploadedCategory(result.analysis.category)

                if (onUploadComplete) {
                    onUploadComplete(result.receipt)
                }

                setTimeout(() => {
                    setUploadStatus(null)
                    setUploadedCategory(null)
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ''
                    }
                }, 4000)
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            console.error('Upload error:', error)
            setUploadStatus('error')
            alert(`Upload failed: ${error.message}`)
            
            setTimeout(() => {
                setUploadStatus(null)
            }, 3000)
        } finally {
            setUploading(false)
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
            disabled={uploading}
        />
        <div 
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isDragging ? 'ring-4 ring-cyan-500 scale-105' : ''} ${uploading ? 'opacity-75 cursor-wait' : ''} ${uploadStatus === 'success' ? 'ring-4 ring-green-500' : ''} ${uploadStatus === 'error' ? 'ring-4 ring-red-500' : ''}`}
        >
            <div className='flex justify-center mb-3'>
                <div className={`bg-gray-400 rounded-full p-4 transition-all duration-300 ${isDragging ? 'bg-cyan-500 scale-110' : ''} ${uploading ? 'bg-blue-500 animate-pulse' : ''} ${uploadStatus === 'success' ? 'bg-green-500' : ''} ${uploadStatus === 'error' ? 'bg-red-500' : ''}`}>
                    {uploading && <Loader2 className="h-8 w-8 text-white animate-spin" />}
                    {!uploading && uploadStatus === 'success' && <CheckCircle className="h-8 w-8 text-white" />}
                    {!uploading && uploadStatus === 'error' && <XCircle className="h-8 w-8 text-white" />}
                    {!uploading && !uploadStatus && <UploadCloudIcon className="h-8 w-8 text-white" />}
                </div>
            </div>
            <h3 className="text-white font-medium text-lg mb-1">
                {uploading && 'Analyzing Receipt...'}
                {!uploading && uploadStatus === 'success' && 'Upload Successful!'}
                {!uploading && uploadStatus === 'error' && 'Upload Failed'}
                {!uploading && !uploadStatus && 'Upload Receipt'}
            </h3>
            <p className="text-blue-100 text-sm">
                {uploading && 'Please wait while we process your receipt'}
                {!uploading && uploadStatus === 'success' && `Receipt saved to ${uploadedCategory|| 'your account'}`}
                {!uploading && uploadStatus === 'error' && 'Please try again'}
                {!uploading && !uploadStatus && (isDragging ? 'Drop your receipt here' : 'Drag & drop or click to browse')}
            </p>
        </div>
    </>
  )
}

export default UploadButton