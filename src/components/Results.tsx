import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { calculateResults, ResultType } from '../utils/calculator';
import { brandsData } from '../data/brands';

interface ResultsProps {
  onBack: () => void;
}

export const Results: React.FC<ResultsProps> = ({ onBack }) => {
  const { formData, setActiveStep } = useTheme();
  const [results, setResults] = useState<ResultType | null>(null);
  
  useEffect(() => {
    // Calculate results when component mounts
    const calculatedResults = calculateResults(formData);
    setResults(calculatedResults);
  }, [formData]);
  
  const handleStartOver = () => {
    setActiveStep(0);
    onBack();
  };
  
  if (!results) {
    return <div className="text-center py-6">Calculando resultados...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-lg shadow-inner">
        <h3 className="text-lg font-medium text-cyan-400 mb-2">Informações da Piscina</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-400">Dimensões</p>
            <p className="text-white">{formData.length}m × {formData.width}m = {results.area.toFixed(2)}m²</p>
          </div>
          <div>
            <p className="text-slate-400">Área Corrigida</p>
            <p className="text-white">{results.correctedArea.toFixed(2)}m²</p>
          </div>
          <div>
            <p className="text-slate-400">Volume</p>
            <p className="text-white">{results.volumeInLiters.toFixed(0)} litros</p>
          </div>
          <div>
            <p className="text-slate-400">Fatores Aplicados</p>
            <p className="text-white">
              Temperatura: {parseFloat(formData.temperature).toFixed(1)} | 
              Clima: {parseFloat(formData.climate).toFixed(1)} | 
              Telhado: {parseFloat(formData.roofOrientation).toFixed(1)}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Aquecimento Extra</p>
            <p className="text-white">{formData.additionalHeating ? 'Sim (+30%)' : 'Não'}</p>
          </div>
          {formData.checkRoofSize && (
            <div>
              <p className="text-slate-400">Dimensões do Telhado</p>
              <p className="text-white">{formData.roofWidth}m × {formData.roofLength}m</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-slate-700 p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-green-400 mb-4">
          Resultados para {brandsData[formData.brand as keyof typeof brandsData].name}
        </h3>
        
        {results.brandResults.map((result, index) => (
          <div key={index} className="mb-4 bg-slate-800 p-4 rounded-lg border-l-4 border-cyan-500">
            {result.model && (
              <p className="font-medium text-white">{result.model}</p>
            )}
            <p className="text-lg font-bold text-green-400">
              {result.collectors} coletores necessários
            </p>
            {result.collectorArea && (
              <p className="text-sm text-slate-300">
                Área por coletor: {result.collectorArea}m²
              </p>
            )}
            
            {/* Roof results */}
            {formData.checkRoofSize && result.roofResult && (
              <div className="mt-3 border-t border-slate-700 pt-3">
                <p className="text-sm text-slate-300">
                  <span className="text-cyan-400">Análise do Telhado: </span>
                  {result.roofResult.maxPossible >= result.collectors 
                    ? <span className="text-green-400">✅ Cabe no telhado</span> 
                    : <span className="text-red-400">❌ Espaço insuficiente</span>}
                </p>
                <p className="text-xs text-slate-400">
                  Cabem até {result.roofResult.maxPerRow} coletores por linha ({result.roofResult.maxRows} linhas)<br/>
                  Total possível: {result.roofResult.maxPossible} coletores
                </p>
              </div>
            )}

            {/* Battery calculation - 20 collectors per battery */}
            <div className="mt-3 border-t border-slate-700 pt-3">
              <p className="text-sm text-slate-300">
                <span className="text-cyan-400">Baterias: </span>
                {Math.ceil(result.collectors / 20)} {Math.ceil(result.collectors / 20) > 1 ? "baterias" : "bateria"}
                <span className="text-xs text-slate-400 ml-2">(max. 20 coletores por bateria)</span>
              </p>
            </div>
          </div>
        ))}
        
        <div className="mt-6 text-xs text-slate-400 italic">
          NOTA: Todos os cálculos são estimados. Recomendamos sempre consultar o manual da empresa fabricante.
        </div>
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-slate-600 rounded-md hover:bg-slate-700 transition-all duration-300"
        >
          Ajustar Parâmetros
        </button>
        <button
          onClick={handleStartOver}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
        >
          Novo Cálculo
        </button>
      </div>
    </div>
  );
};