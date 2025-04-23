import React from 'react';
import { SolarCalculator } from './components/SolarCalculator';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-900 text-white">
        <header className="bg-slate-800 shadow-lg py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center text-cyan-400">
              Calculadora de Coletores Solares para Piscinas
            </h1>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <SolarCalculator />
        </main>
        
        <Footer />
        <ContactModal />
      </div>
    </ThemeProvider>
  );
}

export default App;