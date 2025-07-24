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

        return Promise.reject(new Error('Erro de conexão com o servidor.'));
    }
);

function procurarMensagemErro(data: any): string[] {
    const mensagens: string[] = [];

    if (data?.errors?.details && Array.isArray(data.errors.details)) {
        mensagens.push(...data.errors.details.filter((item: string) => typeof item === 'string'));
    } else if (data?.errors && typeof data.errors === 'object') {
        Object.values(data.errors).forEach((mensagemArray) => {
            if (Array.isArray(mensagemArray)) {
                mensagens.push(...mensagemArray);
            }
        });
    } else if (typeof data?.message === 'string') {
        mensagens.push(data.message);
    }

    return mensagens;
}
