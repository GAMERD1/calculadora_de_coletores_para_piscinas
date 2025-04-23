import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { openContactModal } = useTheme();

  return (
    <footer className="bg-slate-800 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Calculadora de Coletores Solares
          </p>
          <p className="text-slate-300">
            Desenvolvido por{' '}
            <button 
              onClick={openContactModal}
              className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-colors"
            >
              Felipe Indejejczak
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};