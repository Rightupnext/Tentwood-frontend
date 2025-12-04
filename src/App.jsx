import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import DashboardLayout from "./admin/DashboardLayout";
import Auth from "./admin/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchMeError = useSelector((state) => state.users.error.fetchMe);
  console.log("fetchMeError",fetchMeError)

  useEffect(() => {
    dispatch(fetchMe())
      .unwrap()
      .then((user) => {
        console.log("Fetched user:", user);
      })
      .catch((err) => {
        console.log("FetchMe error:", err);

        // If token invalid, redirect to login
        if (err.status === 401) {
          navigate("/login");
        }
      });
  }, [dispatch, navigate]);
  return (
    <Routes>
      {/* Admin layout routes */}
      <Route path="/login" element={<Auth />} />
      <Route path="/admin" element={<DashboardLayout />} />
    </Routes>
  );
}

export default App;
