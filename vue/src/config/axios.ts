import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { getMensagemErro, type ErroInfo } from '@/constants/errorMessages';

export const api: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (axios.isAxiosError(error) && error.response) {
            const data: any = error.response.data;
            const mensagens: string[] = procurarMensagemErro(data);

            if (mensagens.length > 0) {
                return Promise.reject(new Error(mensagens.join('\n')));
            }

            const genericError: ErroInfo = getMensagemErro(error.response.status);
            return Promise.reject(new Error(genericError.message));
        }

        return Promise.reject(error);
    }
);

function procurarMensagemErro(data: any): string[] {
    const mensagens: string[] = [];

    if (data.errors && typeof data.errors === 'object') {
        Object.values<string[]>(data.errors).forEach((fieldErrors) => {
            if (Array.isArray(fieldErrors)) {
                mensagens.push(...fieldErrors);
            }
        });
    } else if (typeof data === 'object' && !Array.isArray(data)) {
        Object.values<any>(data).forEach((fieldErrors) => {
            if (Array.isArray(fieldErrors)) {
                mensagens.push(...fieldErrors);
            }
        });
    } else {
        return [];
    }

    return mensagens;
}
