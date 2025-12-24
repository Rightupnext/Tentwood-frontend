import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./store/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/userSlice";
import Loading from "./admin/Loading";

const PublicRoute = ({ children }) => {
  const dispatch = useDispatch();

  // Get the user object and fetchMe loading state
  const { user } = useSelector((state) => state.users.auth);
  const loading = useSelector((state) => state.users.loading.fetchMe);

  // Fetch current user only if not already loaded
  useEffect(() => {
    if (!user) {
      dispatch(fetchMe());
    }
  }, [dispatch, user]);

  if (loading) return <Loading />;

  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  return children;
};

export default PublicRoute;
