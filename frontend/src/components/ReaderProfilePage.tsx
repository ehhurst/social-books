import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ReaderProfilePage() {
  const nav = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      nav("/login"); // redirect if user is not logged in
    }
  }, [username, nav]);

  async function handleDelete() {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/users/delete/${username}`);
      console.log(response.data);
      localStorage.removeItem("username");
      localStorage.removeItem("access_token");
      nav("/"); // Redirect to homepage after account deletion
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Welcome to your profile!</h2>
      <p>Your username: {username}</p>

      <button onClick={handleDelete}>Delete My Account</button>
    </main>
  );
}

export default ReaderProfilePage;
