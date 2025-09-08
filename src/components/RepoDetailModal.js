import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function RepoDetailModal({ repo, onClose }) {
  const [commitData, setCommitData] = useState({ labels: [], data: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repo) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=100`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch commits (maybe rate limit)");
        return res.json();
      })
      .then((commits) => {
        // Initialize month counts
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const counts = Array(12).fill(0);

        // Count commits per month
        commits.forEach((commit) => {
          const date = new Date(commit.commit.author.date);
          const monthIndex = date.getMonth();
          counts[monthIndex] += 1;
        });

        // Only show last 6 months
        const currentMonth = new Date().getMonth();
        const labels = [];
        const data = [];

        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          labels.push(months[monthIndex]);
          data.push(counts[monthIndex]);
        }

        setCommitData({ labels, data });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [repo]);

  const data = {
    labels: commitData.labels,
    datasets: [
      {
        label: 'Commits per Month',
        data: commitData.data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3, // smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Repository Commits' } },
  };

  if (!repo) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[70rem] h-[35rem] rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold hover:text-red-500"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold p-5 border-b text-center">{repo.name} Details</h1>

        <div className="p-5 h-[calc(100%-4.5rem)]">
          {loading ? (
            <p className="text-center">Loading commit data...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RepoDetailModal;
