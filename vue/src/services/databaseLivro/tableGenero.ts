import type { AxiosInstance } from 'axios';
import type { Genero, GeneroForm } from '@/types';

export function tableGenero(api: AxiosInstance) {
    return {
        getAll: (params?: Record<string, any>) => api.get<Genero[]>('generos/', { params }),
        get: (id: number) => api.get<Genero>(`generos/${id}`),
        create: (data: GeneroForm) => api.post<Genero>('generos/', data),
        update: (id: number, data: GeneroForm) => api.put<Genero>(`generos/${id}/`, data),
        delete: (id: number) => api.delete(`generos/${id}/`),
    };
}
