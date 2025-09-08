import React from "react";
import { FaStar, FaCodeBranch } from "react-icons/fa";

function RepoCard({ repo, onClick }) {
  return (
    <div className="bg-white text-gray-900 my-4 p-5 rounded-xl shadow-md hover:shadow-lg transition w-full max-w-md flex flex-col cursor-pointer" onClick={onClick}>
      {/* Header: Avatar + Repo Name */}
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={repo.owner.avatar_url}
          alt="Owner Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <a
            href={repo.owner.html_url}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {repo ? repo.name : "Repo Name"}
          </a>
          <p >{repo.owner.login}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
         {repo.description || "No description available."}
      </p>

      {/* Stats Row */}
      <div className=" flex items-center space-x-5 text-sm text-gray-600 mt-auto">
        <span className="flex items-center space-x-1 mt-auto">
          <FaStar className="text-yellow-500" />
          <span>{repo.stargazers_count || "0"}</span>
        </span>
        <span className="flex items-center space-x-1">
          <FaCodeBranch className="text-gray-500" />
          <span>{repo.forks_count || "0"}</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
          <span> {repo.language || "Not specified"}</span>
        </span>
        <span className="ml-auto text-xs text-gray-400">{new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default RepoCard;
