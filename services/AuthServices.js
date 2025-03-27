// Serviço de autenticação para o AFÁBRICA
const AuthService = {
    // Método para autenticar usuário
    login: async (email, password) => {
      // Em um ambiente real, isso seria uma chamada à API
      return new Promise((resolve, reject) => {
        // Simulação de chamada à API com delay
        setTimeout(() => {
          // Validações simples para demonstração
          if (!email || !password) {
            reject(new Error('Email e senha são obrigatórios'));
            return;
          }
          
          let userRole = 'viewer';
          if (email.includes('admin')) {
            userRole = 'admin';
          } else if (email.includes('colab')) {
            userRole = 'collaborator';
          }
          
          // Simulando novos usuários que precisam de onboarding
          const needsOnboarding = email.includes('novo');
          
          // Sucesso - retorna dados do usuário autenticado
          resolve({
            id: 1,
            name: email.split('@')[0],
            email,
            role: userRole,
            needsOnboarding,
            token: 'jwt-token-example-' + Math.random().toString(36).substring(2)
          });
        }, 800); // Simula tempo de resposta da API
      });
    },
    
    // Método para registrar novo usuário
    register: async (userData) => {
      // Em um ambiente real, isso seria uma chamada à API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Validações básicas
          if (!userData.email || !userData.password || !userData.name) {
            reject(new Error('Dados incompletos'));
            return;
          }
          
          // Sucesso - retorna dados do usuário criado
          resolve({
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'admin', // Primeiro usuário da organização é admin
            needsOnboarding: true,
            token: 'jwt-token-example-' + Math.random().toString(36).substring(2)
          });
        }, 1000);
      });
    },
    
    // Método para logout
    logout: async () => {
      // Em um ambiente real, faria requisição para invalidar token
      return new Promise((resolve) => {
        // Remover token armazenado localmente
        localStorage.removeItem('authToken');
        setTimeout(resolve, 300);
      });
    },
    
    // Verificar se usuário está autenticado
    isAuthenticated: () => {
      const token = localStorage.getItem('authToken');
      return !!token; // Retorna true se existir token
    },
    
    // Método para obter dados do usuário atual
    getCurrentUser: () => {
      try {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
      } catch (error) {
        console.error('Erro ao obter usuário atual:', error);
        return null;
      }
    },
    
    // Método para armazenar informações de autenticação
    setAuthData: (userData, token) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    },
    
    // Método para resetar senha (exemplo)
    resetPassword: async (email) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!email) {
            reject(new Error('Email é obrigatório'));
            return;
          }
          
          // Simula sucesso do reset de senha
          resolve({ success: true, message: 'Instruções enviadas para seu email' });
        }, 1000);
      });
    }
  };
  
  export default AuthService;