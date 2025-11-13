import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pages = [
  { title: "Página 1", quote: "Acredite em si mesmo — tudo começa com um passo.", emoji: "🌱" },
  { title: "Página 2", quote: "Pequenas vitórias constroem grandes jornadas.", emoji: "🏆" },
  { title: "Página 3", quote: "Seja gentil com você — o progresso é progresso.", emoji: "💫" }
];

export default function LivroMotivacional() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function next() {
    setDirection(1);
    setIndex(i => (i + 1) % pages.length);
  }
  function prev() {
    setDirection(-1);
    setIndex(i => (i - 1 + pages.length) % pages.length);
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.98 })
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 relative overflow-hidden border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-indigo-700">Livro de Motivação</h2>
            <div className="text-sm text-gray-500">{index + 1} / {pages.length}</div>
          </div>

          <div className="h-56 flex items-center justify-center relative">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.article
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                className="absolute w-full h-full flex flex-col items-center justify-center px-6 text-center"
              >
                <div className="text-7xl mb-3">{pages[index].emoji}</div>
                <h3 className="text-xl font-medium mb-2 text-slate-700">{pages[index].title}</h3>
                <p className="text-gray-700 text-base max-w-xl">{pages[index].quote}</p>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={prev} aria-label="Página anterior" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 hover:bg-white/80 shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 16.293a1 1 0 010 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L8.414 10l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
              <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex items-center gap-3">
              {pages.map((p, i) => (
                <button key={i} onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`w-3 h-3 rounded-full ${i === index ? 'bg-indigo-600' : 'bg-gray-300'}`} aria-label={`Ir para página ${i + 1}`} />
              ))}
            </div>

            <button onClick={next} aria-label="Próxima página" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:opacity-95">
              <span className="hidden sm:inline">Próxima</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.707 3.707a1 1 0 010-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L11.586 10 6.293 4.707a1 1 0 011.414-1.414z" clipRule="evenodd"/></svg>
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-500">Use as setas ou clique nos botões para virar a página. ✨📖</div>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">Dica: personalize as frases em <code>src/LivroMotivacional.jsx</code>.</div>
      </div>
    </div>
  );
}
