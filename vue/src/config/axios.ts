import axios from 'axios';
import { getMensagemErro } from '@/constants/errorMessages';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response) {
            const backendMessage = error.response.data?.message;

            if (backendMessage) {
                return Promise.reject(new Error(backendMessage));
            }

            const genericError = getMensagemErro(error.response.status);
            return Promise.reject(new Error(genericError.message));
        }

        return Promise.reject(error);
    }
);
