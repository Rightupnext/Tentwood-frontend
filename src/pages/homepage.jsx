import React, { useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../store/slices/packageSlice";

// Above-the-fold components
import Banner from "../client/components/Banner";
import ExploreDestinations from "../client/components/ExploreDestinations/ExploreDestinations";

// Other components (previously lazy)
import CityExplorer from "../client/components/CityExplorer/CityExplorer";
import TravelPromo from "../client/components/TravelPromo/TravelPromo";
import VideoGallery from "../client/components/VideoGallery/VideoGallery";
import SmartCityTourApp from "../client/components/SmartCityTourApp/SmartCityTourApp";
import Testimonials from "../client/components/Testimonials/Testimonials";
import TourCarousel from "../client/components/TourCarousel/TourCarousel";
import TourCarousels from "../client/components/TourCarousels/TourCarousels";

function HomePage() {
  const {
    list: packages,
    india,
    international,
    honeymoon,
    group,
  } = useSelector((state) => state.packages);



  const Title1 = "InterNational Trip's";
  const Title2 = "India Trip's";
  const Title3 = "Group Trip's";
  const Title4 = "HoneyMoon Trip's";

  return (
    <>
      <Banner />
      <ExploreDestinations packages={packages} />
      <CityExplorer packages={packages} />
      <TravelPromo packages={packages}/>
      <VideoGallery />
      <TourCarousel
        packages={packages}
        Title1={Title1}
        Title2={Title2}
        indiaTrips={india}
        internationalTrips={international}
      />
     <SmartCityTourApp packages={packages?.slice(0, 5) || []} />

      <TourCarousels
        packages={packages}
        Title3={Title3}
        Title4={Title4}
        honeymoonTrips={honeymoon}
        GroupTrips={group}
      />
      <Testimonials />
    </>
  );
}

export default HomePage;
