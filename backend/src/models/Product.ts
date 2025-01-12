import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: string;
    description: string;
    costPrice: number;
    salePrice: number;
    status: 'draft' | 'in-progress' | 'validated' | 'rejected';
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    costPrice: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['draft', 'in-progress', 'validated', 'rejected'],
        default: 'draft',
    },
}, {
    timestamps: true,
});

export const Product = mongoose.model<IProduct>('Product', productSchema);