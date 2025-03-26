import React from 'react';

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap');
      
      :root {
        --primary: #010d36;
        --secondary: #dfd7c0;
        --tertiary: #fef9ef;
      }
      
      body {
        font-family: 'Neue Montreal', 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: var(--tertiary);
        color: var(--primary);
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: 'Source Serif Pro', serif;
      }
    `}</style>
  );
};

export default GlobalStyles;