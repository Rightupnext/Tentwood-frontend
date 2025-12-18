import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";

export default function WaterRaftingFAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    const initAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => {
          setAudioReady(true);
        }).catch(() => {
          document.addEventListener('click', () => {
            if (audioRef.current && !audioReady) {
              audioRef.current.play().then(() => setAudioReady(true)).catch(() => {});
            }
          }, { once: true });
        });
      }
    };

    if (videoRef.current) videoRef.current.play().catch(() => {});
    setTimeout(initAudio, 500);
  }, [audioReady]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (videoRef.current) videoRef.current.muted = newMutedState;
    if (audioRef.current) {
      audioRef.current.muted = newMutedState;
      if (!newMutedState && audioRef.current.paused) {
        audioRef.current.play().then(() => setAudioReady(true)).catch(() => {});
      }
    }
  };

  const faqs = [
    {
      question: "What Services Does Your Travel Agency Provide?",
      answer: "A travel agency typically provides a wide range of services to ensure a smooth and enjoyable travel experience. As like: Hotel booking, Flight Booking, Visa & Customized Travel Package etc.",
    },
    {
      question: "Do You Offer Customized Travel Packages?",
      answer: "Yes! We specialize in creating personalized travel packages tailored to your preferences, budget, and interests. Whether it's adventure, luxury, or cultural tours, we craft unique experiences just for you.",
    },
    {
      question: "Can I Book Flights, Hotels, and Tours Separately?",
      answer: "Absolutely! You have the flexibility to book flights, hotels, and tours individually or as a complete package. We provide both options to suit your travel planning needs.",
    },
    {
      question: "Do You Provide Visa Assistance?",
      answer: "Yes, we offer comprehensive visa assistance services including document preparation, application submission, and guidance throughout the entire visa process for your destination.",
    },
    {
      question: "What Payment Methods Do You Accept?",
      answer: "We accept multiple payment methods including credit/debit cards, bank transfers, digital wallets, and online payment gateways. Flexible payment plans are also available for larger bookings.",
    },
    {
      question: "What Travel Documents are Required for International Travel?",
      answer: "For international travel, you'll typically need a valid passport (with at least 6 months validity), visa (if required), travel insurance, flight tickets, hotel confirmations, and any health certificates or vaccination records as per destination requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <audio ref={audioRef} loop preload="auto">
        <source src="https://res.cloudinary.com/dttvw0p7p/video/upload/v1765883517/Bye_Bye_Bye_-_Deadpool___English_Song_jpcvoz.mp3" type="audio/mpeg" />
      </audio>

      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
          src="https://res.cloudinary.com/dttvw0p7p/video/upload/v1765878620/14920011_3840_2160_60fps_urnolk.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent z-10"></div>

        <button 
          onClick={toggleMute}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-30 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} className="text-gray-700" /> : <Volume2 size={20} className="text-blue-500" />}
        </button>

        <div className="absolute top-16 sm:top-24 right-10 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-blue-400/40 rounded-full animate-float-slow backdrop-blur-sm hidden sm:block z-10"></div>
        <div className="absolute top-20 sm:top-32 right-32 sm:right-48 w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400/40 rounded-full animate-float-medium backdrop-blur-sm hidden sm:block z-10"></div>
        <div className="absolute top-14 sm:top-20 right-48 sm:right-72 w-8 h-8 sm:w-10 sm:h-10 bg-blue-300/40 rounded-full animate-float-fast backdrop-blur-sm hidden sm:block z-10"></div>

        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 font-serif italic drop-shadow-2xl animate-pulse-glow">
            Water Rafting
          </h1>
          <button className="px-5 py-2 text-sm md:text-base text-white font-medium underline hover:text-blue-200 transition-colors">
            View All Package
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Questions & Answer
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
            We're committed to offering more than just products—we provide exceptional experiences.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${300 + i * 80}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-4 sm:px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
              >
                <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg pr-3 sm:pr-4 flex-1">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center transition-all duration-300 ${openIndex === i ? "rotate-180" : ""}`}>
                  <ChevronDown size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 sm:px-5 md:px-6 pb-4 md:pb-5 pt-0">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 50px rgba(255, 255, 255, 0.5), 0 0 70px rgba(59, 130, 246, 0.4);
          }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(15px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-35px) translateX(-20px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }

        .animate-ken-burns { animation: ken-burns 25s ease-out infinite alternate; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
