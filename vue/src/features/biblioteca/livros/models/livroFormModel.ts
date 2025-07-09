export interface ILivroForm {
  id?: number; // Opcional, presente apenas na edição
  titulo: string;
  titulo_original: string | null;
  ano_publicacao: number | null;
  lido: boolean;

  // IDs para os <select> do formulário
  autorId: number | null;
  generoId: number | null;

  // Campos específicos da UI para upload de arquivos
  arquivo_file: File | null; // O objeto File do input de arquivo
  capa_file: File | null;    // O objeto File do input de imagem

  // Campo para guardar a URL da capa existente (na edição) ou a preview da nova
  capa_preview_url: string | null;
}
