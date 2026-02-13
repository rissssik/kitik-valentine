import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  delay: number;
}

export function ConfettiHearts() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const newConfetti: Confetti[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-4xl"
          style={{ left: `${item.x}%`, top: '-10%' }}
          initial={{ y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{
            y: '120vh',
            opacity: [0, 1, 1, 0],
            rotate: Math.random() * 720 - 360,
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: 3,
            delay: item.delay,
            ease: 'easeOut',
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}
