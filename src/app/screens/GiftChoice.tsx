import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Gift {
  id: string;
  emoji: string;
  text: string;
  message: string;
}

const gifts: Gift[] = [
  { id: 'flowers', emoji: '💐', text: 'Букет цветов', message: 'Отлично! Я приготовлю тебе букет 💐' },
  { id: 'chocolate', emoji: '🍫', text: 'Шоколадка', message: 'Сладкого тебе! Приготовлю шоколадку 🍫' },
  { id: 'car', emoji: '🚗', text: 'Крутая тачка', message: 'Ого! С этим подарком придётся чуть подождать… но я уже гуглю «как заработать на суперкар» 😄🚗' },
  { id: 'hug', emoji: '🤗', text: 'Объятие', message: 'Самый лучший подарок! Обниму крепко 🤗💕' },
];

export function GiftChoice() {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGiftSelect = (giftId: string) => {
    setSelectedGift(giftId);
  };

  const handleContinue = () => {
    navigate('/game');
  };

  const selectedGiftData = gifts.find((g) => g.id === selectedGift);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 md:p-10 shadow-2xl border border-white/20">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl text-center mb-8 text-white"
            style={{ fontFamily: 'Pacifico, cursive' }}
          >
            Выбери подарок 🎁
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {gifts.map((gift, index) => (
              <motion.button
                key={gift.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGiftSelect(gift.id)}
                className={`p-6 rounded-[24px] transition-all ${
                  selectedGift === gift.id
                    ? 'bg-gradient-to-br from-pink-400 to-rose-400 shadow-lg shadow-pink-500/50'
                    : 'bg-white/10 hover:bg-white/20 border border-white/30'
                }`}
              >
                <div className="text-5xl mb-3">{gift.emoji}</div>
                <div
                  className={`text-lg font-semibold ${
                    selectedGift === gift.id ? 'text-white' : 'text-white/90'
                  }`}
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {gift.text}
                </div>
              </motion.button>
            ))}
          </div>

          {selectedGift && selectedGiftData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div
                className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 text-center text-white text-lg"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {selectedGiftData.message}
              </div>
            </motion.div>
          )}

          {selectedGift && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Дальше ➜
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}