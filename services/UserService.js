// Serviço para gerenciamento de usuários
const UserService = {
    // Obter lista de usuários da organização
    getUsers: async (organizationId) => {
      // Em um ambiente real, isso seria uma chamada à API
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados simulados
          resolve([
            { 
              id: 1, 
              name: 'Administrador', 
              email: 'admin@empresa.com',
              phone: '(11) 9999-8888',
              jobTitle: 'Gerente de Operações', 
              role: 'admin', 
              isActive: true,
              createdAt: '2025-01-15'
            },
            { 
              id: 2, 
              name: 'João Silva', 
              email: 'joao@empresa.com',
              phone: '(11) 9777-6666',
              jobTitle: 'Produtor de Eventos', 
              role: 'collaborator', 
              isActive: true,
              createdAt: '2025-02-01'
            },
            { 
              id: 3, 
              name: 'Maria Souza', 
              email: 'maria@empresa.com',
              phone: '(11) 9555-4444',
              jobTitle: 'Assistente', 
              role: 'viewer', 
              isActive: true,
              createdAt: '2025-02-15'
            }
          ]);
        }, 500);
      });
    },
    
    // Obter detalhes de um usuário específico
    getUserById: async (userId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulando dados de usuário
          const user = { 
            id: userId, 
            name: userId === 1 ? 'Administrador' : userId === 2 ? 'João Silva' : 'Maria Souza', 
            email: userId === 1 ? 'admin@empresa.com' : userId === 2 ? 'joao@empresa.com' : 'maria@empresa.com',
            phone: userId === 1 ? '(11) 9999-8888' : userId === 2 ? '(11) 9777-6666' : '(11) 9555-4444',
            jobTitle: userId === 1 ? 'Gerente de Operações' : userId === 2 ? 'Produtor de Eventos' : 'Assistente', 
            role: userId === 1 ? 'admin' : userId === 2 ? 'collaborator' : 'viewer', 
            isActive: true,
            createdAt: userId === 1 ? '2025-01-15' : userId === 2 ? '2025-02-01' : '2025-02-15',
            lastLogin: userId === 1 ? '2025-03-26T14:30:00' : userId === 2 ? '2025-03-26T09:15:00' : '2025-03-25T16:45:00'
          };
          
          if (user) {
            resolve(user);
          } else {
            reject(new Error('Usuário não encontrado'));
          }
        }, 300);
      });
    },
    
    // Criar um novo usuário
    createUser: async (userData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando criação com id gerado pelo backend
          resolve({
            ...userData,
            id: Date.now(),
            isActive: true,
            createdAt: new Date().toISOString().split('T')[0]
          });
        }, 800);
      });
    },
    
    // Atualizar usuário existente
    updateUser: async (userId, userData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Validação simulada
          if (!userId) {
            reject(new Error('ID de usuário não fornecido'));
            return;
          }
          
          // Simulando atualização bem-sucedida
          resolve({
            ...userData,
            id: userId,
            updatedAt: new Date().toISOString()
          });
        }, 600);
      });
    },
    
    // Desativar/Ativar usuário
    toggleUserStatus: async (userId, active) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando toggle de status
          resolve({ id: userId, isActive: active });
        }, 400);
      });
    },
    
    // Alterar permissões de usuário
    changeUserRole: async (userId, newRole) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando alteração de permissão
          resolve({ id: userId, role: newRole });
        }, 400);
      });
    },
    
    // Processar onboarding de um novo usuário
    processOnboarding: async (onboardingData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando processamento de onboarding
          resolve({
            success: true,
            organization: {
              id: 1,
              name: onboardingData.organizationName,
              industry: onboardingData.industry,
              createdAt: new Date().toISOString()
            },
            subscription: {
              plan: onboardingData.plan,
              status: 'active',
              nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')
            }
          });
        }, 1200);
      });
    },
    
    // Convidar usuário para a organização
    inviteUser: async (email, role) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando envio de convite
          resolve({
            id: Date.now(),
            email,
            role,
            status: 'pending',
            invitedAt: new Date().toISOString()
          });
        }, 500);
      });
    },
    
    // Obter convites pendentes
    getPendingInvites: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados simulados de convites pendentes
          resolve([
            {
              id: 101,
              email: 'novo.usuario@exemplo.com',
              role: 'collaborator',
              status: 'pending',
              invitedAt: '2025-03-20T10:30:00'
            }
          ]);
        }, 300);
      });
    },
    
    // Obter histórico de atividades do usuário
    getUserActivityLog: async (userId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados simulados de atividades
          resolve([
            {
              id: 1001,
              userId,
              action: 'login',
              timestamp: '2025-03-26T14:30:00',
              details: 'Login bem-sucedido'
            },
            {
              id: 1002,
              userId,
              action: 'create_event',
              timestamp: '2025-03-26T15:45:00',
              details: 'Criou evento "Conferência Anual"'
            },
            {
              id: 1003,
              userId,
              action: 'update_supplier',
              timestamp: '2025-03-26T16:20:00',
              details: 'Atualizou fornecedor "SomPro Áudio"'
            }
          ]);
        }, 700);
      });
    }
  };
  
  export default UserService;