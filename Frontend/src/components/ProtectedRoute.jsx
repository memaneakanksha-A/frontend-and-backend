import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../services/api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get("/api/auth/me"); // token verified here
        setAllowed(true);
      } catch {
        localStorage.removeItem("token");
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <p>Checking authentication...</p>;
  if (!allowed) return <Navigate to="/signin" replace />;

  return children;
}
