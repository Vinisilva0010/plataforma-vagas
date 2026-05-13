export default function Hero() {
  // Posições espalhadas e tamanhos gigantes para as logos
  const cartas = [
    { id: 1, arquivo: '/bra.png', classes: 'top-[-5%] left-[-10%] md:left-5 -rotate-12' },
    { id: 2, arquivo: '/c6.png', classes: 'top-[-5%] right-[-10%] md:right-10 rotate-[15deg]' },
    { id: 3, arquivo: '/gm.png', classes: 'bottom-[-10%] left-[-5%] md:left-[15%] rotate-[25deg]' },
    { id: 4, arquivo: '/ibm.png', classes: 'bottom-0 right-[-5%] md:right-[15%] -rotate-[20deg]' },
    { id: 5, arquivo: '/itau.png', classes: 'top-[20%] left-[5%] md:left-[30%] -rotate-[35deg]' },
    { id: 6, arquivo: '/spx.png', classes: 'top-[30%] right-[5%] md:right-[25%] rotate-[20deg]' },
  ];

  return (
    <section className="relative w-full bg-[#f0f0f0] border-b-8 border-black overflow-hidden flex flex-col items-center justify-center min-h-[80vh] p-4">
      
      {/* Camada de Fundo: Cartões Gigantes com as Logos */}
      {cartas.map((carta) => (
        <div 
          key={carta.id} 
          className={`absolute w-40 h-40 md:w-80 md:h-80 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8 flex items-center justify-center hover:z-20 hover:scale-110 hover:-translate-y-4 transition-all duration-300 ${carta.classes}`}
        >
          {/* A tag img agora está descomentada e apontando para os arquivos que você salvou */}
          <img src={carta.arquivo} alt={`Logo Empresa ${carta.id}`} className="w-full h-full object-contain" />
        </div>
      ))}

      {/* Camada Frontal: Apenas Título e Botão */}
      <div className="relative z-30 flex flex-col items-center">
        <h1 
          className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-none mb-12 text-yellow-300 text-center"
          style={{ 
            WebkitTextStroke: '4px black', 
            textShadow: '8px 8px 0px #000' 
          }}
        >
          Melhores<br/>Vagas
        </h1>
        
        <a 
          href="#vagas" 
          className="bg-yellow-300 text-black text-2xl md:text-4xl font-black uppercase px-12 py-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Explorar Vagas
        </a>
      </div>
    </section>
  );
}