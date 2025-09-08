import React from 'react'
import { FaSearch, FaGithub } from "react-icons/fa";

function SearchBar({inputval , setInputval, fetchRepos}) {
  return (
     <div className="w-full flex justify-center my-4">
      <form onSubmit={(e) => { e.preventDefault(); fetchRepos(); }}  className="w-1/2"  >
        <div className="relative  ">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
          <input
          type="text"
          placeholder="Search repo..."
          value={inputval}
          onChange={(e) => setInputval(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"/>
          <FaGithub className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
        </div>
      </form>
    </div>
  )
}

export default SearchBar