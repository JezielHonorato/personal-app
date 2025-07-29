import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { getMensagemErro } from '@/utils/error';

export const api: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (axios.isAxiosError(error) && error.response) {
            const data: any = error.response.data;
            const mensagensErro: string[] = procurarMensagemErro(data);

            if (mensagensErro.length > 0) {
                return Promise.reject(mensagensErro);
            }

            return Promise.reject([getMensagemErro(error.response.status)]);
        }

        return Promise.reject(['Erro de conexão com o servidor.']);
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
