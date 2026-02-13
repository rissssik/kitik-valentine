import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import catImage from '../../assets/48057e9100aa0c2290abecba4f9eaff671608554.png';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

interface Heart {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  duration: number;
}

export function FinalScreen() {
  const navigate = useNavigate();
  const [petals, setPetals] = useState<Petal[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 8 + Math.random() * 4,
    }));
    setPetals(newPetals);
  }, []);

  const handleMeow = () => {
    setShowCelebration(true);
    
    // Создаем 50 сердечек
    const newHearts: Heart[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      duration: 2 + Math.random() * 2,
    }));
    setHearts(newHearts);

    // Убираем эффект через 4 секунды
    setTimeout(() => {
      setShowCelebration(false);
      setHearts([]);
    }, 4000);
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute text-3xl"
            style={{ left: `${petal.x}%` }}
            initial={{ y: '-10vh', rotate: 0, opacity: 0 }}
            animate={{
              y: '110vh',
              rotate: 360,
              opacity: [0, 1, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 md:p-12 shadow-2xl border border-white/20 text-center">
          <motion.div
            className="w-56 h-56 mx-auto mb-8 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-rose-300 shadow-2xl flex items-center justify-center overflow-hidden relative"
            animate={{
              boxShadow: [
                '0 25px 60px rgba(236, 72, 153, 0.4)',
                '0 25px 60px rgba(168, 85, 247, 0.6)',
                '0 25px 60px rgba(236, 72, 153, 0.4)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-400/30 animate-pulse" />
            <span className="text-8xl relative z-10">💗</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl mb-6 text-white leading-tight"
            style={{ fontFamily: 'Pacifico, cursive' }}
          >
            Я тебя люблю,<br />Китик 💗
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 space-y-3"
          >
            <p
              className="text-white/90 text-lg md:text-xl"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Спасибо, что ты есть ✨
            </p>
          </motion.div>

          {/* Милый котик */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mb-6"
          >
            <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 mb-4 rounded-[24px] overflow-hidden shadow-xl">
              <img
                src={catImage}
                alt="Милый котик"
                className="w-full h-full object-cover"
              />
            </div>
            <p
              className="text-white/70 text-sm italic mb-4"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              это вы после прохождения игры
            </p>
            <div
              className="bg-white/20 backdrop-blur-sm rounded-[20px] p-5 text-white/95 text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Надеюсь тебе понравился этот интерактив я правда очень тебя люблю и хотел бы чтобы ты дала мне шанс
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMeow}
            className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xl font-bold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all mb-4"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Миииииииии 🥰✨💕🐱
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Пройти ещё раз 🔄
          </motion.button>
        </div>
      </motion.div>

      {/* Эффект празднования */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-3xl"
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, heart.scale, 0.5],
                rotate: [0, heart.rotation, 0],
              }}
              transition={{
                duration: heart.duration,
                ease: 'linear',
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
