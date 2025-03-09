import api from './api';
import { Protocol } from '../types';

export interface CreateProtocolDTO {
  title: string;
  steps: string[];
}

export interface UpdateProtocolDTO {
  title?: string;
  steps?: string[];
  progress?: number;
}

export const protocolsService = {
  getAll: () => api.get<Protocol[]>('/protocols'),
  
  getById: (id: string) => api.get<Protocol>(`/protocols/${id}`),
  
  create: (data: CreateProtocolDTO) => api.post<Protocol>('/protocols', data),
  
  update: (id: string, data: UpdateProtocolDTO) => 
    api.put<Protocol>(`/protocols/${id}`, data),
  
  delete: (id: string) => api.delete<void>(`/protocols/${id}`),
  
  updateProgress: (id: string, progress: number) =>
    api.put<Protocol>(`/protocols/${id}/progress`, { progress }),
};

export default protocolsService; 