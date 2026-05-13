"use client";

import { useState, useMemo } from "react";
import { Vaga } from "@/lib/vagas";

export default function ListaVagas({ vagasIniciais }: { vagasIniciais: Vaga[] }) {
  const [busca, setBusca] = useState("");
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // Extrai todas as áreas e tipos únicos que existem atualmente na planilha
  const { areas, tipos } = useMemo(() => {
    const areasSet = new Set<string>();
    const tiposSet = new Set<string>();

    vagasIniciais.forEach((vaga) => {
      if (vaga.area) areasSet.add(vaga.area);
      if (vaga.tipoVaga) tiposSet.add(vaga.tipoVaga);
    });

    return {
      areas: Array.from(areasSet).sort(),
      tipos: Array.from(tiposSet).sort(),
    };
  }, [vagasIniciais]);

  // Aplica os três filtros em cascata
  const vagasFiltradas = vagasIniciais.filter((vaga) => {
    const termoBusca = busca.toLowerCase();
    
    // 1. Busca textual por Título, Empresa ou Cidade
    const matchBusca = termoBusca === "" || 
      vaga.titulo.toLowerCase().includes(termoBusca) ||
      vaga.empresa.toLowerCase().includes(termoBusca) ||
      (vaga.cidade && vaga.cidade.toLowerCase().includes(termoBusca));

    // 2. Filtro exato por Área
    const matchArea = filtroArea === "" || vaga.area === filtroArea;

    // 3. Filtro exato por Tipo de Vaga
    const matchTipo = filtroTipo === "" || vaga.tipoVaga === filtroTipo;

    return matchBusca && matchArea && matchTipo;
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Controles de Busca e Filtros */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <input
          type="text"
          placeholder="BUSCAR VAGA, EMPRESA OU CIDADE..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="flex-grow p-4 text-xl font-black uppercase border-4 border-black focus:outline-none focus:bg-yellow-100 transition-colors placeholder:text-gray-500"
        />

        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
          className="p-4 text-xl font-black uppercase border-4 border-black bg-white focus:outline-none focus:bg-yellow-100 cursor-pointer md:w-64 appearance-none rounded-none"
        >
          <option value="">TODAS AS ÁREAS</option>
          {areas.map((area) => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="p-4 text-xl font-black uppercase border-4 border-black bg-white focus:outline-none focus:bg-yellow-100 cursor-pointer md:w-64 appearance-none rounded-none"
        >
          <option value="">TODOS OS TIPOS</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {vagasFiltradas.length > 0 ? (
          vagasFiltradas.map((vaga, index) => (
            <div 
              key={index} 
              className="bg-white border-4 border-black p-6 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-black text-white px-3 py-1 font-bold text-sm uppercase">
                    {vaga.tipoVaga || "Vaga"}
                  </span>
                  <span className="font-bold border-2 border-black px-2 py-1 text-sm bg-yellow-300">
                    {vaga.dataInclusao}
                  </span>
                </div>
                <h2 className="text-2xl font-black uppercase leading-tight mb-2 break-words">
                  {vaga.titulo}
                </h2>
                <p className="text-lg font-bold mb-1 border-b-2 border-transparent hover:border-black inline-block">
                  {vaga.empresa}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {vaga.area && (
                    <span className="bg-gray-200 border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                      {vaga.area}
                    </span>
                  )}
                  {vaga.cidade && (
                    <span className="bg-[#f0f0f0] border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                      📍 {vaga.cidade}
                    </span>
                  )}
                </div>
              </div>
              
              <a 
                href={vaga.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 block w-full text-center bg-black text-white font-black uppercase py-4 border-4 border-black hover:bg-white hover:text-black transition-colors"
              >
                Candidatar-se →
              </a>
            </div>
          ))
        ) : (
          <div className="col-span-full border-4 border-black p-10 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-3xl font-black uppercase mb-2">Nenhum resultado.</p>
            <p className="text-xl font-bold">Tente alterar os filtros ou o termo de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
}