/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface BackgroundPanelProps {
  onBackgroundChange: (instruction: string) => void;
  isLoading: boolean;
}

const BACKGROUND_OPTIONS = [
  {
    name: 'Studio',
    instruction: 'a clean, neutral studio backdrop (light gray, #f0f0f0)',
    thumbnail: 'bg-gray-200',
  },
  {
    name: 'Outdoor',
    instruction: 'a bright, slightly blurred outdoor city street scene with natural lighting',
    thumbnail: 'bg-cover bg-center',
    thumbnailStyle: { backgroundImage: `url('https://storage.googleapis.com/gemini-95-icons/background-outdoor.jpg')` }
  },
  {
    name: 'Gradient',
    instruction: 'a simple, clean color gradient background transitioning from a soft sky blue at the top to white at the bottom',
    thumbnail: 'bg-gradient-to-b from-blue-200 to-white',
  },
];

const BackgroundPanel: React.FC<BackgroundPanelProps> = ({ onBackgroundChange, isLoading }) => {
  return (
    <div className="pt-6 border-t border-gray-400/50">
      <h2 className="text-xl font-serif tracking-wider text-gray-800 mb-3">Background</h2>
      <div className="grid grid-cols-3 gap-3">
        {BACKGROUND_OPTIONS.map((option) => (
          <button
            key={option.name}
            onClick={() => onBackgroundChange(option.instruction)}
            disabled={isLoading}
            className="relative aspect-square border rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 group disabled:opacity-60 disabled:cursor-not-allowed flex flex-col items-center justify-end p-1"
            aria-label={`Change background to ${option.name}`}
          >
            <div
              className={`absolute inset-0 ${option.thumbnail}`}
              style={option.thumbnailStyle || {}}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <span className="relative text-white text-xs font-bold z-10 drop-shadow-sm">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundPanel;
