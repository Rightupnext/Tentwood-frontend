// React & Router
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/userSlice";

// Route Guards
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

// Layouts
import DashboardLayout from "./admin/DashboardLayout";

// Auth
import Auth from "./admin/Auth";

// Admin Pages
import AnalyticsDashboard from "./admin/AnalyticsDashboard";
import CountryManagement from "./admin/CountryManagement";
import DestinationManagement from "./admin/DestinationManagement";
import DestinationUserGuide from "./admin/DestinationUserGuide";
import TouristPackageCreator from "./admin/TouristPackageCreator/TouristPackageCreator";
import PackagesList from "./admin/TouristPackageCreator/PackagesList";
import PackageDetails from "./admin/TouristPackageCreator/PackageDetails";

// Client Pages & Components
import HomePage from "./pages/homepage";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./client/components/Contact";
import Testimonials from "./client/components/Testimonal";
import Ensure from "./client/components/Ensure";
import Thingtodo from "./client/components/Thingtodo";
import FAQ from "./client/components/FAQ";
import Travel from "./client/components/Travel";
import TravelPackagesSingle from "./client/components/TravelPackagesSingle";
import TravelShowcase from "./client/components/TravelShowcase";
import TravelSearch from "./client/components/Travel";
import TermsAndConditions from "./client/components/TermsAndConditions";
import PrivacyPolicy from "./client/components/PrivacyPolicy";

// Navigation & Layout UI
import Topnavbar from "./client/components/Topnavbar";
import BottomNavbar from "./client/components/Bottomnavbar";
import Footer from "./client/Footer";

// Utilities
import ScrollToTop from "./ScrollToTop";
import WhatsAppFloat from "./WhatsAppFloat";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const User = useSelector((state) => state.users.auth.user);
  const isAdminRoute = location.pathname.startsWith("/admin");
  // console.log("User", User);
  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Topnavbar />}
      {!isAdminRoute && <BottomNavbar />}

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/:tripType/:country/:city" element={<Thingtodo />} />
        <Route path="/travel" element={<TravelSearch />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/TravelShowcase" element={<TravelShowcase />} />

        <Route
          path="/international-trips/:country/:city/:slug"
          element={<TravelPackagesSingle />}
        />
        <Route
          path="/india-trips/:country/:city/:slug"
          element={<TravelPackagesSingle />}
        />
        <Route
          path="/group-tours/:country/:city/:slug"
          element={<TravelPackagesSingle />}
        />
        <Route
          path="/honeymoon-package/:country/:city/:slug"
          element={<TravelPackagesSingle />}
        />

        {/* About Page */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Ensure Page */}
        <Route path="/ensure" element={<Ensure />} />

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
          <Route path="guide" element={<DestinationUserGuide />} />
          <Route path="destinations" element={<DestinationManagement />} />
          {/* <Route path="travel" element={<TravelForm />} /> */}
          <Route path="travel" element={<TouristPackageCreator />} />
          <Route path="package">
            <Route index element={<PackagesList />} />
            <Route path="edit/:id" element={<TouristPackageCreator />} />
            <Route path=":id" element={<PackageDetails />} />
          </Route>
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
      <WhatsAppFloat />
    </>
  );
}

export default App;
