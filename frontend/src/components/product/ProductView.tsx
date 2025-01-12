import React, { useState } from 'react';
import { Trash, Edit, Plus } from 'lucide-react';
import { Product } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ProductModal } from './ProductModal';

export function ProductView() {
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  const [filters, setFilters] = useState({ category: '', status: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleCreateOrUpdate = (product: Product) => {
    if (productToEdit) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts((prev) => [product, ...prev]);
    }
    setProductToEdit(null);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    (!filters.category || product.category === filters.category) &&
    (!filters.status || product.status === filters.status)
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Lab</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          <span>Créer Produit</span>
        </button>
      </header>

      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-4xl mx-auto mt-8">
        <div className="flex space-x-4">
          <select
            className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option className="text-black" value="">Toutes Catégories</option>
            <option className="text-black" value="tech">Technologie</option>
            <option className="text-black" value="fashion">Mode</option>
            <option className="text-black" value="home">Maison</option>
          </select>
          <select
            className="flex-1 bg-white/10 border border-white/10 rounded-xl p-3 text-white"
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option className="text-black" value="">Tous Statuts</option>
            <option className="text-black" value="draft">Brouillon</option>
            <option className="text-black" value="in-progress">En Cours</option>
            <option className="text-black" value="validated">Validé</option>
            <option className="text-black" value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mt-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="flex space-x-2">
                <button
                  className="hover:bg-white/10 p-1 rounded-full"
                  onClick={() => {
                    setProductToEdit(product);
                    setIsModalOpen(true);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="hover:bg-white/10 p-1 rounded-full"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-white/70 mt-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-xs ${{
                draft: 'bg-gray-500/20 text-gray-400',
                'in-progress': 'bg-yellow-500/20 text-yellow-400',
                validated: 'bg-green-500/20 text-green-400',
                rejected: 'bg-red-500/20 text-red-400',
              }[product.status]
                }`}>
                {product.status}
              </span>
              <span className="text-sm text-white/50">{product.category}</span>
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={productToEdit || undefined}
      />
    </div>
  );
}