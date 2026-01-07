import React from "react";

const Stats = () => {
  const stats = [
    { val: "50K+", label: "Downloads", grad: "from-yellow-400 to-orange-400" },
    { val: "4.8★", label: "Rating", grad: "from-green-400 to-cyan-400" },
    { val: "500+", label: "Hotels", grad: "from-pink-400 to-purple-400" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 pt-8">
      {stats.map((stat, i) => (
        <div key={i} className="text-center transform hover:scale-110 transition-transform duration-300">
          <div className={`text-4xl font-bold bg-gradient-to-r ${stat.grad} bg-clip-text text-transparent`}>
            {stat.val}
          </div>
          <div className="text-white/80 text-xs mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
