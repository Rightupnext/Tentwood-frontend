import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/DashboardLayout";
import Auth from "./admin/Auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />

      {/* Private admin route */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={["admin",]}>
            <DashboardLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
