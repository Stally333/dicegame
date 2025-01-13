'use client';
import { useState } from 'react';

interface ThreeDDiceProps {
  isRolling?: boolean;
  diceCount: number;
}

// Map of dice count to Sketchfab model IDs
const DICE_MODELS = {
  1: "dfbd502acb8b45a1995653edc34f4299", // Using the same model for now
  2: "dfbd502acb8b45a1995653edc34f4299", // Original two dice
  3: "dfbd502acb8b45a1995653edc34f4299"  // Using the same model for now
};

export default function ThreeDDice({ isRolling = false, diceCount = 1 }: ThreeDDiceProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getModelUrl = (count: number) => {
    const modelId = DICE_MODELS[count as keyof typeof DICE_MODELS];
    return `https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0&preload=1`;
  };

  return (
    <div className="w-full h-full relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="text-white">Loading 3D Dice...</div>
        </div>
      )}
      
      <div className="sketchfab-embed-wrapper w-full h-full">
        <iframe 
          title={`${diceCount} 3D Dice`}
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="w-full h-full rounded-xl"
          src={getModelUrl(diceCount)}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      </div>

      {isRolling && (
        <div className="absolute inset-0 bg-black/50 z-10 rounded-xl" />
      )}
    </div>
  );
} 