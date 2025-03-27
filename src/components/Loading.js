import React from 'react';

const Loading = ({ size = 'md', color = 'primary', fullScreen = false, text = 'Carregando...' }) => {
  // Determinar tamanho do spinner
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];
  
  // Determinar cor do spinner
  const colorClass = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    white: 'text-white'
  }[color];
  
  // Spinner em tela cheia ou componente simples
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <svg className={`animate-spin ${sizeClass} ${colorClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {text && <span className="mt-2 text-gray-700">{text}</span>}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center">
      <svg className={`animate-spin ${sizeClass} ${colorClass}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {text && <span className="ml-2 text-gray-700">{text}</span>}
    </div>
  );
};

// Variantes de loading para diferentes contextos
export const ButtonLoading = ({ text = 'Processando...' }) => {
  return (
    <div className="flex items-center">
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {text}
    </div>
  );
};

export const PageLoading = () => {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <Loading size="lg" text="Carregando página..." />
    </div>
  );
};

export default Loading;