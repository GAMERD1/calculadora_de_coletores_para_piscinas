import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const AdditionalOptions: React.FC = () => {
  const { formData, updateFormData, setActiveStep } = useTheme();
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
  };
  
  const handleNext = () => {
    if (formData.checkRoofSize) {
      setActiveStep(6);
    } else {
      setActiveStep(7);
    }
  };
  
  const handleBack = () => {
    setActiveStep(4);
  };

  return (
    <div className="space-y-4 bg-slate-700/50 p-5 rounded-lg backdrop-blur-sm">
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="additionalHeating"
            name="additionalHeating"
            checked={formData.additionalHeating}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded text-cyan-500 focus:ring-cyan-500"
          />
          <label htmlFor="additionalHeating" className="ml-2 block text-sm text-cyan-300">
            ADICIONAR 30% PARA AQUECIMENTO EXTRA
          </label>
          <div className="relative ml-2">
            <div className="group">
              <span className="cursor-help w-5 h-5 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">?</span>
              <div className="absolute left-0 -top-2 transform -translate-y-full w-64 px-4 py-2 bg-slate-800 rounded shadow-lg text-sm text-white hidden group-hover:block z-10 border border-cyan-500">
                Recomendado para piscinas com:
                <ul className="list-disc list-inside mt-1">
                  <li>Prainha</li>
                  <li>Cascata</li>
                  <li>Encanamento longo</li>
                  <li>Região fria</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkRoofSize"
            name="checkRoofSize"
            checked={formData.checkRoofSize}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded text-cyan-500 focus:ring-cyan-500"
          />
          <label htmlFor="checkRoofSize" className="ml-2 block text-sm text-cyan-300">
            VERIFICAR TAMANHO DO TELHADO
          </label>
        </div>
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