import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente para proteger rotas que exigem autenticação
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  
  // Se estiver autenticado, renderiza os componentes filhos
  return children;
};

export default ProtectedRoute;