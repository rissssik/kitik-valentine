import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Heart, HeartCrack, Sparkles } from 'lucide-react';

interface MovingHeart {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isBroken: boolean;
  collected: boolean;
}

export function HeartGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [hearts, setHearts] = useState<MovingHeart[]>([]);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; id: number } | null>(null);
  const navigate = useNavigate();
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const effectIdCounter = useRef(0);

  const initializeHearts = () => {
    const totalHearts = 35;
    const brokenCount = 8;
    const newHearts: MovingHeart[] = [];

    for (let i = 0; i < totalHearts; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 85 + 5,
        y: Math.random() * 85 + 5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        isBroken: i < brokenCount,
        collected: false,
      });
    }

    // Shuffle to mix good and broken hearts
    for (let i = newHearts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newHearts[i], newHearts[j]] = [newHearts[j], newHearts[i]];
    }

    return newHearts;
  };

  const startGame = () => {
    setGameStarted(true);
    setGameStatus('playing');
    setScore(0);
    setMistakes(0);
    setTimeLeft(20);
    setHearts(initializeHearts());
  };

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameStatus('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const animate = () => {
      setHearts((prevHearts) =>
        prevHearts.map((heart) => {
          if (heart.collected) return heart;

          let newX = heart.x + heart.vx;
          let newY = heart.y + heart.vy;
          let newVx = heart.vx;
          let newVy = heart.vy;

          // Bounce off walls
          if (newX <= 0 || newX >= 95) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(95, newX));
          }
          if (newY <= 0 || newY >= 90) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(90, newY));
          }

          return {
            ...heart,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStatus]);

  useEffect(() => {
    if (score >= 15 && gameStatus === 'playing') {
      setGameStatus('won');
    }
  }, [score, gameStatus]);

  useEffect(() => {
    if (mistakes >= 3 && gameStatus === 'playing') {
      setGameStatus('lost');
    }
  }, [mistakes, gameStatus]);

  const handleHeartClick = (heart: MovingHeart, event: React.MouseEvent | React.TouchEvent) => {
    if (heart.collected || gameStatus !== 'playing') return;

    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (rect) {
      const clientX = 'touches' in event ? event.touches[0]?.clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0]?.clientY : event.clientY;
      
      setClickEffect({
        x: clientX - rect.left,
        y: clientY - rect.top,
        id: effectIdCounter.current++,
      });

      setTimeout(() => setClickEffect(null), 500);
    }

    setHearts((prev) =>
      prev.map((h) => (h.id === heart.id ? { ...h, collected: true } : h))
    );

    if (heart.isBroken) {
      setMistakes((prev) => prev + 1);
    } else {
      setScore((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    navigate('/final');
  };

  if (gameStatus === 'won') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 md:p-10 shadow-2xl border border-white/20 text-center">
            <motion.div
              className="text-7xl mb-6"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              🎉
            </motion.div>
            <h2
              className="text-3xl md:text-4xl mb-4 text-white"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              Ты справилась!
            </h2>
            <p
              className="text-white/90 text-xl mb-8"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Ты собрала {score} сердечек! 💗
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Дальше 💕
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 md:p-10 shadow-2xl border border-white/20 text-center">
            <div className="text-7xl mb-6">💔</div>
            <h2
              className="text-3xl md:text-4xl mb-4 text-white"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              {mistakes >= 3 ? 'Неее, так не пойдёт 😄' : 'Время вышло 😄'}
            </h2>
            <p
              className="text-white/90 text-lg mb-8"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              {mistakes >= 3 ? 'Слишком много разбитых сердечек!' : 'Давай ещё раз!'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Заново 🔄
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 md:p-10 shadow-2xl border border-white/20 text-center">
            <motion.div
              className="text-7xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💗
            </motion.div>
            <h2
              className="text-3xl md:text-4xl mb-4 text-white"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              Игра с сердечками
            </h2>
            <p
              className="text-white/90 text-lg mb-8 leading-relaxed"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Собери 15 хороших сердечек 💗<br />
              Не нажимай на разбитые 💔<br />
              У тебя 20 секунд!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Начать 🎮
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-6 md:p-8 shadow-2xl border border-white/20">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div
              className="bg-gradient-to-r from-pink-500/30 to-rose-500/30 backdrop-blur-sm rounded-[20px] px-5 py-3 text-white font-bold text-lg border border-pink-400/30"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <span className="text-pink-200">Собрано:</span> {score} / 15
            </div>
            <div
              className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-[20px] px-5 py-3 text-white font-bold text-lg border border-purple-400/30"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <span className="text-purple-200">Время:</span> {timeLeft}с
            </div>
            <div
              className="bg-gradient-to-r from-gray-500/30 to-gray-600/30 backdrop-blur-sm rounded-[20px] px-5 py-3 text-white font-bold text-lg border border-gray-400/30"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <span className="text-gray-200">Ошибки:</span> {mistakes} / 3
            </div>
          </div>

          <div
            ref={gameAreaRef}
            className="relative bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-rose-400/20 backdrop-blur-sm rounded-[24px] overflow-hidden border-2 border-white/40 shadow-inner"
            style={{ height: '500px', touchAction: 'none' }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,192,203,0.15),transparent_70%)]" />

            {hearts.map((heart) => {
              if (heart.collected) return null;

              return (
                <motion.button
                  key={heart.id}
                  onClick={(e) => handleHeartClick(heart, e)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleHeartClick(heart, e);
                  }}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 active:scale-75 transition-transform"
                  style={{
                    left: `${heart.x}%`,
                    top: `${heart.y}%`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.6 }}
                >
                  {heart.isBroken ? (
                    <HeartCrack
                      className="w-12 h-12 md:w-14 md:h-14 text-gray-400/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                      fill="currentColor"
                    />
                  ) : (
                    <Heart
                      className="w-12 h-12 md:w-14 md:h-14 text-rose-500 drop-shadow-[0_2px_8px_rgba(244,63,94,0.6)]"
                      fill="currentColor"
                    />
                  )}
                </motion.button>
              );
            })}

            {clickEffect && (
              <motion.div
                key={clickEffect.id}
                className="absolute pointer-events-none"
                style={{
                  left: clickEffect.x,
                  top: clickEffect.y,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
            )}
          </div>

          <div
            className="mt-5 text-center text-white/80 text-base"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Нажимай на хорошие сердечки 💗 Избегай разбитых 💔
          </div>
        </div>
      </motion.div>
    </div>
  );
}