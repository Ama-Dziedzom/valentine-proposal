"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stars, Sparkles } from "lucide-react";

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3");
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

  const yesButtonScale = noCount === 3 ? 2.5 : 1;
  const noButtonScale = noCount === 3 ? 0.4 : noCount === 2 ? 0.75 : 1;
  const imageSize = noCount === 3 ? 600 : noCount === 2 ? 400 : noCount === 1 ? 250 : 200;

  const images = {
    initial: "https://media.tenor.com/jE7JvS-1y60AAAAC/bear-cute.gif",
    sad: "/sad-me.jpg",
    happy: "/happy-me.jpg"
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#fff5f7]">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.3
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart fill="currentColor" size={24} />
          </motion.div>
        ))}
      </div>

      <div className="z-10 w-full max-w-2xl flex flex-col items-center gap-8 glass p-8 rounded-3xl text-center shadow-xl">
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold font-[var(--font-outfit)] gradient-text">
                Will you be my Valentine? ❤️
              </h1>

              <motion.div
                className="relative"
                animate={{
                  scale: noCount > 0 ? 1.1 : 1,
                }}
              >
                <img
                  src={noCount > 0 ? images.sad : images.initial}
                  alt="Valentine character"
                  style={{ width: imageSize, height: 'auto' }}
                  className="rounded-2xl shadow-lg transition-all duration-500 animate-float"
                />

                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={noCount}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md text-pink-600 font-semibold whitespace-nowrap"
                  >
                    {getSadMessage()}
                  </motion.p>
                )}
              </motion.div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleYesClick}
                  style={{ scale: yesButtonScale }}
                  className="bg-[#ff4d6d] hover:bg-[#ff758f] text-white px-8 py-3 rounded-full text-xl font-bold transition-all shadow-lg flex items-center gap-2"
                >
                  <Stars className="animate-pulse" /> Yes!
                </motion.button>

                <motion.button
                  whileHover={{ scale: noCount === 3 ? 0.4 : 1.05 }}
                  whileTap={{ scale: noCount === 3 ? 0.4 : 0.95 }}
                  onClick={handleNoClick}
                  disabled={noCount >= 3}
                  style={{ scale: noButtonScale }}
                  className={`bg-white border-2 border-[#ff4d6d] text-[#ff4d6d] px-8 py-3 rounded-full text-xl font-bold transition-all shadow-md ${noCount >= 3 ? 'cursor-not-allowed' : ''}`}
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
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold font-[var(--font-outfit)] gradient-text leading-tight">
                Yay! ❤️❤️❤️
              </h1>

              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={images.happy}
                    alt="Happy Valentine"
                    className="w-[300px] md:w-[450px] rounded-2xl shadow-xl animate-float"
                  />
                </motion.div>
                <div className="absolute -top-10 -right-10 text-yellow-400">
                  <Sparkles size={60} className="animate-bounce" />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-pink-600 italic"
              >
                "Know you can't resist this cutie"
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-4 text-pink-400"
              >
                <Heart fill="currentColor" size={32} />
                <Heart fill="currentColor" size={48} />
                <Heart fill="currentColor" size={32} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="absolute bottom-4 text-pink-300 text-sm font-medium">
        Made with Love ❤️
      </footer>
    </main>
  );
}
