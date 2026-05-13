export default function Navbar() {
  return (
    <nav className="w-full border-b-4 border-black bg-yellow-300 p-4 md:px-8 flex justify-between items-center sticky top-0 z-50 text-black">
      <div className="text-3xl font-black uppercase tracking-tighter">
        MV
      </div>
      <a 
        href="#vagas" 
        className="font-black border-4 border-black bg-white px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-black hover:text-white transition-all uppercase"
      >
        Ver Oportunidades
      </a>
    </nav>
  );
}