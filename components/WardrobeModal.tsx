/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';
import type { WardrobeItem } from '../types';
import { UploadCloudIcon, CheckCircleIcon } from './icons';
import { cn } from '../lib/utils';

interface ShopPanelProps {
  onProductClick: (product: WardrobeItem) => void;
  onGarmentSelect: (garmentFile: File, garmentInfo: WardrobeItem) => void; // For custom uploads
  activeGarmentIds: string[];
  isLoading: boolean;
  wardrobe: WardrobeItem[];
}

type ActiveTab = 'garment' | 'accessory';

const ShopPanel: React.FC<ShopPanelProps> = ({ onProductClick, onGarmentSelect, activeGarmentIds, isLoading, wardrobe }) => {
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>('garment');

    const { garments, accessories } = useMemo(() => {
        return wardrobe.reduce((acc, item) => {
            if (item.type === 'accessory') {
                acc.accessories.push(item);
            } else {
                acc.garments.push(item);
            }
            return acc;
        }, { garments: [] as WardrobeItem[], accessories: [] as WardrobeItem[] });
    }, [wardrobe]);

    const itemsToShow = activeTab === 'garment' ? garments : accessories;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file.');
                return;
            }
            const customGarmentInfo: WardrobeItem = {
                id: `custom-${Date.now()}`,
                name: file.name,
                url: URL.createObjectURL(file),
                type: 'garment',
                price: 'N/A',
                description: 'A custom uploaded item.'
            };
            onGarmentSelect(file, customGarmentInfo);
        }
    };

  return (
    <div className="pt-6 border-t border-gray-400/50">
        <h2 className="text-xl font-serif tracking-wider text-gray-800 mb-3">Shop</h2>
        <div className="mb-3 border-b border-gray-300 flex">
            <button 
                className={cn('px-4 py-2 text-sm font-semibold transition-colors', activeTab === 'garment' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500 hover:text-gray-700')}
                onClick={() => setActiveTab('garment')}
                aria-pressed={activeTab === 'garment'}
            >
                Clothing
            </button>
            <button 
                className={cn('px-4 py-2 text-sm font-semibold transition-colors', activeTab === 'accessory' ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500 hover:text-gray-700')}
                onClick={() => setActiveTab('accessory')}
                aria-pressed={activeTab === 'accessory'}
            >
                Accessories
            </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
            {itemsToShow.map((item) => {
            const isActive = activeGarmentIds.includes(item.id);
            return (
                <button
                key={item.id}
                onClick={() => onProductClick(item)}
                disabled={isLoading}
                className="relative aspect-square border rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 group disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label={`View details for ${item.name}`}
                >
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-bold">{item.name}</p>
                    <p className="text-white text-xs font-semibold">{item.price}</p>
                </div>
                {isActive && (
                    <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                        <CheckCircleIcon className="w-8 h-8 text-white" />
                        <span className="sr-only">(Currently worn)</span>
                    </div>
                )}
                </button>
            );
            })}
            {activeTab === 'garment' && (
                <label htmlFor="custom-garment-upload" className={`relative aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 transition-colors ${isLoading ? 'cursor-not-allowed bg-gray-100' : 'hover:border-gray-400 hover:text-gray-600 cursor-pointer'}`}>
                    <UploadCloudIcon className="w-6 h-6 mb-1"/>
                    <span className="text-xs text-center">Upload</span>
                    <input id="custom-garment-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleFileChange} disabled={isLoading}/>
                </label>
            )}
        </div>
        {itemsToShow.length === 0 && (
             <p className="text-center text-sm text-gray-500 mt-4">No {activeTab}s here. {activeTab === 'garment' ? 'Upload one to get started!' : ''}</p>
        )}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default ShopPanel;
