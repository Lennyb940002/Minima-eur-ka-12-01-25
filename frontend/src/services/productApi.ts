// productApi.ts
import axios from 'axios';
import { Product } from '../components/types';

const API_URL = 'http://localhost:3001/api/products';

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
}, (error) => {
    return Promise.reject(error);
});

export const productApi = {
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
            throw error;
        }
    },

    createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
        try {
            const response = await api.post('/', product);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la création du produit :', error);
            throw error;
        }
    },

    updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
        try {
            const response = await api.put(`/${id}`, product);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
            throw error;
        }
    },

    deleteProduct: async (id: string): Promise<void> => {
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            throw error;
        }
    },
};