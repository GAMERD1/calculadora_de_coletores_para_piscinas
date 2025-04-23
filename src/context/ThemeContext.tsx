import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
};

export type FormData = {
  brand: string;
  length: string;
  width: string;
  temperature: string;
  climate: string;
  roofOrientation: string;
  additionalHeating: boolean;
  checkRoofSize: boolean;
  roofWidth: string;
  roofLength: string;
};

const initialFormData: FormData = {
  brand: '',
  length: '',
  width: '',
  temperature: '1.0',
  climate: '1.0',
  roofOrientation: '1.0',
  additionalHeating: false,
  checkRoofSize: false,
  roofWidth: '',
  roofLength: '',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <ThemeContext.Provider
      value={{
        isContactModalOpen,
        openContactModal,
        closeContactModal,
        activeStep,
        setActiveStep,
        formData,
        updateFormData,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};