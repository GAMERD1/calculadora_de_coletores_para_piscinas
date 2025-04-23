import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const RoofDimensions: React.FC = () => {
  const { formData, updateFormData, setActiveStep } = useTheme();
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    setError('');
  };
  
  const handleNext = () => {
    if (formData.roofWidth && formData.roofLength) {
      setActiveStep(7);
    } else {
      setError('Por favor, preencha as dimensões do telhado');
    }
  };
  
  const handleBack = () => {
    setActiveStep(5);
  };

  return (
    <div className="space-y-4 bg-slate-700/50 p-5 rounded-lg backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-cyan-300">
            Largura do Telhado (metros)
          </label>
          <input
            type="number"
            name="roofWidth"
            value={formData.roofWidth}
            onChange={handleChange}
            min="0"
            step="0.1"
            required
            className="mt-1 block w-full bg-slate-800 border border-cyan-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-cyan-300">
            Comprimento do Telhado (metros)
          </label>
          <input
            type="number"
            name="roofLength"
            value={formData.roofLength}
            onChange={handleChange}
            min="0"
            step="0.1"
            required
            className="mt-1 block w-full bg-slate-800 border border-cyan-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-slate-600 rounded-md hover:bg-slate-700 transition-all duration-300"
        >
          Voltar
        </button>
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