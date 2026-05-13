import { google } from 'googleapis';
import path from 'path';
import { z } from 'zod';

// Esquema de domínio: define o que é uma Vaga válida
const VagaSchema = z.object({
  dataInclusao: z.string(),
  area: z.string().optional(),
  empresa: z.string().min(1, "Empresa é obrigatória"),
  cidade: z.string().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  // Aceita URLs estritas ou strings com protocolo http para evitar quebras por erro de digitação
  link: z.string().url().or(z.string().startsWith('http')), 
  tipoVaga: z.string().optional(),
});

export type Vaga = z.infer<typeof VagaSchema>;

export async function getVagasValidadas(): Promise<Vaga[]> {
  // O process.cwd() garante que o Next.js ache o arquivo na raiz do projeto
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'credenciais.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '13lutgdWIY7ezc-6PihVQcjWaqsdk0Pb-SBIEDpHx9as';
  
  // Lendo a aba atual validada. No futuro, isso pode ser dinâmico (ex: buscar abas ativas)
  const range = "'05/2026'!A:Z"; 

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    // Remove a primeira linha (cabeçalho)
    const dataRows = rows.slice(1);

    const vagasTratadas = dataRows.map((row) => {
      // O Google Sheets omite índices vazios no final da linha. O || '' garante estrutura.
      const vagaBruta = {
        dataInclusao: row[0] || '',
        area: row[1] || '',
        empresa: row[2] || '',
        cidade: row[3] || '',
        titulo: row[4] || '',
        link: row[5] || '',
        tipoVaga: row[6] || '',
      };

      // safeParse valida sem jogar Exception.
      const validacao = VagaSchema.safeParse(vagaBruta);
      
      if (validacao.success) {
        return validacao.data;
      } else {
        console.warn('Vaga ignorada (erro de validação):', validacao.error.issues);
        return null;
      }
    });

    // Filtra nulos e aplica regra de expiração (máximo 60 dias)
    const hoje = new Date();
    const LIMITE_DIAS = 60;

    return vagasTratadas.filter((vaga): vaga is Vaga => {
      if (!vaga) return false;

      // Conversão segura do formato DD/MM/YYYY para Date do JavaScript
      const partesData = vaga.dataInclusao.split('/');
      if (partesData.length !== 3) return false;

      const [dia, mes, ano] = partesData;
      const dataVaga = new Date(Number(ano), Number(mes) - 1, Number(dia));
      
      const diffMilissegundos = Math.abs(hoje.getTime() - dataVaga.getTime());
      const diffDias = Math.ceil(diffMilissegundos / (1000 * 60 * 60 * 24));

      return diffDias <= LIMITE_DIAS;
    });

  } catch (error) {
    console.error("Erro crítico na comunicação com GCP:", error);
    return []; // Retorna array vazio em vez de quebrar a aplicação
  }
}