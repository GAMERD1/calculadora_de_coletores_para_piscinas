import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { brandsData } from '../../data/brands';

export const BrandSelector: React.FC = () => {
  const { formData, updateFormData, setActiveStep } = useTheme();
  
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ brand: e.target.value });
  };
  
  const handleNext = () => {
    if (formData.brand) {
      setActiveStep(1);
    }
  };
  
  useEffect(() => {
    // Set default brand if none selected
    if (!formData.brand) {
      updateFormData({ brand: 'tsSolar' });
    }
  }, []);

  return (
    <div className="space-y-4 bg-slate-700/50 p-5 rounded-lg backdrop-blur-sm">
      <label className="block text-sm font-medium text-cyan-300">
        Selecione a marca dos coletores
      </label>
      <select 
        value={formData.brand}
        onChange={handleBrandChange}
        className="w-full bg-slate-800 border border-cyan-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      >
        {Object.entries(brandsData).map(([value, brand]) => (
          <option key={value} value={value}>
            {brand.name}
          </option>
        ))}
      </select>
      
      <div className="flex justify-end mt-4">
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
        >
          Avançar
        </button>
      </div>
    </div>
  );
};