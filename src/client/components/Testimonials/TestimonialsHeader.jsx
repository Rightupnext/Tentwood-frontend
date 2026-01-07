import { Plane } from "lucide-react";

export default function TestimonialsHeader({ loaded }) {
  return (
    <div
      className={`text-center mb-20 ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } transition-all duration-1000`}
    >
      <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full mb-8 bg-blue-500/20">
        <Plane className="w-5 h-5" />
        <span className="text-sm font-bold uppercase">Testimonials</span>
      </div>

      <h2 className="text-5xl font-black mb-6">
        Real Stories from
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#42fdcb] to-[#0ac895]">
          Real Travelers
        </span>
      </h2>

      <p className="text-xl text-gray-500 max-w-3xl mx-auto">
        Join thousands of travelers who turned dreams into memories
      </p>
    </div>
  );
}
