//services/api.Ts
import axios from 'axios';
import { Sale } from '../components/sales/types';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const salesApi = {
    getAllSales: async () => {
        try {
            const response = await api.get<Sale[]>('/sales');
            console.log('Sales fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching sales:', error);
            return [];
        }
    },

    createSale: async (sale: Omit<Sale, '_id'>) => {
        try {
            console.log('Sending sale data:', sale);
            const response = await api.post<Sale>('/sales', sale);
            console.log('Sale created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating sale:', error);
            throw error;
        }
    },

    deleteSale: async (id: string) => {
        try {
            await api.delete(`/sales/${id}`);
            console.log('Sale deleted:', id);
        } catch (error) {
            console.error('Error deleting sale:', error);
            throw error;
        }
    }
};