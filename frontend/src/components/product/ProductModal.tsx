import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product, ProductModalProps } from './types';
import { productApi } from '../../services/productApi';

export function ProductModal({ isOpen, onClose, onSubmit, initialData }: ProductModalProps) {
    const [productData, setProductData] = useState<Partial<Product>>(initialData || { status: 'draft', tags: [] });

    useEffect(() => {
        if (initialData) setProductData(initialData);
    }, [initialData]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (productData.name && productData.category && productData.description) {
            const totalScore = (productData.price || 0) + (productData.margin || 0) + (productData.effect || 0) +
                (productData.problem || 0) + (productData.images || 0) + (productData.videos || 0) +
                (productData.competition || 0) + (productData.season || 0);

            const newProduct = {
                totalScore,
                tags: productData.tags || [],
                ...productData,
            } as Product;

            try {
                if (initialData?.id) {
                    const updatedProduct = await productApi.updateProduct(initialData.id, newProduct);
                    onSubmit(updatedProduct);
                } else {
                    const createdProduct = await productApi.createProduct(newProduct);
                    onSubmit(createdProduct);
                }
                onClose();
            } catch (error) {
                console.error('Error submitting product:', error);
                alert('Une erreur est survenue lors de la soumission du produit.');
            }
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-white/10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-white">
                        {initialData ? 'Modifier Produit' : 'Créer Produit'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-300 transition"
                        aria-label="Fermer"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Form inputs */}
                    <input
                        type="text"
                        placeholder="Nom du Produit"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.name || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Lien Ali"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.link || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, link: e.target.value }))}
                        required
                    />
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.category || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, category: e.target.value }))}
                        required
                    >
                        <option className="text-black" value="">Toutes Catégories</option>
                        <option className="text-black" value="tech">Technologie</option>
                        <option className="text-black" value="fashion">Mode</option>
                        <option className="text-black" value="home">Maison</option>
                    </select>
                    <textarea
                        placeholder="Description"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.description || ''}
                        onChange={(e) => setProductData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Prix 💰 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.price || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, price: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Marge 💸 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.margin || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, margin: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Effet Waouh 😱 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.effect || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, effect: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Problème 🤔 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.problem || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, problem: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Visuels dispos 📸 (/5)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.images || ''}
                            max={5}
                            onChange={(e) => setProductData((prev) => ({ ...prev, images: Math.min(Number(e.target.value), 5) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Vidéos dispos 🎥 (/5)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.videos || ''}
                            max={5}
                            onChange={(e) => setProductData((prev) => ({ ...prev, videos: Math.min(Number(e.target.value), 5) }))}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="number"
                            placeholder="Concurrence 👥 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.competition || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, competition: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Saison 🍁 (/10)"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                            value={productData.season || ''}
                            max={10}
                            onChange={(e) => setProductData((prev) => ({ ...prev, season: Math.min(Number(e.target.value), 10) }))}
                            required
                        />
                    </div>
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                        value={productData.status || 'draft'}
                        onChange={(e) => setProductData((prev) => ({ ...prev, status: e.target.value as Product['status'] }))}
                        required
                    >
                        <option className='text-black' value="draft">Brouillon</option>
                        <option className='text-black' value="in-progress">En Cours</option>
                        <option className='text-black' value="validated">Validé</option>
                        <option className='text-black' value="rejected">Rejeté</option>
                    </select>
                    <div className="flex space-x-4">
                        <button
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition"
                            onClick={onClose}
                        >
                            Annuler
                        </button>
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                            onClick={handleSubmit}
                        >
                            {initialData ? 'Sauvegarder' : 'Créer'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}