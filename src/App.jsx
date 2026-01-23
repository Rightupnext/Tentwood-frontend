import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "./admin/DashboardLayout";
import Auth from "./admin/Auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import CountryManagement from "./admin/CountryManagement";
import TouristPackageCreator from "./admin/TouristPackageCreator/TouristPackageCreator";
import PackagesList from "./admin/TouristPackageCreator/PackagesList";
import PackageDetails from "./admin/TouristPackageCreator/PackageDetails";
import AnalyticsDashboard from "./admin/AnalyticsDashboard";
import { lazy, useEffect } from "react";
import Footer from "../src/client/Footer";
import BottomNavbar from "./client/components/Bottomnavbar";
import Topnavbar from "./client/components/Topnavbar";
import FAQ from "./client/components/FAQ";
import ScrollToTop from "./ScrollToTop";
import { fetchMe } from "./store/slices/userSlice";
import WhatsAppFloat from "./WhatsAppFloat";
import TermsAndConditions from "./client/components/TermsAndConditions";
import PrivacyPolicy from "./client/components/PrivacyPolicy";
import TravelSearch from "../src/client/components/Travel";
import TravelShowcase from "./client/components/TravelShowcase";
import TourPackagesPage from "./client/components/TourPackagesPage";
import HomePage from "./pages/homepage";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./client/components/Contact";
import Testimonials from "./client/components/Testimonials/Testimonials";
import TravelPackagesSingle from "./client/components/TravelPackagesSingle";
import Travel from "../src/client/components/Travel";
import { fetchPackages } from "./store/slices/packageSlice";
import CategoryFilter from "./client/components/CategoryFilter";
import EnhancedTourFilters from "./client/components/TourFilters/EnhancedTourFilters";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const User = useSelector((state) => state.users.auth.user);
  const isAdminRoute = location.pathname.startsWith("/admin");
  const packages = useSelector((state) => state.packages.list);
  // console.log("User", User);
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  useEffect(() => {
    if (packages.length === 0) {
      dispatch(fetchPackages());
    }
  }, [dispatch, packages.length]);
  return (
    <>
     <WhatsAppFloat />  
      <ScrollToTop />
      {/* {!isAdminRoute && <Topnavbar />} */}
      {!isAdminRoute && <BottomNavbar />}

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage packages={packages} />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/:tripType/:destination" element={<TourPackagesPage />} />
        <Route path="/travel" element={<TravelSearch />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/TravelShowcase" element={<TravelShowcase />} />
        <Route path=":tripType" element={<EnhancedTourFilters />} />

        <Route
          path="/:tripType/:destination/:packageId"
          element={<TravelPackagesSingle />}
        />

        {/* About Page */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Contact Page */}
        <Route path="/contact" element={<ContactUs />} />

        {/* Testimonials */}
        <Route path="/Testimonal" element={<Testimonials />} />

        {/* Popular destinations page */}

        {/* Our Packages */}
        <Route path="/Travel" element={<Travel />} />
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

          {/* <Route path="travel" element={<TravelForm />} /> */}
          <Route path="travel" element={<TouristPackageCreator />} />
          <Route path="package">
            <Route index element={<EnhancedTourFilters />} />
            <Route path="edit/:id" element={<TouristPackageCreator />} />
            <Route path=":id" element={<PackageDetails />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
     
    </>
  );
}

export default App;
