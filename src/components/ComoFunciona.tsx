"use client";

import { useState, useEffect } from "react";

export default function ComoFunciona() {
  const frases = [
    "Vagas de estágio, trainee, júnior e jovem aprendiz",
    "Atualização semanal",
    "Faça sua busca e se cadastre",
    "Boa sorte"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Alterna a frase exibida a cada 3000ms (3 segundos)
    const timer = setInterval(() => {
      setIndex((atual) => (atual + 1) % frases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [frases.length]);

  return (
    <section className="w-full bg-white border-b-8 border-black p-8 md:py-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <h2 className="text-5xl md:text-6xl font-black uppercase mb-16 text-center border-b-8 border-black pb-4 text-black">
          Como Funciona
        </h2>

        {/* Estrutura do Monitor */}
        <div className="w-full max-w-4xl flex flex-col items-center">
          
          {/* Tela do Monitor */}
          <div className="w-full h-64 md:h-[28rem] bg-[#f0f0f0] border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative flex items-center justify-center p-8 md:p-16 z-10">
            
            {/* Detalhe: Câmera no topo */}
            <div className="absolute top-4 w-5 h-5 bg-black border-2 border-gray-600 rounded-full"></div>
            
            {/* Texto dinâmico exibido na tela */}
            <p className="text-4xl md:text-6xl font-black uppercase text-center leading-tight text-black transition-opacity duration-300">
              {frases[index]}
            </p>

            {/* Detalhe: Botão Power ligado (amarelo) na borda inferior */}
            <div className="absolute bottom-4 right-6 w-4 h-4 bg-yellow-400 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
          </div>

          {/* Pescoço do Suporte */}
          <div className="w-24 md:w-32 h-16 md:h-20 bg-gray-800 border-l-8 border-r-8 border-black relative z-0 flex justify-center">
            <div className="w-2 h-full bg-black opacity-20"></div>
          </div>
          
          {/* Base do Suporte */}
          <div className="w-64 md:w-96 h-8 md:h-12 bg-gray-800 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-t-2xl relative z-10">
            {/* Detalhe de relevo na base */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-2 bg-black rounded-full opacity-30"></div>
          </div>

        </div>
      </div>
    </section>
  );
}