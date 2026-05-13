import { getVagasValidadas } from "@/lib/vagas";
import ListaVagas from "@/components/ListaVagas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Footer from "@/components/Footer";

export const revalidate = 3600;

export default async function Home() {
  const vagas = await getVagasValidadas();

  return (
    <div className="min-h-screen flex flex-col font-sans text-black bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ComoFunciona />
        
        {/* Seção de Vagas */}
        <section id="vagas" className="w-full bg-[#f0f0f0] p-8 md:p-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto mb-10 border-b-8 border-black pb-4 flex justify-between items-end">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Quadro de Vagas
            </h2>
            <span className="font-bold uppercase text-xl bg-black text-white px-3 py-1">
              {vagas.length} Ativas
            </span>
          </div>
          
          <ListaVagas vagasIniciais={vagas} />
        </section>
      </main>
      <Footer />
    </div>
  );
}