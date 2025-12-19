import React, { Suspense, lazy } from "react";

// Load above-the-fold instantly
import Banner from "../client/components/Banner";
import ExploreDestinations from "../client/components/Destination";
import Footer from "../client/Footer";

// Lazy Loaded Components – SUPER FAST PERFORMANCE
const Export = lazy(() => import("../client/components/Export"));
const Featured = lazy(() => import("../client/components/Featured"));
const Promotion = lazy(() => import("../client/components/Promotion"));
const Journey = lazy(() => import("../client/components/Journey"));
const Vintage = lazy(() => import("../client/components/Vintagedouble"));
const Related = lazy(() => import("../client/components/Relatedtour"));
const Smartcity = lazy(() => import("../client/components/Smartcity"));
const Thingtodo = lazy(() => import("../client/components/Thingtodo"));
const Travel = lazy(() => import("../client/components/Travel"));
const Testimonials = lazy(() => import("../client/components/Testimonal"));
const Promotion2 = lazy(() => import("../client/components/Promotions"));
const Map = lazy(() => import("../client/components/Map"));
const Ensure = lazy(() => import("../client/components/Ensure"));
const Water = lazy(() => import("../client/components/Water"));
const Outsidethe = lazy(() => import("../client/components/Outsidethe"));
const Vintagedouble = lazy(() => import("../client/components/Vintagedouble"));
function HomePage() {
  return (
    <>
      {/* ABOVE-THE-FOLD (Instant Render) */}
      <Banner />
      <ExploreDestinations />

      {/* Lazy Loaded Sections with a Smooth Fallback Loader */}

      <Export />
      <Featured />
      <Promotion />
      <Journey />

      <Related />
      <Smartcity />
      <Thingtodo />
      <Outsidethe />
      <Travel />
      <Testimonials />
      {/* <Promotion2 /> */}
      {/* <Map /> */}
      {/* <Ensure /> */}
      <Water />

      {/* FOOTER */}
    </>
  );
}

export default HomePage;
