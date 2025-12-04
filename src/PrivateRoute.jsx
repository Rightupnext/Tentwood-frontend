import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./store/api"; // axios withCredentials: true

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/data/me", { withCredentials: true });
        setUser(res.data.user); // {name, email, role, id}
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>

          {/* Loading text */}
          <p className="text-lg font-medium text-gray-700 mb-2">
            Authenticating
          </p>
          <p className="text-sm text-gray-500">
            Please wait while we verify your credentials
          </p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
