import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ParallelLoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [showClouds, setShowClouds] = useState(false);
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.8;
      });
    }, 30);

    // Show clouds after 1 second
    setTimeout(() => setShowClouds(true), 1000);
    // Show cities after 2 seconds
    setTimeout(() => setShowCities(true), 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setStage(0);
    else if (progress < 50) setStage(1);
    else if (progress < 75) setStage(2);
    else setStage(3);
  }, [progress]);

  const loadingStages = [
    { text: "Initializing Flight Systems", icon: "🌍", color: "from-cyan-400 to-blue-500" },
    { text: "Scanning Global Routes", icon: "🗺️", color: "from-blue-500 to-purple-500" },
    { text: "Loading Destinations", icon: "✨", color: "from-purple-500 to-pink-500" },
    { text: "Ready for Takeoff!", icon: "🚀", color: "from-pink-500 to-red-500" }
  ];

  const clouds = Array(8).fill(null);
  const cities = [
    { name: "New York", x: "15%", delay: 0 },
    { name: "London", x: "30%", delay: 0.2 },
    { name: "Tokyo", x: "50%", delay: 0.4 },
    { name: "Paris", x: "70%", delay: 0.6 },
    { name: "Dubai", x: "85%", delay: 0.8 }
  ];

  const dataPoints = [
    { label: "Routes", value: Math.round(progress * 150), icon: "🛫", delay: 0 },
    { label: "Cities", value: Math.round(progress * 2.5), icon: "🏙️", delay: 0.1 },
    { label: "Flights", value: Math.round(progress * 50), icon: "✈️", delay: 0.2 },
    { label: "Deals", value: Math.round(progress * 10), icon: "💰", delay: 0.3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Multiple floating orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-3xl"
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              background: `radial-gradient(circle, ${
                ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#6366f1'][i]
              }, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Starfield with parallax */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
            x: [0, Math.random() * 20 - 10],
            y: [0, Math.random() * 20 - 10]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Animated logo with particles */}
        <div className="mb-8 relative">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <motion.div 
              className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl shadow-2xl"
              animate={{ 
                boxShadow: [
                  "0 0 40px rgba(56, 189, 248, 0.5)",
                  "0 0 60px rgba(147, 51, 234, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 40px rgba(56, 189, 248, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <motion.span 
                className="text-5xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✈️
              </motion.span>
              
              {/* Orbiting particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.2 }
                  }}
                  style={{
                    transformOrigin: `${60 + Math.cos(i * Math.PI / 4) * 60}px ${60 + Math.sin(i * Math.PI / 4) * 60}px`
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-center mt-6 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">Sky</span>
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 100%' }}
            >
              Voyager
            </motion.span>
          </motion.h1>
        </div>

        {/* Animated clouds */}
        <AnimatePresence>
          {showClouds && (
            <div className="absolute inset-0 pointer-events-none">
              {clouds.map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ 
                    x: '100vw', 
                    opacity: [0, 0.3, 0.3, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: Math.random() * 20 + 15,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear"
                  }}
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                >
                  <div 
                    className="bg-white rounded-full blur-xl"
                    style={{
                      width: `${Math.random() * 100 + 80}px`,
                      height: `${Math.random() * 40 + 30}px`
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Flight path with multiple planes */}
        <div className="relative w-full max-w-4xl h-48 mb-8">
          {/* Curved path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200">
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 50 100 Q 250 50, 500 100 T 950 100"
              stroke="url(#pathGrad)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="15,15"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                strokeDashoffset: [0, -30]
              }}
              transition={{ 
                pathLength: { duration: 2 },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />
          </svg>

          {/* Main airplane */}
          <motion.div
            className="absolute top-1/2"
            animate={{
              left: `${progress}%`,
              y: ['-50%', 'calc(-50% - 15px)', '-50%'],
              rotate: [0, 3, 0, -3, 0]
            }}
            transition={{
              left: { duration: 0.3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transform: 'translateY(-50%) translateX(-50%)' }}
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Glow */}
              <motion.div
                className="absolute inset-0 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-50"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Plane SVG */}
              <svg width="120" height="120" viewBox="0 0 100 100" className="relative drop-shadow-2xl">
                <defs>
                  <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
                <path d="M 25 50 L 15 35 L 30 48 Z" fill="#bae6fd" />
                <path d="M 25 50 L 15 65 L 30 52 Z" fill="#93c5fd" />
                <ellipse cx="50" cy="50" rx="42" ry="16" fill="url(#planeGrad)" />
                <ellipse cx="72" cy="50" rx="13" ry="9" fill="#3b82f6" opacity="0.6" />
                <circle cx="60" cy="50" r="3" fill="#1e40af" opacity="0.7" />
                <circle cx="52" cy="50" r="3" fill="#1e40af" opacity="0.7" />
                <circle cx="44" cy="50" r="3" fill="#1e40af" opacity="0.7" />
                <circle cx="36" cy="50" r="3" fill="#1e40af" opacity="0.7" />
                <path d="M 18 50 L 8 42 L 12 50 L 8 58 Z" fill="#60a5fa" />
              </svg>

              {/* Engine trails */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 flex flex-col gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 bg-gradient-to-r from-orange-400 via-yellow-300 to-transparent rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: [`${30 - i * 5}px`, 0],
                      opacity: [0.8, 0]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* City markers */}
          <AnimatePresence>
            {showCities && cities.map((city, i) => (
              <motion.div
                key={city.name}
                className="absolute bottom-0"
                style={{ left: city.x }}
                initial={{ y: 50, opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: city.delay, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50" />
                  <motion.div
                    className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full"
                    animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-cyan-300 text-xs font-bold">
                    {city.name}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic stage indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className={`inline-flex items-center gap-4 bg-gradient-to-r ${loadingStages[stage].color} rounded-full px-8 py-4 shadow-2xl`}>
              <motion.span
                className="text-4xl"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              >
                {loadingStages[stage].icon}
              </motion.span>
              <span className="text-white font-bold text-xl">{loadingStages[stage].text}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Multi-segment progress bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="relative h-4 bg-white/5 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 rounded-full relative"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ width: '50%' }}
              />
            </motion.div>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-white/60 text-sm">Loading...</span>
            <motion.span
              className="text-white font-bold text-xl"
              key={Math.round(progress)}
              initial={{ scale: 1.3, color: '#06b6d4' }}
              animate={{ scale: 1, color: '#ffffff' }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </div>

        {/* Live data counters */}
        <motion.div
          className="grid grid-cols-4 gap-4 w-full max-w-3xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {dataPoints.map((data, i) => (
            <motion.div
              key={data.label}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + data.delay, type: "spring" }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                className="text-3xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {data.icon}
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-white mb-1"
                key={data.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {data.value}
              </motion.div>
              <div className="text-white/60 text-xs">{data.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature cards with stagger */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 1
              }
            }
          }}
        >
          {[
            { icon: "🌍", title: "Global", subtitle: "Destinations" },
            { icon: "⚡", title: "Instant", subtitle: "Booking" },
            { icon: "🎯", title: "Best", subtitle: "Prices" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -90 },
                visible: { opacity: 1, y: 0, rotateX: 0 }
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="text-5xl mb-3"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-white font-bold text-xl">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}