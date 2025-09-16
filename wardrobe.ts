/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem } from './types';

// Default wardrobe items hosted for easy access
export const defaultWardrobe: WardrobeItem[] = [
  {
    id: 'gemini-sweat',
    name: 'Gemini Sweatshirt',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/refs/heads/main/gemini-sweat-2.png',
    type: 'garment',
    price: 'KES 7,800',
    description: 'A cozy and stylish sweatshirt featuring the Gemini logo. Perfect for developers and AI enthusiasts.',
  },
  {
    id: 'gemini-tee',
    name: 'Gemini T-Shirt',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/refs/heads/main/Gemini-tee.png',
    type: 'garment',
    price: 'KES 3,900',
    description: 'A classic black t-shirt with the iconic Gemini logo. Made from 100% organic cotton.',
  },
  {
    id: 'denim-jacket',
    name: 'Denim Jacket',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/main/denim-jacket.png',
    type: 'garment',
    price: 'KES 11,700',
    description: 'A timeless denim jacket that adds a cool, casual layer to any outfit. Features classic styling and a comfortable fit.'
  },
  {
    id: 'leather-jacket',
    name: 'Leather Jacket',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/main/leather-jacket.png',
    type: 'garment',
    price: 'KES 19,500',
    description: 'A sleek and stylish faux leather jacket. The perfect statement piece for a night out.'
  },
  {
    id: 'beanie-hat',
    name: 'Beanie Hat',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/main/beanie.png',
    type: 'accessory',
    price: 'KES 2,600',
    description: 'Keep warm with this soft, ribbed beanie. A versatile accessory for any season.',
  },
  {
    id: 'sunglasses',
    name: 'Aviator Sunglasses',
    url: 'https://raw.githubusercontent.com/ammaarreshi/app-images/main/sunglasses.png',
    type: 'accessory',
    price: 'KES 5,850',
    description: 'Classic aviator sunglasses with a modern twist. Provides 100% UV protection.',
  }
];