import React from 'react';

const GlobalStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      :root {
        --primary: #010d36;
        --primary-light: #162249;
        --primary-dark: #000720;
        --secondary: #dfd7c0;
        --secondary-light: #e9e4d5;
        --tertiary: #fef9ef;
        --accent: #3b82f6;
        --accent-light: #60a5fa;
        --success: #10b981;
        --warning: #f59e0b;
        --danger: #ef4444;
        --text-light: #64748b;
      }
      
      body {
        font-family: 'Inter', 'Neue Montreal', 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: var(--tertiary);
        color: var(--primary);
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Source Serif Pro', serif;
      }
      
      /* Scrollbar personalizada para uma aparência mais moderna */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: J4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
      }
      
      /* Animações */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
      
      /* Estados de foco melhorados */
      input:focus, 
      select:focus, 
      textarea:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--accent-light);
        border-color: var(--accent);
      }
    `}</style>
  );
};

export default GlobalStyles;