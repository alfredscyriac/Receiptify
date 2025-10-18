import React from 'react'
import { SearchIcon } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='relative'>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 rounded-xl bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search for receipts..."
        />
    </div>
  )
}

export default SearchBar