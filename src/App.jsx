import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./admin/DashboardLayout";
import Auth from "./admin/Auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import CountryManagement from "./admin/CountryManagement";
import DestinationManagement from "./admin/DestinationManagement";
import TravelForm from "./admin/TravelForm";
import TouristPackageCreator from "./admin/TouristPackageCreator/TouristPackageCreator";
import PackagesList from "./admin/TouristPackageCreator/PackagesList";
import PackageDetails from "./admin/TouristPackageCreator/PackageDetails";
import AnalyticsDashboard from "./admin/AnalyticsDashboard";
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
        <Route path="" index element={<AnalyticsDashboard />} />
        <Route path="countries" element={<CountryManagement />} />
        <Route path="destinations" element={<DestinationManagement />} />
        {/* <Route path="travel" element={<TravelForm />} /> */}
        <Route path="travel" element={<TouristPackageCreator />} />
        <Route path="edit-package/:id" element={<TouristPackageCreator />} />
        <Route path="package">
          <Route index element={<PackagesList />} />
          <Route path=":id" element={<PackageDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
