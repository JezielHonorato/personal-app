import type { AxiosInstance } from 'axios';
import type { Autor, AutorForm } from '@/types';

export function tableAutor(api: AxiosInstance) {
    return {
        getAll: (params?: Record<string, any>) => api.get<Autor[]>('autores/', { params }),
        get: (id: number) => api.get<Autor>(`autores/${id}`),
        create: (data: AutorForm) => api.post<Autor>('autores/', data),
        update: (id: number, data: AutorForm) => api.put<Autor>(`autores/${id}/`, data),
        delete: (id: number) => api.delete(`autores/${id}/`),
    };
}
