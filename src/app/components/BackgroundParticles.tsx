import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  emoji: string;
}

export function BackgroundParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const emojis = ['💗', '🌸', '✨', '💕'];
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl opacity-30"
          style={{ left: `${particle.x}%` }}
          initial={{ y: '120vh', rotate: 0 }}
          animate={{
            y: '-20vh',
            rotate: 360,
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
}
