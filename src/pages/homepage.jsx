import React, { Suspense, lazy } from "react";

// Load above-the-fold instantly
import Banner from "../client/components/Banner";
import ExploreDestinations from "../client/components/Destination";

// Lazy Loaded Components – SUPER FAST PERFORMANCE
const Export = lazy(() => import("../client/components/Export"));
const Promotion = lazy(() => import("../client/components/Promotion"));
const Journey = lazy(() => import("../client/components/Journey"));
const Related = lazy(() => import("../client/components/Relatedtour"));
const Smartcity = lazy(() => import("../client/components/Smartcity"));
const Testimonials = lazy(() => import("../client/components/Testimonal"));
const Outsidethe = lazy(() => import("../client/components/Outsidethe"));
function HomePage() {
  return (
    <>
      <Banner />
      <ExploreDestinations />
      <Export />
      <Promotion />
      <Journey />
      <Related />
      <Smartcity />
      <Outsidethe />
      <Testimonials />
    </>
  );
}

export default HomePage;
