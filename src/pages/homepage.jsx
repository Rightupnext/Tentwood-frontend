import React, { Suspense, lazy, useEffect } from "react";

// Load above-the-fold instantly
import Banner from "../client/components/Banner";
import ExploreDestinations from "../client/components/Destination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../store/slices/packageSlice";
import Relatedtours from "../client/components/Relatedtours";

// Lazy Loaded Components – SUPER FAST PERFORMANCE
const Export = lazy(() => import("../client/components/Export"));
const TravelPromo = lazy(() => import("../client/components/TravelPromo"));
const VideoGallery = lazy(() => import("../client/components/VideoGallery"));
const Related = lazy(() => import("../client/components/Relatedtour"));
const SmartCityTourApp = lazy(() =>
  import("../client/components/SmartCityTourApp")
);
const Testimonials = lazy(() => import("../client/components/Testimonal"));
const Outsidethe = lazy(() => import("../client/components/Outsidethe"));
function HomePage() {
  const dispatch = useDispatch();
  const { list: packages = [] } = useSelector((state) => state.packages);
  /* ================= FETCH API ================= */
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);
  const Title1 = "InterNational Trip's";
  const Title2 = "India Trip's";
  const Title3 = "Group Trip's";
  const Title4 = "HoneyMoon Trip's";
  const indiaTrips = packages.filter(
    (pkg) => pkg?.Destination?.trip === "India Trips"
  );

  const internationalTrips = packages.filter(
    (pkg) => pkg?.Destination?.trip === "International Trips"
  );

  const honeymoonTrips = packages.filter(
    (pkg) => pkg?.Destination?.trip === "Honeymoon Packages"
  );
  const GroupTrips = packages.filter(
    (pkg) => pkg?.Destination?.trip === "Honeymoon Packages"
  );
  return (
    <>
      <Banner />
      <ExploreDestinations packages={packages} />
      <Export packages={packages} />
      <TravelPromo />
      <VideoGallery />
      <Related
        packages={packages}
        Title1={Title1}
        Title2={Title2}
        indiaTrips={indiaTrips}
        internationalTrips={internationalTrips}
      />
      <SmartCityTourApp packages={packages} />
      <Relatedtours
        packages={packages}
        Title3={Title3}
        Title4={Title4}
        honeymoonTrips={honeymoonTrips}
        GroupTrips={GroupTrips}
      />
      {/* <Outsidethe /> */}
      <Testimonials />
    </>
  );
}

export default HomePage;
