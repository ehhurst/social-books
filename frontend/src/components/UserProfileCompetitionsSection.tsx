import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import "../assets/css/UserProfileCompetitionsSection.css";

type Contest = {
  contest_name: string;
  book_count: number;
  end_date: string;
  organizer: string;
};

function UserProfileCompetitionsSection() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContests() {
      const token = sessionStorage.getItem("access_token");
      const userData = sessionStorage.getItem("User");
      const username = userData ? JSON.parse(userData).username : null;

      console.log("🔐 Token:", token);
      console.log("👤 Username:", username);

      if (!token || !username) {
        console.log("❌ No token or username found in sessionStorage");
        setError("You must be logged in to view competitions.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/user/${username}/contests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("✅ Contests fetched:", response.data);
        setContests(response.data.contests); // 🔧 FIXED: get array from 'contests' key
      } catch (err: any) {
        console.error("❌ Error fetching contests:", err);
        setError("Failed to load competitions.");
      } finally {
        setLoading(false);
      }
    }

    fetchContests();
  }, []);

  return (
    <div className="user-profile-competitions">
      {loading ? (
        <p>Loading competitions...</p>
      ) : error ? (
        <p>{error}</p>
      ) : contests.length === 0 ? (
        <p>You haven't joined any competitions yet.</p>
      ) : (
<ul>
  {contests.map((contest) => (
    <li key={contest.contest_name}>
      <div className="contest-header">
        <h4>{contest.contest_name}</h4>
        <span className="badge">📢 Active</span>
      </div>
      <p className="books">Books: {contest.book_count}</p>
      <p className="organizer">Organizer: {contest.organizer}</p>
      <p className="end-date">Ends: {contest.end_date}</p>
    </li>
  ))}
</ul>
      )}
    </div>
  );
}

export default UserProfileCompetitionsSection;
