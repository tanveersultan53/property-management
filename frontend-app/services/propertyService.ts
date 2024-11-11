import axios from 'axios';
import { Property } from '../types/property';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const response = await axiosInstance.get('/properties');
    return response.data;
  },

  async create(property: Property): Promise<Property> {
    const response = await axiosInstance.post('/properties', property);
    return response.data;
  },

  async update(id: number, property: Property): Promise<Property> {
    const response = await axiosInstance.put(`/properties/${id}`, property);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/properties/${id}`);
  },
}; 