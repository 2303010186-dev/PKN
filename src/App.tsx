/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Gamepad2, Brain, ChevronRight, Home, RefreshCcw, Star, Heart, Award, Music, Music2, LogIn, UserCircle } from 'lucide-react';
import { Screen, Question, GuessImage } from './types';
import { MATERI_LIST, QUIZ_QUESTIONS, GUESS_IMAGES } from './constants';
import Mascot from './components/Mascot';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [username, setUsername] = useState('');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);
  const [guessIndex, setGuessIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed, user interaction may be needed."));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setScreen('home');
      setIsPlaying(true);
    }
  };

  // Reset games
  const startQuiz = () => {
    setCurrentQuizIndex(0);
    setScore(0);
    setFeedback(null);
    setScreen('quiz');
  };

  const startGuess = () => {
    setGuessIndex(0);
    setScore(0);
    setFeedback(null);
    setScreen('tebak-gambar');
    setUserGuess('');
    setShowHint(false);
  };

  const handleQuizAnswer = (answer: string) => {
    const question = QUIZ_QUESTIONS[currentQuizIndex];
    if (answer === question.correctAnswer) {
      setScore(s => s + 10);
      setFeedback(question.feedback);
      setFeedbackType('correct');
    } else {
      setFeedback(`Yah, kurang tepat. Jawaban yang benar adalah ${question.correctAnswer}. Semangat ya!`);
      setFeedbackType('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setFeedbackType(null);
      if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuizIndex(i => i + 1);
      } else {
        setScreen('score');
      }
    }, 3000);
  };

  const handleGuessSubmit = () => {
    const item = GUESS_IMAGES[guessIndex];
    if (userGuess.toLowerCase().trim() === item.answer.toLowerCase()) {
      setScore(s => s + 20);
      setFeedback("Wah, pinter! Itu betul sekali.");
      setFeedbackType('correct');
    } else {
      setFeedback(`Sedikit lagi! Itu adalah ${item.answer}.`);
      setFeedbackType('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setFeedbackType(null);
      setUserGuess('');
      setShowHint(false);
      if (guessIndex < GUESS_IMAGES.length - 1) {
        setGuessIndex(i => i + 1);
      } else {
        setScreen('score');
      }
    }, 3000);
  };

  const renderLogin = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6"
    >
      <div className="bg-white p-12 rounded-[60px] shadow-2xl border-4 border-natural-brown/5 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-500 via-white to-red-500" />
        
        <div className="mb-8 flex justify-center">
          <Mascot mood="happy" />
        </div>
        
        <h2 className="text-3xl font-black text-natural-brown mb-2 uppercase tracking-tighter">Halo!</h2>
        <p className="text-lg text-natural-brown/60 mb-8 font-bold">Siapa namamu, anak hebat?</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-natural-brown/30 w-6 h-6" />
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ketik namamu di sini..."
              className="w-full pl-14 p-5 rounded-3xl bg-natural-bg border-4 border-natural-brown/5 focus:border-natural-emerald/30 outline-none font-bold text-xl text-natural-brown placeholder:text-natural-brown/20 transition-all"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-natural-emerald text-white py-5 rounded-3xl font-black text-2xl shadow-xl hover:bg-emerald-600 transition-all border-b-8 border-emerald-800 active:border-b-0 active:translate-y-2 flex items-center justify-center gap-3"
          >
            Ayo Main! <ChevronRight className="w-8 h-8" />
          </button>
        </form>
      </div>
    </motion.div>
  );

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6"
    >
      <Mascot mood="happy" />
      <h1 className="text-5xl font-black text-natural-brown mt-6 tracking-tight uppercase">
        Petualangan <span className="text-natural-accent underline decoration-4 decoration-natural-accent/30">Budaya PKN</span>
      </h1>
      <p className="text-xl text-natural-brown/80 mt-4 max-w-lg font-medium">
        Halo, <span className="text-natural-emerald font-black">anak-anak</span>! Ayo belajar tentang Indonesia bersama Saya! Seru lho!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl">
        <MenuButton 
          icon={<BookOpen className="w-10 h-10" />}
          title="Materi Seru" 
          color="bg-natural-emerald"
          borderColor="border-emerald-700"
          onClick={() => setScreen('materi')}
        />
        <MenuButton 
          icon={<Brain className="w-10 h-10" />}
          title="Kuis Pintar" 
          color="bg-natural-amber"
          borderColor="border-amber-600"
          onClick={startQuiz}
        />
        <MenuButton 
          icon={<Gamepad2 className="w-10 h-10" />}
          title="Tebak Gambar" 
          color="bg-natural-sky"
          borderColor="border-sky-600"
          onClick={startGuess}
        />
      </div>

      <div className="mt-16 py-2 px-6 border-2 border-dashed border-natural-brown/20 rounded-2xl">
        <p className="text-[10px] text-natural-brown/40 uppercase tracking-[0.2em] font-black">
          Implementasi Metode MDLC • PKN Kelas 2 SD
        </p>
      </div>
    </motion.div>
  );

  const renderMateri = () => (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10 bg-white p-6 rounded-3xl shadow-xl border-4 border-natural-brown/5">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen('home')} className="p-3 bg-natural-bg rounded-full hover:bg-natural-amber/20 transition-colors border-2 border-natural-brown/10">
            <Home className="w-6 h-6 text-natural-brown" />
          </button>
          <h2 className="text-3xl font-black text-natural-brown uppercase tracking-tight">Materi Belajar</h2>
        </div>
        <div className="hidden md:flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-natural-emerald" />)}
        </div>
      </div>

      <div className="grid gap-8">
        {MATERI_LIST.map((m, idx) => (
          <motion.div 
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-natural-brown/5 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-natural-bg rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            
            <div className="bg-natural-bg p-6 rounded-3xl border-2 border-natural-brown/10 shadow-inner relative z-10 shrink-0">
              {m.title === 'Lambang Negara' && <Star className="w-12 h-12 text-natural-amber" />}
              {m.title === 'Bhinneka Tunggal Ika' && <Heart className="w-12 h-12 text-natural-emerald" />}
              {m.title === 'Budaya Sunda' && <Award className="w-12 h-12 text-natural-sky" />}
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-natural-brown mb-3 uppercase tracking-tight flex items-center gap-2">
                <span className="text-natural-accent">#</span>{m.title}
              </h3>
              <p className="text-lg text-natural-brown/80 leading-relaxed font-medium">{m.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button 
           onClick={startQuiz}
           className="bg-natural-emerald text-white px-10 py-5 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-emerald-600 transition-all flex items-center gap-3 group border-b-8 border-emerald-700 active:border-b-0 active:translate-y-2"
        >
          Ayo Mulai Kuis! <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const q = QUIZ_QUESTIONS[currentQuizIndex];
    return (
      <div className="p-6 max-w-3xl mx-auto min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full bg-natural-brown/10 h-4 rounded-full mb-10 overflow-hidden border-2 border-natural-brown/5">
          <motion.div 
            className="bg-natural-emerald h-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={q.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-white p-10 rounded-[60px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] w-full text-center relative overflow-hidden border-4 border-natural-brown/5"
          >
            <div className="absolute top-6 right-10 text-natural-brown/10 font-black text-6xl italic select-none">
              {currentQuizIndex + 1}
            </div>
            
            <div className="mb-6 flex justify-center">
              <Mascot mood={feedbackType === 'correct' ? 'correct' : feedbackType === 'wrong' ? 'wrong' : 'thinking'} />
            </div>
            
            <h3 className="text-3xl font-black text-natural-brown mt-4 mb-10 leading-tight">
              {q.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  disabled={!!feedback}
                  onClick={() => handleQuizAnswer(opt)}
                  className={`py-5 px-8 rounded-3xl font-black text-xl transition-all border-b-8 active:border-b-0 active:translate-y-2 ${
                    feedback && opt === q.correctAnswer 
                      ? 'bg-natural-emerald text-white border-emerald-800' 
                      : feedback && opt !== q.correctAnswer
                      ? 'opacity-40 bg-gray-100 border-gray-300'
                      : 'bg-natural-bg text-natural-brown border-natural-brown/10 hover:bg-white hover:shadow-xl'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg p-8 rounded-[40px] text-white text-center font-black text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 border-b-8 border-black/20 ${
                feedbackType === 'correct' ? 'bg-natural-emerald' : 'bg-natural-cinnabar'
              }`}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderTebakGambar = () => (
    <div className="p-6 max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-12 rounded-[60px] shadow-2xl w-full text-center border-4 border-natural-brown/5 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-natural-sky rounded-full border-b-4 border-sky-600" />
             <h3 className="text-2xl font-black text-natural-brown uppercase">Tebak Gambar</h3>
           </div>
           <Mascot mood={feedbackType === 'correct' ? 'correct' : feedbackType === 'wrong' ? 'wrong' : 'thinking'} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative group cursor-pointer overflow-hidden rounded-[40px] shadow-inner aspect-square bg-natural-bg border-4 border-natural-bg">
             <img 
               src={GUESS_IMAGES[guessIndex].imageUrl} 
               alt="Tebak" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               referrerPolicy="no-referrer"
             />
             {!showHint && (
               <button 
                 onClick={() => setShowHint(true)}
                 className="absolute inset-0 flex items-center justify-center bg-natural-brown/60 text-white font-black text-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 Lihat Petunjuk?
               </button>
             )}
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col h-full justify-center">
            {showHint && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 p-6 bg-natural-amber/10 rounded-[30px] text-natural-brown text-lg font-bold border-2 border-dashed border-natural-amber"
              >
                💡 {GUESS_IMAGES[guessIndex].hint}
              </motion.div>
            )}

            <div className="space-y-4">
              <input 
                type="text" 
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Jawabanmu..."
                className="w-full p-6 rounded-3xl bg-natural-bg border-4 border-natural-brown/5 focus:border-natural-sky/50 outline-none font-black text-2xl text-center text-natural-brown placeholder:text-natural-brown/20 transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleGuessSubmit()}
              />
              <button 
                onClick={handleGuessSubmit}
                className="w-full bg-natural-sky text-white py-6 rounded-3xl font-black text-2xl shadow-xl hover:bg-sky-500 transition-all border-b-8 border-sky-700 active:border-b-0 active:translate-y-2"
              >
                Periksa Sekarang!
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg p-8 rounded-[40px] text-white text-center font-black text-2xl shadow-2xl z-50 border-b-8 border-black/20 ${
              feedbackType === 'correct' ? 'bg-natural-emerald' : 'bg-natural-cinnabar'
            }`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderScore = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6"
    >
      <div className="bg-white p-16 rounded-[80px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative border-4 border-natural-brown/5">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <Mascot mood="correct" />
        </div>
        <h2 className="text-5xl font-black text-natural-brown mt-10 mb-4 uppercase tracking-tighter">Luar Biasa!</h2>
        <p className="text-2xl text-natural-brown/60 mb-12 font-bold italic">"Silih Asah, Silih Asuh, Silih Asih"</p>
        
        <div className="bg-natural-bg rounded-[40px] p-12 mb-12 border-4 border-dashed border-natural-brown/20 relative">
           <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-natural-amber px-6 py-1 rounded-full text-white font-black text-sm uppercase">Total Skor</div>
           <div className="text-8xl font-black text-natural-brown tabular-nums tracking-tighter">{score}</div>
           <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-8 h-8 ${i <= score / 10 ? 'text-natural-amber fill-natural-amber' : 'text-natural-brown/10'}`} />)}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setScreen('home')}
            className="bg-natural-brown text-white py-5 px-10 rounded-3xl font-black text-xl shadow-xl border-b-8 border-black/40 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-center gap-3"
          >
            <Home className="w-8 h-8" /> Beranda
          </button>
          <button 
            onClick={startQuiz}
            className="bg-natural-amber text-white py-5 px-10 rounded-3xl font-black text-xl shadow-xl border-b-8 border-amber-700 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-center gap-3"
          >
            <RefreshCcw className="w-8 h-8" /> Main Lagi
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-natural-bg font-sans selection:bg-natural-amber/30 text-natural-brown overflow-x-hidden">
      {/* Indonesia Header Accent */}
      <header className="bg-natural-header p-5 flex justify-between items-center border-b-8 border-natural-accent shadow-2xl relative z-30">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-4 border-natural-amber shadow-xl rotate-3">
            <span className="text-3xl">🇮🇩</span>
          </div>
          <div>
            <h1 className="text-white font-black text-2xl uppercase tracking-wider">Petualangan PKN</h1>
            <p className="text-natural-amber text-xs font-bold uppercase tracking-widest">MDLC • Kelas 2 SD</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-3 rounded-2xl transition-all shadow-lg border-b-4 active:translate-y-1 active:border-b-0 ${
              isPlaying ? 'bg-natural-emerald text-white border-emerald-700' : 'bg-gray-200 text-gray-500 border-gray-400'
            }`}
          >
            {isPlaying ? <Music className="w-6 h-6 animate-bounce" /> : <Music2 className="w-6 h-6" />}
          </button>
          <div className="hidden sm:flex bg-white/10 px-6 py-2 rounded-2xl text-white font-black items-center gap-2 border-2 border-white/20">
            <Star className="text-natural-amber w-5 h-5 fill-natural-amber" /> {score} Poin
          </div>
          {screen !== 'login' && screen !== 'home' && (
            <button 
               onClick={() => setScreen('home')}
               className="bg-natural-cinnabar px-6 py-2 rounded-2xl text-white font-black cursor-pointer hover:bg-red-600 shadow-xl border-b-4 border-red-800 transition-all active:translate-y-1 active:border-b-0"
            >
              Keluar
            </button>
          )}
        </div>
      </header>

      {/* Background music */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
      />

      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] pattern-batik z-0" />
      
      <main className="relative z-10 w-full max-w-6xl mx-auto pt-10 pb-20 px-4">
        {screen === 'login' && renderLogin()}
        {screen === 'home' && renderHome()}
        {screen === 'materi' && renderMateri()}
        {screen === 'quiz' && renderQuiz()}
        {screen === 'tebak-gambar' && renderTebakGambar()}
        {screen === 'score' && renderScore()}
      </main>

      {/* Flag footer pattern */}
      <footer className="fixed bottom-0 left-0 right-0 h-4 bg-natural-header flex z-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
          <React.Fragment key={i}>
            <div className="h-full bg-red-600 flex-1"></div>
            <div className="h-full bg-white flex-1"></div>
          </React.Fragment>
        ))}
      </footer>

      <style>{`
        .pattern-batik {
          background-image: url("https://www.transparenttextures.com/patterns/handmade-paper.png");
        }
      `}</style>
    </div>
  );
}

function MenuButton({ title, icon, color, borderColor, onClick }: { title: string, icon: React.ReactNode, color: string, borderColor: string, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${color} text-white p-8 rounded-[40px] shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all flex flex-col items-center justify-center gap-6 group border-b-[12px] ${borderColor}`}
    >
      <div className="bg-white/20 p-5 rounded-[2rem] group-hover:rotate-12 transition-transform shadow-inner">
        {icon}
      </div>
      <span className="text-2xl font-black tracking-tight uppercase">{title}</span>
    </motion.button>
  );
}
