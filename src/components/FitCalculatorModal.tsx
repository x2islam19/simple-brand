import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface FitCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FitCalculatorModal: React.FC<FitCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [height, setHeight] = useState<number>(178);
  const [fitPreference, setFitPreference] = useState<'tailored' | 'balanced' | 'relaxed'>('balanced');

  if (!isOpen) return null;

  // Recommended size estimation logic (M, L, XL, 2XL)
  let recommendedSize = 'M';
  if (height < 174) {
    recommendedSize = fitPreference === 'relaxed' ? 'L' : 'M';
  } else if (height < 182) {
    recommendedSize = fitPreference === 'tailored' ? 'M' : fitPreference === 'relaxed' ? 'XL' : 'L';
  } else if (height < 190) {
    recommendedSize = fitPreference === 'tailored' ? 'L' : fitPreference === 'relaxed' ? '2XL' : 'XL';
  } else {
    recommendedSize = '2XL';
  }

  const measurements = [
    { size: 'M',   chestCm: '114', chestIn: '44.8', shoulderCm: '51', lengthCm: '76', waistCm: '84-88' },
    { size: 'L',   chestCm: '120', chestIn: '47.2', shoulderCm: '53', lengthCm: '78', waistCm: '88-94' },
    { size: 'XL',  chestCm: '126', chestIn: '49.6', shoulderCm: '55', lengthCm: '80', waistCm: '94-100' },
    { size: '2XL', chestCm: '132', chestIn: '52.0', shoulderCm: '57', lengthCm: '82', waistCm: '100-108' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 my-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-black cursor-pointer"
          aria-label="Close fit guide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1 pb-4 border-b border-[#E6E2D8]">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" />
            <span>Garment Geometry &amp; Fit Guide</span>
          </div>
          <h2
            className="text-2xl font-light text-neutral-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Find Your Size
          </h2>
          <p className="text-xs text-neutral-600 font-light">
            SIMPLE garments are designed with a relaxed, architectural volume that moves with the body.
          </p>
        </div>

        {/* Interactive Fit Recommender */}
        <div className="my-6 p-4 bg-[#F2EFE8] border border-[#DDD8CD] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-medium">
              Interactive Fit Estimation
            </span>
            <div className="flex border border-[#DDD8CD] bg-white text-xs font-mono">
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 ${unit === 'cm' ? 'bg-[#191919] text-white' : 'text-neutral-600'}`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit('in')}
                className={`px-2.5 py-1 ${unit === 'in' ? 'bg-[#191919] text-white' : 'text-neutral-600'}`}
              >
                IN
              </button>
            </div>
          </div>

          {/* Height Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-neutral-500">Your Height:</span>
              <span className="font-semibold text-neutral-900">
                {unit === 'cm' ? `${height} cm` : `${Math.floor(height / 2.54 / 12)}' ${Math.round((height / 2.54) % 12)}"`}
              </span>
            </div>
            <input
              type="range"
              min="155"
              max="200"
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
          </div>

          {/* Drape Preference */}
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-neutral-500 block">Drape Preference:</span>
            <div className="grid grid-cols-3 gap-2">
              {(['tailored', 'balanced', 'relaxed'] as const).map(pref => (
                <button
                  key={pref}
                  onClick={() => setFitPreference(pref)}
                  className={`py-1.5 text-xs font-mono uppercase tracking-wider border cursor-pointer ${
                    fitPreference === pref
                      ? 'bg-[#191919] text-white border-black font-medium'
                      : 'bg-white text-neutral-600 border-[#DDD8CD] hover:border-black'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>

          {/* Output recommendation */}
          <div className="pt-2 border-t border-[#DDD8CD] flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-600">Calculated Recommendation:</span>
            <span className="text-sm font-bold text-neutral-900 bg-white px-3 py-1 border border-black flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Size {recommendedSize}
            </span>
          </div>
        </div>

        {/* Detailed Sizing Chart */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block">
            Garment Dimensions Chart ({unit.toUpperCase()})
          </span>
          <div className="overflow-x-auto border border-[#E0DBD0]">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-[#EFECE4] border-b border-[#E0DBD0] text-neutral-700">
                <tr>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Chest Width</th>
                  <th className="p-2.5">Shoulder</th>
                  <th className="p-2.5">Back Length</th>
                  <th className="p-2.5">Waist Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE6DC] bg-white">
                {measurements.map(m => (
                  <tr
                    key={m.size}
                    className={recommendedSize === m.size ? 'bg-neutral-100/70 font-semibold' : ''}
                  >
                    <td className="p-2.5">{m.size}</td>
                    <td className="p-2.5 tabular-nums">
                      {unit === 'cm' ? `${m.chestCm} cm` : `${m.chestIn}"`}
                    </td>
                    <td className="p-2.5 tabular-nums">
                      {unit === 'cm' ? `${m.shoulderCm} cm` : `${(Number(m.shoulderCm) / 2.54).toFixed(1)}"`}
                    </td>
                    <td className="p-2.5 tabular-nums">
                      {unit === 'cm' ? `${m.lengthCm} cm` : `${(Number(m.lengthCm) / 2.54).toFixed(1)}"`}
                    </td>
                    <td className="p-2.5 tabular-nums">{m.waistCm} cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reference Models */}
        <div className="mt-4 pt-3 border-t border-[#E6E2D8] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Model A: 178 cm / 5'10" wears Size M</span>
          <span>Model B: 186 cm / 6'1" wears Size XL</span>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-[#191919] text-[#FAF9F5] text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors"
        >
          Confirm &amp; Return
        </button>
      </div>
    </div>
  );
};
