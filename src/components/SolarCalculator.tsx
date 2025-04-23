import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { BrandSelector } from './steps/BrandSelector';
import { PoolDimensions } from './steps/PoolDimensions';
import { RegionSelector } from './steps/RegionSelector';
import { RoofOrientation } from './steps/RoofOrientation';
import { TemperatureSelector } from './steps/TemperatureSelector';
import { AdditionalOptions } from './steps/AdditionalOptions';
import { RoofDimensions } from './steps/RoofDimensions';
import { CalculateButton } from './steps/CalculateButton';
import { Results } from './Results';

export const SolarCalculator: React.FC = () => {
  const { activeStep } = useTheme();
  const [showResults, setShowResults] = useState(false);
  
  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 rounded-lg shadow-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-center text-green-400">
        Calculadora Profissional de Aquecimento Solar
      </h2>
      
      {!showResults ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center mr-3">
                <span className="font-bold">{activeStep + 1}</span>
              </div>
              <h3 className="text-lg font-medium">
                {getStepTitle(activeStep)}
              </h3>
            </div>
            
            {/* Steps */}
            <div className={`transition-all duration-500 ${activeStep === 0 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <BrandSelector />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 1 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <PoolDimensions />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 2 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <RegionSelector />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 3 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <RoofOrientation />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 4 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <TemperatureSelector />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 5 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <AdditionalOptions />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 6 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <RoofDimensions />
            </div>
            
            <div className={`transition-all duration-500 ${activeStep === 7 ? 'opacity-100' : 'hidden opacity-0'}`}>
              <CalculateButton onCalculate={handleCalculate} />
            </div>
          </div>
          
          {/* Step progress indicator */}
          <div className="w-full bg-slate-700 rounded-full h-2 mt-8">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${(activeStep + 1) * 12.5}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <Results onBack={() => setShowResults(false)} />
      )}
    </div>
  );
};

const getStepTitle = (step: number): string => {
  const titles = [
    "Selecione a marca dos coletores",
    "Dimensões da piscina",
    "Região climática",
    "Orientação do telhado",
    "Preferência de temperatura",
    "Opções adicionais",
    "Dimensões do telhado (opcional)",
    "Calcular"
  ];
  
  return titles[step] || "";
};