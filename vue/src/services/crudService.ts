import { api } from '@/config/axios';

export type QueryParams = Record<string, any>;

export interface InterfaceCrudService<InterfaceModel, InterfaceForm> {
    //getAll(params?: QueryParams): Promise<InterfaceModel[]>;
    getAll(): Promise<InterfaceModel[]>;
    getById(id: number): Promise<InterfaceModel>;
    create(data: InterfaceForm): Promise<void>;
    update(id: number, data: InterfaceForm): Promise<void>;
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

    async create(data: InterfaceForm): Promise<void> {
        await api.post<InterfaceModel>(`/${this.endpoint}/`, data);
    }

    async update(id: number, data: InterfaceForm): Promise<void> {
        await api.put<InterfaceModel>(`/${this.endpoint}/${id}/`, data);
    }

    async delete(id: number): Promise<void> {
        await api.delete(`/${this.endpoint}/${id}/`);
    }
}
