import type { AxiosInstance } from 'axios';
import type { Pais, PaisForm } from '@/features/biblioteca/types';

export function tablePais(api: AxiosInstance) {
    return {
        get: (id: number) => api.get<Pais>(`paises/${id}`),
        getFlter: (params?: Record<string, any>) => api.get<Pais[]>('paises/', { params }),
        create: (data: PaisForm) => api.post<Pais>('paises/', data),
        update: (id: number, data: PaisForm) => api.put<Pais>(`paises/${id}/`, data),
        delete: (id: number) => api.delete(`paises/${id}/`),
    };
}
