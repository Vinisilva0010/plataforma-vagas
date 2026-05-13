export default function Footer() {
  return (
    <footer className="w-full bg-black text-white p-8 text-center uppercase font-bold border-t-4 border-black">
      <p>© {new Date().getFullYear()} Plataforma de Vagas. Projeto Acadêmico.</p>
    </footer>
  );
}