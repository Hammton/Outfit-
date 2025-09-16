/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { WardrobeItem } from '../types';
import { XIcon, ShoppingCartIcon } from './icons';
import { urlToFile } from '../lib/utils';
import Spinner from './Spinner';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: WardrobeItem | null;
  onTryOn: (garmentFile: File, garmentInfo: WardrobeItem) => void;
  isLoading: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onTryOn, isLoading }) => {
    const [isTryingOn, setIsTryingOn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTryOnClick = async () => {
        if (!product || isLoading) return;
        
        setIsTryingOn(true);
        setError(null);
        try {
            const file = await urlToFile(product.url, product.name);
            onTryOn(file, product);
        } catch (err) {
            setError('Could not load item to try on. Please check your connection and try again.');
            console.error(err);
        } finally {
            setIsTryingOn(false);
        }
    };

    const handleBuyNowClick = () => {
        alert("This is a demo. In a real app, you'd be redirected to a secure checkout page.");
    };

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl overflow-hidden"
                    >
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 z-20 p-2 rounded-full text-gray-500 bg-white/50 hover:bg-gray-100 hover:text-gray-800 transition-all"
                            aria-label="Close product details"
                        >
                            <XIcon className="w-6 h-6"/>
                        </button>

                        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4 md:p-8">
                            <img src={product.url} alt={product.name} className="max-w-full max-h-[70vh] md:max-h-full object-contain drop-shadow-lg" />
                        </div>
                        
                        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
                                {product.name}
                            </h2>
                            <p className="text-2xl font-semibold text-gray-700 mt-2">{product.price}</p>
                            <p className="mt-4 text-gray-600 flex-grow">{product.description}</p>
                            
                            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                            
                            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleTryOnClick}
                                    disabled={isLoading || isTryingOn}
                                    className="w-full sm:w-1/2 relative flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-lg cursor-pointer group hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isTryingOn ? <Spinner /> : 'Try On'}
                                </button>
                                <button
                                    onClick={handleBuyNowClick}
                                    className="w-full sm:w-1/2 flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
                                >
                                    <ShoppingCartIcon className="w-5 h-5 mr-2"/>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;
