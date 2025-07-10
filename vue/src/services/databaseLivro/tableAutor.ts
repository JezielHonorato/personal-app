import type { AxiosInstance } from 'axios';
import type { Autor, AutorForm } from '@/features/biblioteca/types';

export function tableAutor(api: AxiosInstance) {
    return {
        get: (id: number) => api.get<Autor>(`autores/${id}`),
        getFilter: (params?: Record<string, any>) => api.get<Autor[]>('autores/', { params }),
        create: (data: AutorForm) => api.post<Autor>('autores/', data),
        update: (id: number, data: AutorForm) => api.put<Autor>(`autores/${id}/`, data),
        delete: (id: number) => api.delete(`autores/${id}/`),
    };
}
