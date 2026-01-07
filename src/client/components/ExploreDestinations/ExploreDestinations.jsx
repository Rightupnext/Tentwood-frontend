import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";

// LAZY LOAD HEAVY PART
const LazyRows = lazy(() => import("./LazyRows/ExploreRows"));

export default function ExploreDestinations({ packages = [] }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Only prepare data (cheap)
  const uniquePackages = useMemo(() => {
    return Array.from(
      new Map(
        packages
          .filter((pkg) => pkg?.Destination?.name)
          .map((pkg) => [pkg.Destination.name.toLowerCase(), pkg])
      ).values()
    );
  }, [packages]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-teal-50 py-16 overflow-hidden"
    >
      {/* HEADER – paints immediately */}
      <div className="max-w-7xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
          Explore Top Destinations
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the world's most beautiful places.
        </p>
      </div>

      {/* HEAVY CONTENT */}
      {visible && (
        <Suspense fallback={null}>
          <LazyRows packages={uniquePackages} />
        </Suspense>
      )}
    </section>
  );
}
