import { Routes, Route, useLocation } from "react-router-dom";
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
import { lazy, useEffect } from "react";
import Footer from "../src/client/Footer";
import BottomNavbar from "./client/components/Bottomnavbar";
import Topnavbar from "./client/components/Topnavbar";
import DestinationUserGuide from "./admin/DestinationUserGuide";
import FAQ from "./client/components/FAQ";
import ScrollToTop from "./ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "./store/slices/userSlice";
import WhatsAppFloat from "./WhatsAppFloat";
import TermsAndConditions from "./client/components/TermsAndConditions";
import PrivacyPolicy from "./client/components/PrivacyPolicy";
import TravelSearch from "../src/client/components/Travel";
import TravelShowcase from "./client/components/TravelShowcase";
const HomePage = lazy(() => import("./pages/homepage"));
const AboutUs = lazy(() => import("./pages/Aboutus"));
const Ensure = lazy(() => import("../src/client/components/Ensure"));

const ContactUs = lazy(() => import("./client/components/Contact"));
const Testimonials = lazy(() => import("./client/components/Testimonal"));
const Thingtodo = lazy(() => import("../src/client/components/Thingtodo"));
const VintageDouble = lazy(() =>
  import("../src/client/components/Vintagedouble")
);
const Promotions = lazy(() => import("./client/components/Promotions"));
const Travel = lazy(() => import("../src/client/components/Travel"));

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const User = useSelector((state) => state.users.auth.user);
  const isAdminRoute = location.pathname.startsWith("/admin");
  console.log("User", User);
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
          element={<Promotions />}
        />
        <Route
          path="/india-trips/:country/:city/:slug"
          element={<Promotions />}
        />
        <Route
          path="/group-tours/:country/:city/:slug"
          element={<Promotions />}
        />
        <Route
          path="/honeymoon-package/:country/:city/:slug"
          element={<Promotions />}
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
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
