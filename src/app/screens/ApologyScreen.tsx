import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ConfettiHearts } from '../components/ConfettiHearts';

export function ApologyScreen() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleForgive = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate('/gift');
    }, 2000);
  };

  const handleSecondaryHover = () => {
    const container = containerRef.current;
    if (container) {
      const maxX = container.clientWidth - 150;
      const maxY = 200;
      setButtonPosition({
        x: (Math.random() - 0.5) * maxX,
        y: (Math.random() - 0.5) * maxY,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
      );
      
      // Убегает, если курсор ближе чем 120px
      if (distance < 120) {
        handleSecondaryHover();
      }
    }
  };

  useEffect(() => {
    if (buttonRef.current) {
      const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        handleSecondaryHover();
      };
      buttonRef.current.addEventListener('touchstart', handleTouchStart);
      return () => {
        buttonRef.current?.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {showConfetti && <ConfettiHearts />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 md:p-10 shadow-2xl border border-white/20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2
              className="text-3xl md:text-4xl mb-6 text-white"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              Китик...
            </h2>
            
            <div 
              className="text-white/90 text-lg md:text-xl leading-relaxed space-y-4"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              <p>Я правда много думал.</p>
              <p>Я понимаю, что совершал ошибки<br />и мог тебя ранить.</p>
              <p>Мне искренне жаль.</p>
              <p className="text-pink-200">Я очень хочу всё исправить<br />и стать лучше.</p>
              <p className="text-xl md:text-2xl mt-6">Пожалуйста… прости меня.</p>
            </div>
          </motion.div>

          <div ref={containerRef} onMouseMove={handleMouseMove} className="flex flex-col gap-4 mt-10 relative min-h-[200px]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleForgive}
              className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Я ПРОЩАЮ 💗
            </motion.button>

            <motion.div
              ref={buttonRef}
              animate={{ x: buttonPosition.x, y: buttonPosition.y }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onMouseEnter={handleSecondaryHover}
              className="relative z-10"
            >
              <button
                className="w-full py-3 px-6 rounded-[20px] bg-white/5 backdrop-blur-sm text-white/60 text-base border border-white/20 cursor-pointer"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Ещё подумаю
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}