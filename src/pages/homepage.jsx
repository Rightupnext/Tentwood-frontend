import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../store/slices/packageSlice";

// Above-the-fold components
import Banner from "../client/components/Banner";
import ExploreDestinations from "../client/components/Destination";
import Relatedtours from "../client/components/Relatedtours";

// Other components (previously lazy)
import Export from "../client/components/Export";
import TravelPromo from "../client/components/TravelPromo";
import VideoGallery from "../client/components/VideoGallery";
import Related from "../client/components/Relatedtour";
import SmartCityTourApp from "../client/components/SmartCityTourApp";
import Testimonials from "../client/components/Testimonal";

function HomePage() {
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packages.list || []);

  /* ================= FETCH API ================= */
  useEffect(() => {
    // Fetch only if packages are empty
    if (!packages.length) {
      dispatch(fetchPackages());
    }
  }, [dispatch, packages.length]);

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
      <ExploreDestinations />
      <Export />
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
