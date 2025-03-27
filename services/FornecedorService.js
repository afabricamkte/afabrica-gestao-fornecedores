// Serviço para gerenciamento de fornecedores
const FornecedorService = {
    // Obter todos os fornecedores
    getFornecedores: async (filters = {}) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados mockados
          let fornecedores = [
            { 
              id: 1, 
              nome: 'SomPro Áudio', 
              email: 'contato@sompro.com', 
              telefone: '(11) 99999-1234', 
              tipoServico: 'Sonorização', 
              valor: 5000, 
              statusPagamento: 'Pago',
              observacoes: 'Fornecedor regular',
              contato: 'Carlos Mendes',
              cnpj: '12.345.678/0001-90',
              endereco: 'Rua Augusta, 1200, São Paulo - SP',
              avaliacao: 4
            },
            { 
              id: 2, 
              nome: 'LuzTech Iluminação', 
              email: 'comercial@luztech.com', 
              telefone: '(11) 98888-5678', 
              tipoServico: 'Iluminação', 
              valor: 3500, 
              statusPagamento: 'Pendente',
              observacoes: 'Primeira contratação',
              contato: 'Ana Paula Silva',
              cnpj: '23.456.789/0001-12',
              endereco: 'Av. Paulista, 1000, São Paulo - SP',
              avaliacao: 3
            },
            { 
              id: 3, 
              nome: 'Buffet Gourmet Eventos', 
              email: 'atendimento@buffetgourmet.com', 
              telefone: '(11) 97777-9012', 
              tipoServico: 'Alimentação', 
              valor: 12000, 
              statusPagamento: 'Parcial',
              observacoes: 'Pagamento 50% antecipado',
              contato: 'Roberto Almeida',
              cnpj: '34.567.890/0001-23',
              endereco: 'Rua Oscar Freire, 1500, São Paulo - SP',
              avaliacao: 5
            }
          ];
          
          // Aplicar filtros
          if (filters.tipoServico) {
            fornecedores = fornecedores.filter(f => f.tipoServico === filters.tipoServico);
          }
          
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            fornecedores = fornecedores.filter(f => 
              f.nome.toLowerCase().includes(searchLower) || 
              f.email.toLowerCase().includes(searchLower)
            );
          }
          
          resolve(fornecedores);
        }, 500);
      });
    },
    
    // Obter fornecedor por ID
    getFornecedorById: async (id) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const fornecedor = [
            { 
              id: 1, 
              nome: 'SomPro Áudio', 
              email: 'contato@sompro.com', 
              telefone: '(11) 99999-1234', 
              tipoServico: 'Sonorização', 
              valor: 5000, 
              statusPagamento: 'Pago',
              observacoes: 'Fornecedor regular',
              contato: 'Carlos Mendes',
              cnpj: '12.345.678/0001-90',
              endereco: 'Rua Augusta, 1200, São Paulo - SP',
              avaliacao: 4,
              historico: [
                { data: '2025-02-15', evento: 'Conferência Tech', valor: 4800 },
                { data: '2025-01-20', evento: 'Workshop RH', valor: 3000 }
              ]
            },
            { 
              id: 2, 
              nome: 'LuzTech Iluminação', 
              email: 'comercial@luztech.com', 
              telefone: '(11) 98888-5678', 
              tipoServico: 'Iluminação', 
              valor: 3500, 
              statusPagamento: 'Pendente',
              observacoes: 'Primeira contratação',
              contato: 'Ana Paula Silva',
              cnpj: '23.456.789/0001-12',
              endereco: 'Av. Paulista, 1000, São Paulo - SP',
              avaliacao: 3,
              historico: [
                { data: '2025-03-10', evento: 'Festa Corporativa', valor: 3500 }
              ]
            },
            { 
              id: 3, 
              nome: 'Buffet Gourmet Eventos', 
              email: 'atendimento@buffetgourmet.com', 
              telefone: '(11) 97777-9012', 
              tipoServico: 'Alimentação', 
              valor: 12000, 
              statusPagamento: 'Parcial',
              observacoes: 'Pagamento 50% antecipado',
              contato: 'Roberto Almeida',
              cnpj: '34.567.890/0001-23',
              endereco: 'Rua Oscar Freire, 1500, São Paulo - SP',
              avaliacao: 5,
              historico: [
                { data: '2025-03-15', evento: 'Conferência de Vendas', valor: 15000 },
                { data: '2025-02-28', evento: 'Lançamento de Produto', valor: 8000 },
                { data: '2025-01-10', evento: 'Convenção Anual', valor: 20000 }
              ]
            }
          ].find(f => f.id === id);
          
          if (fornecedor) {
            resolve(fornecedor);
          } else {
            reject(new Error('Fornecedor não encontrado'));
          }
        }, 300);
      });
    },
    
    // Criar novo fornecedor
    createFornecedor: async (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...data,
            id: Date.now(),
            avaliacao: data.avaliacao || 0,
            historico: []
          });
        }, 600);
      });
    },
    
    // Atualizar fornecedor existente
    updateFornecedor: async (id, data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!id) {
            reject(new Error('ID não fornecido'));
            return;
          }
          
          resolve({
            ...data,
            id,
            updatedAt: new Date().toISOString()
          });
        }, 500);
      });
    },
    
    // Excluir fornecedor
    deleteFornecedor: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, id });
        }, 400);
      });
    },
    
    // Avaliar fornecedor
    rateFornecedor: async (id, rating) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!id) {
            reject(new Error('ID não fornecido'));
            return;
          }
          
          resolve({
            id,
            avaliacao: rating,
            ratedAt: new Date().toISOString()
          });
        }, 300);
      });
    },
    
    // Obter estatísticas de fornecedores
    getStats: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            total: 15,
            porCategoria: {
              'Sonorização': 3,
              'Iluminação': 2,
              'Alimentação': 4,
              'Decoração': 2,
              'Audiovisual': 2,
              'Transporte': 1,
              'Outros': 1
            },
            mediaAvaliacao: 4.2,
            valorTotal: 180000,
            fornecedoresMaisUsados: [
              { nome: 'Buffet Gourmet Eventos', count: 8 },
              { nome: 'SomPro Áudio', count: 5 },
              { nome: 'LuzTech Iluminação', count: 4 }
            ]
          });
        }, 600);
      });
    }
  };
  
  export default FornecedorService;