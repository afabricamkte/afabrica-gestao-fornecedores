// Serviço para gerenciamento de eventos
const EventService = {
    // Obter lista de eventos
    getEvents: async (filters = {}) => {
      // Em um ambiente real, isso seria uma chamada à API
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados simulados
          let eventos = [
            { 
              id: 1, 
              nome: 'Conferência de Lideranças 2025', 
              cliente: 'Corporação ABC', 
              dataInicio: '2025-04-15', 
              dataFim: '2025-04-17', 
              local: 'Centro de Convenções São Paulo', 
              orcamentoTotal: 85000,
              status: 'Confirmado',
              descricao: 'Evento corporativo para 300 pessoas com palestras e workshops.',
              fornecedoresIds: [1, 2, 3]
            },
            { 
              id: 2, 
              nome: 'Lançamento Produto XYZ', 
              cliente: 'Tech Solutions', 
              dataInicio: '2025-05-20', 
              dataFim: '2025-05-20', 
              local: 'Hotel Grand Hyatt', 
              orcamentoTotal: 42000,
              status: 'Em planejamento',
              descricao: 'Evento de lançamento de produto com coquetel para 150 convidados.',
              fornecedoresIds: [2]
            },
            { 
              id: 3, 
              nome: 'Workshop de Inovação', 
              cliente: 'Startup Hub', 
              dataInicio: '2025-06-10', 
              dataFim: '2025-06-11', 
              local: 'Espaço de Eventos Downtown', 
              orcamentoTotal: 28500,
              status: 'Proposta enviada',
              descricao: 'Workshop de dois dias para 80 participantes com dinâmicas colaborativas.',
              fornecedoresIds: []
            }
          ];
          
          // Aplicar filtros se existirem
          if (filters.status) {
            eventos = eventos.filter(e => e.status === filters.status);
          }
          
          if (filters.cliente) {
            eventos = eventos.filter(e => e.cliente.toLowerCase().includes(filters.cliente.toLowerCase()));
          }
          
          if (filters.dataInicio) {
            eventos = eventos.filter(e => new Date(e.dataInicio) >= new Date(filters.dataInicio));
          }
          
          if (filters.dataFim) {
            eventos = eventos.filter(e => new Date(e.dataFim) <= new Date(filters.dataFim));
          }
          
          // Ordenação
          if (filters.orderBy) {
            const dir = filters.orderDir === 'desc' ? -1 : 1;
            eventos.sort((a, b) => {
              if (a[filters.orderBy] < b[filters.orderBy]) return -1 * dir;
              if (a[filters.orderBy] > b[filters.orderBy]) return 1 * dir;
              return 0;
            });
          }
          
          resolve(eventos);
        }, 500);
      });
    },
    
    // Obter detalhes de um evento específico
    getEventById: async (eventId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Dados simulados
          const eventos = [
            { 
              id: 1, 
              nome: 'Conferência de Lideranças 2025', 
              cliente: 'Corporação ABC', 
              dataInicio: '2025-04-15', 
              dataFim: '2025-04-17', 
              local: 'Centro de Convenções São Paulo', 
              orcamentoTotal: 85000,
              status: 'Confirmado',
              descricao: 'Evento corporativo para 300 pessoas com palestras e workshops.',
              fornecedoresIds: [1, 2, 3],
              tarefas: [
                { id: 1, titulo: 'Confirmar palestrantes', status: 'Concluída', responsavel: 'João', prazo: '2025-03-15' },
                { id: 2, titulo: 'Reservar equipamentos', status: 'Em andamento', responsavel: 'Maria', prazo: '2025-04-01' },
                { id: 3, titulo: 'Enviar convites', status: 'Pendente', responsavel: 'Carlos', prazo: '2025-03-30' }
              ],
              timeline: [
                { data: '2025-02-10', descricao: 'Evento criado' },
                { data: '2025-02-15', descricao: 'Proposta enviada ao cliente' },
                { data: '2025-02-20', descricao: 'Proposta aprovada' },
                { data: '2025-03-01', descricao: 'Contrato assinado' }
              ]
            },
            { 
              id: 2, 
              nome: 'Lançamento Produto XYZ', 
              cliente: 'Tech Solutions', 
              dataInicio: '2025-05-20', 
              dataFim: '2025-05-20', 
              local: 'Hotel Grand Hyatt', 
              orcamentoTotal: 42000,
              status: 'Em planejamento',
              descricao: 'Evento de lançamento de produto com coquetel para 150 convidados.',
              fornecedoresIds: [2],
              tarefas: [
                { id: 1, titulo: 'Definir decoração', status: 'Em andamento', responsavel: 'Ana', prazo: '2025-04-15' },
                { id: 2, titulo: 'Contratar buffet', status: 'Pendente', responsavel: 'João', prazo: '2025-04-20' }
              ],
              timeline: [
                { data: '2025-03-01', descricao: 'Evento criado' },
                { data: '2025-03-10', descricao: 'Reunião inicial com cliente' }
              ]
            },
            { 
              id: 3, 
              nome: 'Workshop de Inovação', 
              cliente: 'Startup Hub', 
              dataInicio: '2025-06-10', 
              dataFim: '2025-06-11', 
              local: 'Espaço de Eventos Downtown', 
              orcamentoTotal: 28500,
              status: 'Proposta enviada',
              descricao: 'Workshop de dois dias para 80 participantes com dinâmicas colaborativas.',
              fornecedoresIds: [],
              tarefas: [],
              timeline: [
                { data: '2025-03-15', descricao: 'Evento criado' },
                { data: '2025-03-20', descricao: 'Proposta enviada' }
              ]
            }
          ];
          
          const evento = eventos.find(e => e.id === eventId);
          
          if (evento) {
            resolve(evento);
          } else {
            reject(new Error('Evento não encontrado'));
          }
        }, 300);
      });
    },
    
    // Criar um novo evento
    createEvent: async (eventData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando criação com id gerado pelo backend
          resolve({
            ...eventData,
            id: Date.now(),
            timeline: [
              { data: new Date().toISOString().split('T')[0], descricao: 'Evento criado' }
            ]
          });
        }, 800);
      });
    },
    
    // Atualizar evento existente
    updateEvent: async (eventId, eventData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Validação simulada
          if (!eventId) {
            reject(new Error('ID do evento não fornecido'));
            return;
          }
          
          // Simulando atualização bem-sucedida
          resolve({
            ...eventData,
            id: eventId,
            timeline: [
              ...(eventData.timeline || []),
              { data: new Date().toISOString().split('T')[0], descricao: 'Evento atualizado' }
            ]
          });
        }, 600);
      });
    },
    
    // Excluir evento
    deleteEvent: async (eventId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando exclusão bem-sucedida
          resolve({ success: true, id: eventId });
        }, 500);
      });
    },
    
    // Adicionar tarefa a um evento
    addTaskToEvent: async (eventId, taskData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando adição de tarefa
          resolve({
            id: Date.now(),
            ...taskData,
            eventId
          });
        }, 400);
      });
    },
    
    // Atualizar status de tarefa
    updateTaskStatus: async (eventId, taskId, status) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando atualização de status
          resolve({
            eventId,
            taskId,
            status,
            updatedAt: new Date().toISOString()
          });
        }, 300);
      });
    },
    
    // Obter estatísticas de eventos
    getEventStats: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Dados simulados de estatísticas
          resolve({
            total: 12,
            porStatus: {
              'Proposta enviada': 3,
              'Em planejamento': 4,
              'Confirmado': 2,
              'Em execução': 1,
              'Concluído': 2
            },
            valorTotal: 573500,
            porMes: [
              { mes: 'Jan', eventos: 1, valor: 35000 },
              { mes: 'Fev', eventos: 2, valor: 68000 },
              { mes: 'Mar', eventos: 2, valor: 95000 },
              { mes: 'Abr', eventos: 1, valor: 85000 },
              { mes: 'Mai', eventos: 3, valor: 142000 },
              { mes: 'Jun', eventos: 3, valor: 148500 }
            ]
          });
        }, 600);
      });
    },
    
    // Adicionar fornecedor a um evento
    addSupplierToEvent: async (eventId, fornecedorId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando adição de fornecedor
          resolve({
            eventId,
            fornecedorId,
            addedAt: new Date().toISOString()
          });
        }, 300);
      });
    },
    
    // Remover fornecedor de um evento
    removeSupplierFromEvent: async (eventId, fornecedorId) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulando remoção de fornecedor
          resolve({
            eventId,
            fornecedorId,
            removedAt: new Date().toISOString()
          });
        }, 300);
      });
    }
  };
  
  export default EventService;