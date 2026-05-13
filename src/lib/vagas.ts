import { google } from 'googleapis';
import { z } from 'zod';

const VagaSchema = z.object({
  dataInclusao: z.string(),
  area: z.string().optional(),
  empresa: z.string().min(1, "Empresa é obrigatória"),
  cidade: z.string().optional(),
  titulo: z.string().min(1, "Título é obrigatório"),
  link: z.string().url().or(z.string().startsWith('http')), 
  tipoVaga: z.string().optional(),
});

export type Vaga = z.infer<typeof VagaSchema>;

export async function getVagasValidadas(): Promise<Vaga[]> {
  // Alteração: Lendo das variáveis de ambiente em vez do arquivo físico
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      // O replace garante que as quebras de linha da chave privada funcionem em produção
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '13lutgdWIY7ezc-6PihVQcjWaqsdk0Pb-SBIEDpHx9as';
  const range = "'05/2026'!A:Z"; 

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) return [];

    const dataRows = rows.slice(1);

    const vagasTratadas = dataRows.map((row) => {
      const vagaBruta = {
        dataInclusao: row[0] || '',
        area: row[1] || '',
        empresa: row[2] || '',
        cidade: row[3] || '',
        titulo: row[4] || '',
        link: row[5] || '',
        tipoVaga: row[6] || '',
      };

      const validacao = VagaSchema.safeParse(vagaBruta);
      
      if (validacao.success) {
        return validacao.data;
      } else {
        return null;
      }
    });

    const hoje = new Date();
    const LIMITE_DIAS = 60;

    return vagasTratadas.filter((vaga): vaga is Vaga => {
      if (!vaga) return false;

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
    return [];
  }
}