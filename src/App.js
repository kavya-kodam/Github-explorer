import index from './index.css';
import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Cards from './components/Cards';
import RepoDetailModal from './components/RepoDetailModal';


function App() {
    const [inputval, setInputval] = React.useState("");
    const [repos, setRepos] = React.useState([]);
    const [selectedRepo, setSelectedRepo] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchRepos = () =>{
        //fetch repos from github api
        fetch(`https://api.github.com/search/repositories?q=${inputval || "javascript"}&sort=stars&order=desc`)
        .then(res => res.json())
        .then(data => setRepos(data.items)) // data.items is the array of repos
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
    React.useEffect(() => {
        fetchRepos();
    }, []);
    return(
    <>
        <Header/>
        <SearchBar inputval={inputval} setInputval={setInputval} fetchRepos={fetchRepos} />
        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        <Cards repos={repos} onSelectRepo={setSelectedRepo} />
        {selectedRepo && (
            <RepoDetailModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        )}
    </>
    )
}

export default App;