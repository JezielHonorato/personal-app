import type { AxiosInstance } from 'axios';
import type { Pais, PaisForm } from '@/types';

export function tablePais(api: AxiosInstance) {
    return {
        getAll: (params?: Record<string, any>) => api.get<Pais[]>('paises/', { params }),
        get: (id: number) => api.get<Pais>(`paises/${id}`),
        create: (data: PaisForm) => api.post<Pais>('paises/', data),
        update: (id: number, data: PaisForm) => api.put<Pais>(`paises/${id}/`, data),
        delete: (id: number) => api.delete(`paises/${id}/`),
    };
}
