import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ConfettiHearts } from '../components/ConfettiHearts';
import angryKittyImage from 'figma:asset/ce5c761189bfaed4694b7eed5e6dc29060c729d4.png';
import happyKittyImage from 'figma:asset/fb53be265f2a18f701d1ebb09145e41767f00e91.png';

export function ValentineQuestion() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const navigate = useNavigate();

  const questions = [
    'Китик, ты будешь моей валентинкой? 💗',
    'Ну пожалуйста, будешь? 🥺',
    'Может все-таки да? 💕',
    'Ну Китик, ну будешь? 🙏',
    'Последний шанс передумать! 😊',
  ];

  const handleNoClick = () => {
    setNoClickCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowPhoto(true);
    }, 1000);
  };

  const handlePlayGame = () => {
    navigate('/apology');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {showConfetti && <ConfettiHearts />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        {!showPhoto ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 shadow-2xl border border-white/20">
            {/* Фото котика */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <motion.div
                className="rounded-[24px] overflow-hidden mx-auto max-w-[280px]"
                animate={noClickCount >= 3 ? { rotate: [0, -2, 2, -2, 0] } : { scale: [1, 1.02, 1] }}
                transition={noClickCount >= 3 ? { duration: 0.5, repeat: Infinity, repeatDelay: 1 } : { duration: 2, repeat: Infinity }}
              >
                <motion.img
                  key={noClickCount >= 3 ? 'angry' : 'happy'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={noClickCount >= 3 ? angryKittyImage : happyKittyImage}
                  alt={noClickCount >= 3 ? 'Сердитый котик' : 'Милый котик'}
                  className="w-full"
                />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl text-center mb-8 text-white"
              style={{ fontFamily: 'Pacifico, cursive' }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {questions[noClickCount]}
            </motion.h1>

            <div className="flex flex-col gap-4 mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Да 💕
              </motion.button>

              {noClickCount < 3 && (
                <motion.button
                  key={noClickCount}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNoClick}
                  className="w-full py-4 px-8 rounded-[24px] bg-white/10 backdrop-blur-sm text-white/80 text-lg border border-white/30 hover:bg-white/20 transition-all"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                  animate={noClickCount > 0 ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Нет
                </motion.button>
              )}

              {noClickCount >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-2"
                >
                  <motion.p
                    className="text-white/95 text-xl font-bold mb-2"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Ой, кнопка "Нет" куда-то пропала! 😱
                  </motion.p>
                  <motion.p
                    className="text-white/80 text-base"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Видимо, остался только один вариант... 😏
                  </motion.p>
                </motion.div>
              )}

              {noClickCount > 0 && noClickCount < 3 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-white/90 text-lg mt-2"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Это неправильный ответ 😄
                </motion.p>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 shadow-2xl border border-white/20 text-center"
          >
            <motion.div
              className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 shadow-lg shadow-pink-500/30 flex items-center justify-center overflow-hidden"
              animate={{ 
                boxShadow: [
                  '0 20px 50px rgba(236, 72, 153, 0.3)',
                  '0 20px 50px rgba(236, 72, 153, 0.6)',
                  '0 20px 50px rgba(236, 72, 153, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">💗</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayGame}
              className="w-full py-5 px-8 rounded-[24px] bg-gradient-to-r from-pink-400 to-rose-400 text-white text-xl font-bold shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Сыграем в игру? 🎮
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}