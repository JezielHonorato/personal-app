import type { AxiosInstance } from 'axios';
import type { Livro, LivroForm, ConteudoLivro } from '@/types';

export function tableLivro(api: AxiosInstance) {
    return {
        getAll: (params: Record<string, any>) => api.get<Livro[]>('livros/', { params }),
        get: (id: number) => api.get<Livro>(`livros/${id}/`),
        getConteudo: (id: number) => api.get<ConteudoLivro>(`livros/${id}/conteudo/`),
        create: (data: LivroForm) => api.post<Livro>('livros/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
        update: (id: number, data: LivroForm) => api.put<Livro>(`livros/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
        delete: (id: number) => api.delete(`livros/${id}/`),
    };
}
