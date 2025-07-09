export interface IConteudoLivro {
  type: 'txt' | 'md' | 'pdf'; // Tipo do conteúdo
  content?: string;           // Conteúdo textual (para txt ou md)
  url?: string;               // URL (para pdf ou conteúdo externo)
}
