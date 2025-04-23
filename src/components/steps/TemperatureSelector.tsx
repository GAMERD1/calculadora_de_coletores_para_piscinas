import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const TemperatureSelector: React.FC = () => {
  const { formData, updateFormData, setActiveStep } = useTheme();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ temperature: e.target.value });
  };
  
  const handleNext = () => {
    setActiveStep(5);
  };
  
  const handleBack = () => {
    setActiveStep(3);
  };

  return (
    <div className="space-y-4 bg-slate-700/50 p-5 rounded-lg backdrop-blur-sm">
      <label className="block text-sm font-medium text-cyan-300">
        Temperatura Desejada
      </label>
      <select 
        value={formData.temperature}
        onChange={handleChange}
        className="w-full bg-slate-800 border border-cyan-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      >
        <option value="1.0">Residencial (32°C)</option>
        <option value="1.2">Mais quente (&gt;32°C)</option>
        <option value="0.9">Quebrar o gelo (27-28°C)</option>
      </select>
      
      <div className="mt-3 text-sm text-slate-300">
        <p>A temperatura desejada influencia diretamente na quantidade de coletores necessários.</p>
      </div>
      
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