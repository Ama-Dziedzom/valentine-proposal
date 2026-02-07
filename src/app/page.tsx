"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stars, Sparkles } from "lucide-react";

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [hearts, setHearts] = useState<{ top: string; left: string; scale: number; duration: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize random hearts ONLY on client to avoid hydration mismatch
    const newHearts = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + 2,
    }));
    setHearts(newHearts);
  }, []);

  useEffect(() => {
    const audio = new Audio("https://assets.mixkit.co/music/preview/mixkit-romantic-slow-piano-565.mp3");
    audio.loop = true;
    audioRef.current = audio;

    // No manual preload needed for Data URI
    console.log("App mounted");
  }, []);

  const handleNoClick = () => {
    if (noCount < 3) {
      setNoCount((prev) => prev + 1);
    }
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    audioRef.current?.play().catch((e) => console.log("Audio play failed:", e));

    // Confetti burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // Dynamic values based on noCount
  const getNoButtonText = () => {
    const messages = [
      "No",
      "Are you sure? 🥺",
      "Really really sure? 😢",
      "Think again... 💔"
    ];
    return messages[noCount];
  };

  const getSadMessage = () => {
    if (noCount === 1) return "First click: A little sad... 🥺";
    if (noCount === 2) return "Really? 🥺 You're breaking my heart!";
    if (noCount === 3) return "PLEASE! 😭 I'll be the best valentine ever!";
    return "";
  };

  // Dynamic values based on noCount
  const yesButtonScale = noCount === 3 ? 1.8 : 1; // More conservative scale for mobile
  const noButtonScale = noCount === 3 ? 0.6 : noCount === 2 ? 0.8 : 1;

  const images = {
    initial: "/assets/giftbox.jpg",
    sad: "/assets/sad.jpeg",
    happy: "/assets/happy.jpeg"
  };

  const getBackgroundColor = () => {
    if (isAccepted) return "#fff5f7";
    const colors = ["#fff5f7", "#fff0f3", "#ffe5ec", "#ffdae5"];
    return colors[noCount] || "#fff5f7";
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: getBackgroundColor()
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {
          hearts.map((heart, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-200"
              initial={{
                top: heart.top,
                left: heart.left,
                scale: heart.scale,
                opacity: 0.3
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: heart.duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart fill="currentColor" size={24} />
            </motion.div>
          ))
        }
      </div >

      <div className="z-10 w-full max-w-[95%] sm:max-w-2xl flex flex-col items-center gap-6 sm:gap-8 glass p-6 sm:p-10 rounded-3xl text-center shadow-xl">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-4 sm:gap-6 w-full"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-[var(--font-outfit)] gradient-text leading-tight px-2">
                Will you be my Valentine? ❤️
              </h1>

              <motion.div
                className="relative flex justify-center w-full"
                animate={{
                  scale: noCount > 0 ? 1.05 : 1,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 animate-float mx-auto bg-pink-50"
                  style={{
                    width: 'min(100%, ' + (noCount === 3 ? '450px' : noCount === 2 ? '300px' : '200px') + ')',
                    minHeight: noCount === 0 ? '200px' : 'auto'
                  }}
                >
                  <img
                    src={noCount > 0 ? images.sad : images.initial}
                    alt="Valentine character"
                    className="w-full h-auto object-cover"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop"; // Reliable romantic fallback
                    }}
                  />
                </div>

                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={noCount}
                    className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-pink-600 font-bold whitespace-nowrap text-sm sm:text-base border border-pink-100 z-20"
                  >
                    {getSadMessage()}
                  </motion.p>
                )}
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-4 w-full">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYesClick}
                  style={{
                    scale: yesButtonScale,
                    transformOrigin: 'center center'
                  }}
                  className="bg-[#ff4d6d] hover:bg-[#ff758f] text-white px-10 py-4 rounded-full text-xl sm:text-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Stars className="animate-pulse" /> Yes!
                </motion.button>

                <motion.button
                  whileHover={{ scale: noCount === 3 ? 0.6 : 1.05 }}
                  whileTap={{ scale: noCount === 3 ? 0.6 : 0.95 }}
                  animate={noCount > 0 ? {
                    x: [0, -5, 5, -5, 5, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                  key={`no-btn-${noCount}`}
                  onClick={handleNoClick}
                  disabled={noCount >= 3}
                  style={{ scale: noButtonScale }}
                  className={`bg-white border-2 border-[#ff4d6d] text-[#ff4d6d] px-8 py-3 rounded-full text-lg sm:text-xl font-bold transition-all shadow-md w-full sm:w-auto ${noCount >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {getNoButtonText()}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-[var(--font-outfit)] gradient-text leading-tight px-2">
                Yay! ❤️❤️❤️
              </h1>

              <div className="relative w-full max-w-[350px] sm:max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.1, 1] }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={images.happy}
                    alt="Happy Valentine"
                    className="w-full h-auto rounded-3xl shadow-2xl animate-float"
                  />
                </motion.div>
                <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 text-yellow-400">
                  <Sparkles size={40} className="animate-bounce sm:hidden" />
                  <Sparkles size={60} className="animate-bounce hidden sm:block" />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 italic px-4"
              >
                "Know you can't resist this cutie"
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-4 text-pink-400"
              >
                <Heart fill="currentColor" size={24} className="sm:w-8 sm:h-8" />
                <Heart fill="currentColor" size={40} className="sm:w-12 sm:h-12" />
                <Heart fill="currentColor" size={24} className="sm:w-8 sm:h-8" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-8 text-pink-300 text-sm font-medium">
        Made with Love ❤️
      </footer>
    </main >
  );
}
