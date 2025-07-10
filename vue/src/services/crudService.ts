import { api } from '@/config/axios';

export type QueryParams = Record<string, any>;

export interface InterfaceCrudService<InterfaceModel, InterfaceForm> {
    getAll(params?: QueryParams): Promise<InterfaceModel[]>;
    getById(id: number): Promise<InterfaceModel>;
    create(data: InterfaceForm): Promise<InterfaceModel>;
    update(id: number, data: InterfaceForm): Promise<InterfaceModel>;
    delete(id: number): Promise<void>;
}

export abstract class CrudService<InterfaceModel, InterfaceForm> implements InterfaceCrudService<InterfaceModel, InterfaceForm> {
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    /**
	async getAll(params?: QueryParams): Promise<InterfaceModel[]> {
        const response = await api.get<InterfaceModel[]>(`/${this.endpoint}/`, { params });
		return response.data;
    }
	*/

    async getAll(): Promise<InterfaceModel[]> {
        const response = await api.get<InterfaceModel[]>(`/${this.endpoint}/`);
        return response.data;
    }

    async getById(id: number): Promise<InterfaceModel> {
        const response = await api.get<InterfaceModel>(`/${this.endpoint}/${id}/`);
        return response.data;
    }

    async create(data: InterfaceForm): Promise<InterfaceModel> {
        const response = await api.post<InterfaceModel>(`/${this.endpoint}/`, data);
        return response.data;
    }

    async update(id: number, data: InterfaceForm): Promise<InterfaceModel> {
        const response = await api.put<InterfaceModel>(`/${this.endpoint}/${id}/`, data);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await api.delete(`/${this.endpoint}/${id}/`);
    }
}
