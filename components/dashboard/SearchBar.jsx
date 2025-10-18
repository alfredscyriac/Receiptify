import React, { useState, useEffect } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if(onSearch) {
        onSearch(searchValue)
      }
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [searchValue, onSearch])

  const handleClear = () => {
    setSearchValue('')
  }

  return (
    <div className='relative'>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="block w-full pl-12 pr-4 py-3 rounded-xl bg-gray-700 bg-opacity-50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Search for receipts..."
        />
        {searchValue && (
          <button
            onClick={handleClear}
            className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors'
          >
            <XIcon className='h-5 w-5'/>
          </button>
        )}
    </div>
  )
}

export default SearchBar