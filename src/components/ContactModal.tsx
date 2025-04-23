import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sendContactToTelegram } from '../utils/telegram';

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal } = useTheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    setIsSending(true);
    
    try {
      // Send to Telegram
      await sendContactToTelegram(name, phone);
      
      // Show success and reset form
      setIsSent(true);
      setName('');
      setPhone('');
      
      // Auto close after 3 seconds
      setTimeout(() => {
        closeContactModal();
        setIsSent(false);
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao enviar contato:', error);
      alert('Ocorreu um erro ao enviar seu contato. Por favor, tente novamente.');
    } finally {
      setIsSending(false);
    }
  };
  
  // Format phone number as the user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length <= 2) {
      formattedValue = value;
    } else if (value.length <= 6) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
    
    setPhone(formattedValue);
  };
  
  const handleWhatsAppClick = () => {
    if (!name || !phone) {
      alert('Por favor, preencha seu nome e telefone antes de abrir o WhatsApp');
      return;
    }
    
    // Clean phone number to only include digits
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Create WhatsApp URL with predefined message
    const message = encodeURIComponent(`Oii meu nome é ${name} e quero falar sobre o sistema que calcula placas pra piscina.`);
    const whatsappUrl = `https://wa.me/5543996349824?text=${message}`;
    
    // Open in new window
    window.open(whatsappUrl, '_blank');
    
    // Also send to Telegram
    sendContactToTelegram(name, phone);
    
    // Show success and auto close
    setIsSent(true);
    setTimeout(() => {
      closeContactModal();
      setIsSent(false);
    }, 2000);
  };

  if (!isContactModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={closeContactModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Entre em Contato</h2>
        
        {isSent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-2xl">✓</span>
            </div>
            <p className="text-white font-medium">Mensagem enviada com sucesso!</p>
            <p className="text-slate-400 text-sm mt-2">Entraremos em contato em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                Seu Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Digite seu nome"
                disabled={isSending}
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">
                Seu Telefone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="(00) 00000-0000"
                disabled={isSending}
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                disabled={isSending}
              >
                {isSending ? 'Enviando...' : (
                  <>
                    <Send size={16} /> Enviar
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                disabled={isSending}
              >
                Abrir WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};