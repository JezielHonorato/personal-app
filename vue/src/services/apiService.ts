import axios from 'axios';
import { getErrorMessage } from '@/constants/errorMessages';

export function createApi(baseURL: string) {
    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (axios.isAxiosError(error) && error.response) {
                const errorInfo = getErrorMessage(error.response.status);
                const errorDetails = error.response.data?.detail || error.response.data?.message || JSON.stringify(error.response.data);
                return Promise.reject(new Error(`${errorInfo.code} - ${errorInfo.message} (Detalhes: ${errorDetails})`));
            }
            return Promise.reject(error);
        }
    );

    return api;
}
