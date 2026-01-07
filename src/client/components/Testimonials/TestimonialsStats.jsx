export default function TestimonialsStats({ stats, loaded }) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 ${
        loaded ? "opacity-100" : "opacity-0"
      } transition-all duration-1000 delay-200`}
    >
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#2b344a] rounded-2xl p-6">
          <div
            className={`bg-gradient-to-r ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}
          >
            <stat.icon className="w-7 h-7 text-white" />
          </div>
          <p className="text-4xl font-black text-white">{stat.value}</p>
          <p className="text-sm text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
