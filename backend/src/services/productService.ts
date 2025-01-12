import { Product } from '../models/Product';

export class ProductService {
    static async getAll() {
        return await Product.find().sort({ createdAt: -1 });
    }

    static async create(productData: any) {
        const product = new Product(productData);
        return await product.save();
    }

    static async update(id: string, productData: any) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    static async delete(id: string) {
        return await Product.findByIdAndDelete(id);
    }

    static async getById(id: string) {
        return await Product.findById(id);
    }
}