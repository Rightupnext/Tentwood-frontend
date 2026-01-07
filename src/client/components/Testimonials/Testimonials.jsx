import { useEffect, useState } from "react";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsStats from "./TestimonialsStats";
import TestimonialCard from "./TestimonialCard";
import { testimonials, stats } from "./testimonials.data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);
  const next = () => setActive((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <TestimonialsHeader loaded={loaded} />
        <TestimonialsStats stats={stats} loaded={loaded} />
        <TestimonialCard
          testimonial={testimonials[active]}
          index={active}
          total={testimonials.length}
          onPrev={prev}
          onNext={next}
          onDotClick={setActive}
        />
      </div>
    </section>
  );
}
