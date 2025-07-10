import type { AxiosInstance } from 'axios';
import type { Genero, GeneroForm } from '@/features/biblioteca/types';

export function tableGenero(api: AxiosInstance) {
    return {
        get: (id: number) => api.get<Genero>(`generos/${id}`),
        getFilter: (params?: Record<string, any>) => api.get<Genero[]>('generos/', { params }),
        create: (data: GeneroForm) => api.post<Genero>('generos/', data),
        update: (id: number, data: GeneroForm) => api.put<Genero>(`generos/${id}/`, data),
        delete: (id: number) => api.delete(`generos/${id}/`),
    };
}
