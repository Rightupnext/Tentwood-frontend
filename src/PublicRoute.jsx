import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./store/api";

const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/data/me", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  return children;
};

export default PublicRoute;
