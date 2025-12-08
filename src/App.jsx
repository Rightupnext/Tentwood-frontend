import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/DashboardLayout";
import Auth from "./admin/Auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import CountryManagement from "./admin/CountryManagement";
import DestinationManagement from "./admin/DestinationManagement";
import TravelForm from "./admin/TravelForm";
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

      {/* Private admin routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Nested routes rendered inside DashboardLayout's <Outlet /> */}
        <Route path="countries" element={<CountryManagement />} />
        <Route path="destinations" element={<DestinationManagement />} />
        <Route path="travel" element={<TravelForm />} />
        
      </Route>
    </Routes>
  );
}

export default App;
