import React from 'react';
import { Pencil, Copy } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
    product: Product;
    onEdit: (id: string) => void;
    onDuplicate: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDuplicate }: ProductCardProps) {
    return (
        <div className="bg-white/5 rounded-lg border border-white/10 p-4">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{product.name}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(product.id)}
                        className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDuplicate(product.id)}
                        className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p className="text-white/60 text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'validated'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                    {product.status === 'validated' ? 'validated' : 'in-progress'}
                </span>
                <span className="text-white/60 text-sm">{product.category}</span>
            </div>
        </div>
    );
}