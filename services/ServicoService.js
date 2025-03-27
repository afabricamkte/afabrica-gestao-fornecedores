// Serviço para gerenciamento de tipos de serviços
const ServicoService = {
    // Obter todos os tipos de serviço
    getServicos: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados mockados
          const servicos = [
            { id: 1, nome: 'Sonorização', descricao: 'Equipamentos de áudio e técnicos de som' },
            { id: 2, nome: 'Iluminação', descricao: 'Sistemas de iluminação para eventos' },
            { id: 3, nome: 'Alimentação', descricao: 'Serviços de buffet e catering' },
            { id: 4, nome: 'Palco e Estruturas', descricao: 'Estruturas para palco, tendas e afins' },
            { id: 5, nome: 'Audiovisual', descricao: 'Projetores, telas e equipamentos para apresentações' },
            { id: 6, nome: 'Decoração', descricao: 'Decoração de ambientes para eventos' },
            { id: 7, nome: 'Mestre de Cerimônias', descricao: 'Profissionais para condução de eventos' },
            { id: 8, nome: 'Transporte', descricao: 'Serviços de transporte para convidados' }
          ];
          
          resolve(servicos);
        }, 300);
      });
    },
    
    // Obter tipo de serviço por ID
    getServicoById: async (id) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const servicos = [
            { id: 1, nome: 'Sonorização', descricao: 'Equipamentos de áudio e técnicos de som' },
            { id: 2, nome: 'Iluminação', descricao: 'Sistemas de iluminação para eventos' },
            { id: 3, nome: 'Alimentação', descricao: 'Serviços de buffet e catering' },
            { id: 4, nome: 'Palco e Estruturas', descricao: 'Estruturas para palco, tendas e afins' },
            { id: 5, nome: 'Audiovisual', descricao: 'Projetores, telas e equipamentos para apresentações' },
            { id: 6, nome: 'Decoração', descricao: 'Decoração de ambientes para eventos' },
            { id: 7, nome: 'Mestre de Cerimônias', descricao: 'Profissionais para condução de eventos' },
            { id: 8, nome: 'Transporte', descricao: 'Serviços de transporte para convidados' }
          ];
          
          const servico = servicos.find(s => s.id === id);
          
          if (servico) {
            resolve(servico);
          } else {
            reject(new Error('Tipo de serviço não encontrado'));
          }
        }, 200);
      });
    },
    
    // Criar novo tipo de serviço
    createServico: async (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...data,
            id: Date.now()
          });
        }, 400);
      });
    },
    
    // Atualizar tipo de serviço existente
    updateServico: async (id, data) => {
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
        }, 300);
      });
    },
    
    // Excluir tipo de serviço
    deleteServico: async (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, id });
        }, 300);
      });
    },
    
    // Obter estatísticas dos tipos de serviço
    getServicoStats: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalServicos: 8,
            servicosMaisUsados: [
              { nome: 'Alimentação', count: 12, percentual: 30 },
              { nome: 'Sonorização', count: 10, percentual: 25 },
              { nome: 'Iluminação', count: 8, percentual: 20 },
              { nome: 'Audiovisual', count: 5, percentual: 12.5 },
              { nome: 'Decoração', count: 3, percentual: 7.5 },
              { nome: 'Outros', count: 2, percentual: 5 }
            ],
            valorMedioPorServico: [
              { nome: 'Alimentação', valor: 10000 },
              { nome: 'Sonorização', valor: 5000 },
              { nome: 'Iluminação', valor: 3800 },
              { nome: 'Palco e Estruturas', valor: 8500 },
              { nome: 'Audiovisual', valor: 4200 },
              { nome: 'Decoração', valor: 6500 },
              { nome: 'Mestre de Cerimônias', valor: 1500 },
              { nome: 'Transporte', valor: 3000 }
            ]
          });
        }, 500);
      });
    }
  };
  
  export default ServicoService;