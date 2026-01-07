import {
  Star,
  Calendar,
  Quote,
  Award,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TestimonialCard({
  testimonial,
  onPrev,
  onNext,
  index,
  total,
  onDotClick,
}) {
  return (
    <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* IMAGE */}
        <div className="relative h-[450px]  overflow-hidden group">
          <img
            src={testimonial.destinationImage}
            alt={testimonial.packageName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 rounded-full">
            <p className="text-sm font-bold text-white">
              {testimonial.category}
            </p>
          </div>

          <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-2xl p-6">
            <p className="text-xs text-gray-300 uppercase mb-2">
              Travel Package
            </p>
            <h4 className="text-2xl font-black text-white mb-3">
              {testimonial.packageName}
            </h4>

            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{testimonial.duration}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {testimonial.highlights.map((h, i) => (
                <span
                  key={i}
                  className="text-xs bg-white/10 px-3 py-1 rounded-full text-gray-300"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="absolute top-6 right-6 bg-white rounded-xl px-4 py-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
            <p className="text-xs font-bold text-gray-900 text-center mt-1">
              5.0 Perfect
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between">
          <Quote className="absolute top-6 right-6 w-24 h-24 text-blue-500 opacity-10" />

          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-400">{testimonial.date}</p>
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-300">Verified</span>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-gray-200 italic mb-10">
              “{testimonial.text}”
            </p>
          </div>

          {/* AUTHOR */}
          <div className="flex justify-between items-center border-t border-white/10 pt-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#fdc700] to-[#fdc700] flex items-center justify-center">
                <span className="text-xl font-black text-white">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
              </div>

              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  {testimonial.location}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onPrev}
                className="bg-white/10 hover:bg-gradient-to-r cursor-pointer hover:from-[#7cf3d4] hover:to-[#7cf3d4] backdrop-blur-xl text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={onNext}
                className="bg-gradient-to-r cursor-pointer from-[#fdc700] to-[#fdc700] hover:from-[#7cf3d4] hover:to-[#7cf3d4] text-white p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl shadow-blue-500/50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center gap-3 mt-8">
            {[...Array(total)].map((_, i) => (
              <button
                key={i}
                onClick={() => onDotClick(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-14 bg-gradient-to-r from-blue-500 to-purple-500"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
