import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CalculateButtonProps {
  onCalculate: () => void;
}

export const CalculateButton: React.FC<CalculateButtonProps> = ({ onCalculate }) => {
  const { setActiveStep, formData } = useTheme();
  
  const handleBack = () => {
    if (formData.checkRoofSize) {
      setActiveStep(6);
    } else {
      setActiveStep(5);
    }
  };

  return (
    <div className="space-y-4 bg-slate-700/50 p-5 rounded-lg backdrop-blur-sm">
      <div className="text-center">
        <p className="text-slate-300 mb-6">
          Todos os dados foram preenchidos. Clique em Calcular para ver os resultados.
        </p>
        
        <button
          onClick={onCalculate}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 rounded-md text-lg font-medium hover:from-green-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 animate-pulse"
        >
          CALCULAR
        </button>
      </div>
      
      <div className="flex justify-start mt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-slate-600 rounded-md hover:bg-slate-700 transition-all duration-300"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};