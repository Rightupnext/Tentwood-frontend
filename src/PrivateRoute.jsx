import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/userSlice";
import Loading from "./admin/Loading";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
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

  // Show loading spinner while fetching
  if (loading) {
    return <Loading />;
  }

  // Redirect if user is not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Redirect if role is not allowed
  if (allowedRoles.length && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
