import React from 'react'
import RepoCard from './RepoCard'

function Cards({repos, onSelectRepo}) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} onClick={() => onSelectRepo(repo)} />
      ))}
        
    </div>
  )
}

export default Cards