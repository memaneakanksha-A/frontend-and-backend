import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        // token invalid / expired
        localStorage.removeItem("token");
        nav("/signin");
      }
    };

    fetchUser();
  }, [nav]);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/signin");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <button onClick={logout}>Sign out</button>
    </div>
  );
}
