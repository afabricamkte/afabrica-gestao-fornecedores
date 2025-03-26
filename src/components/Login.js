import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Em um cenário real, validaria credenciais com API
    if (email && password) {
      let role = 'viewer';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('colab')) {
        role = 'collaborator';
      }
      
      // Simulando um novo usuário para demonstrar onboarding
      const needsOnboarding = email.includes('novo');
      
      onLogin({ email, role, name: email.split('@')[0], needsOnboarding });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
          <p className="text-lg">Sistema de Gestão de Fornecedores</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="seu@email.com"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Dica: Use "admin@", "colab@" ou "novo@" para testar diferentes papéis e fluxos
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;