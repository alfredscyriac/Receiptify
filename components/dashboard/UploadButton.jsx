import React, { useRef } from 'react'
import { UploadCloudIcon } from 'lucide-react'

const UploadButton = () => {
  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
        <div className='flex justify-center mb-3'>
            <div className='bg-gray-400 rounded-full p-4'>
                <UploadCloudIcon className="h-8 w-8 text-white" />
            </div>
        </div>
        <h3 className="text-white font-medium text-lg mb-1">Upload Receipt</h3>
        <p className="text-blue-100 text-sm">Drag & drop or click to browse</p>
    </div>
  )
}

export default UploadButton