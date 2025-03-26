import React, { useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FornecedoresManager from './components/FornecedoresManager';
import ServicosManager from './components/ServicosManager';
import EventosManager from './components/EventosManager';
import RelatoriosManager from './components/RelatoriosManager';
import ConfiguracoesManager from './components/ConfiguracoesManager';
import UsersManager from './components/UsersManager';
import SubscriptionManager from './components/SubscriptionManager';
import IntegrationsManager from './components/IntegrationsManager';
import Onboarding from './components/Onboarding';
import { Calendar, MessageSquare, DollarSign } from 'lucide-react';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Minha Produtora' }
  ]);
  const [currentOrgId, setCurrentOrgId] = useState(1);
  const [subscription, setSubscription] = useState({
    plan: 'professional',
    status: 'active',
    nextBillingDate: '27/04/2025',
    usageStats: {
      users: 3,
      suppliers: 12,
      eventsThisMonth: 5
    },
    paymentHistory: [
      { id: 1, date: '27/03/2025', description: 'Plano Profissional - Abril 2025', amount: 199.90, status: 'paid' },
      { id: 2, date: '27/02/2025', description: 'Plano Profissional - Março 2025', amount: 199.90, status: 'paid' },
      { id: 3, date: '27/01/2025', description: 'Plano Profissional - Fevereiro 2025', amount: 199.90, status: 'paid' }
    ]
  });
  
  // Dados de usuários para gerenciamento de equipe
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Administrador', 
      email: 'admin@empresa.com', 
      role: 'admin', 
      isActive: true 
    },
    { 
      id: 2, 
      name: 'João Silva', 
      email: 'joao@empresa.com', 
      role: 'collaborator', 
      isActive: true 
    },
    { 
      id: 3, 
      name: 'Maria Souza', 
      email: 'maria@empresa.com', 
      role: 'viewer', 
      isActive: true 
    }
  ]);
  
  // Dados para API e integrações
  const [apiKeys, setApiKeys] = useState([
    { 
      id: 1, 
      name: 'Integração Calendário', 
      prefix: 'sk_live_a1b2c3', 
      createdAt: '15/02/2025', 
      lastUsed: '25/03/2025' 
    }
  ]);
  
  const [webhooks, setWebhooks] = useState([
    { 
      id: 1, 
      name: 'Atualização Slack', 
      url: 'https://hooks.slack.com/services/T01234567/B01234567/abcdefghijklmnopqrstuvwx', 
      events: ['evento.created', 'fornecedor.created'], 
      active: true 
    }
  ]);
  
  const [integrations] = useState([
    { 
      id: 1, 
      name: 'Google Calendar', 
      category: 'Calendário', 
      description: 'Sincronize eventos com o Google Calendar', 
      connected: true, 
      icon: <Calendar size={24} /> 
    },
    { 
      id: 2, 
      name: 'Slack', 
      category: 'Comunicação', 
      description: 'Receba notificações no Slack', 
      connected: true, 
      icon: <MessageSquare size={24} /> 
    },
    { 
      id: 3, 
      name: 'QuickBooks', 
      category: 'Financeiro', 
      description: 'Integre dados financeiros com QuickBooks', 
      connected: false, 
      icon: <DollarSign size={24} /> 
    }
  ]);
  
  // Dados dos fornecedores
  const [fornecedores, setFornecedores] = useState([
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
  ]);
  
  // Dados dos serviços
  const [servicos, setServicos] = useState([
    { id: 1, nome: 'Sonorização' },
    { id: 2, nome: 'Iluminação' },
    { id: 3, nome: 'Alimentação' },
    { id: 4, nome: 'Palco e Estruturas' },
    { id: 5, nome: 'Audiovisual' },
    { id: 6, nome: 'Decoração' },
    { id: 7, nome: 'Mestre de Cerimônias' },
    { id: 8, nome: 'Transporte' }
  ]);
  
  // Dados dos eventos
  const [eventos, setEventos] = useState([
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
  ]);
  
  // Verificar se é um novo usuário que precisa de onboarding
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  
  const handleLogin = (userData) => {
    setUser(userData);
    
    // Verificar se o usuário precisa fazer onboarding
    if (userData.needsOnboarding) {
      setNeedsOnboarding(true);
    }
  };
  
  const handleLogout = () => {
    setUser(null);
  };
  
  const handleCreateApiKey = (apiKey) => {
    setApiKeys([...apiKeys, apiKey]);
  };
  
  const handleRevokeApiKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };
  
  const handleAddWebhook = (webhook) => {
    setWebhooks([...webhooks, webhook]);
  };
  
  const handleUpdateWebhook = (updatedWebhook) => {
    setWebhooks(
      webhooks.map((w) => (w.id === updatedWebhook.id ? updatedWebhook : w))
    );
  };
  
  const handleDeleteWebhook = (id) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
  };
  
  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };
  
  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };
  
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };
  
  const handleOnboardingComplete = (data) => {
    setOrganizations([{ id: 1, name: data.organizationName }]);
    setSubscription({
      ...subscription,
      plan: data.plan
    });
    setNeedsOnboarding(false);
  };
  
  // Funções para fornecedores
  const handleAddFornecedor = (fornecedor) => {
    setFornecedores([...fornecedores, fornecedor]);
  };
  
  const handleUpdateFornecedor = (updatedFornecedor) => {
    setFornecedores(
      fornecedores.map((f) => (f.id === updatedFornecedor.id ? updatedFornecedor : f))
    );
  };
  
  const handleDeleteFornecedor = (id) => {
    setFornecedores(fornecedores.filter((f) => f.id !== id));
  };
  
  // Funções para serviços
  const handleAddServico = (servico) => {
    setServicos([...servicos, servico]);
  };
  
  const handleUpdateServico = (updatedServico) => {
    setServicos(
      servicos.map((s) => (s.id === updatedServico.id ? updatedServico : s))
    );
  };
  
  const handleDeleteServico = (id) => {
    setServicos(servicos.filter((s) => s.id !== id));
  };
  
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }
  
  if (needsOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  
  const currentOrg = organizations.find(org => org.id === currentOrgId) || organizations[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalStyles />
      <Header 
        user={user} 
        organizations={organizations}
        currentOrg={currentOrg}
        onOrgChange={setCurrentOrgId}
        onLogout={handleLogout} 
      />
      
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          userRole={user.role}
        />
        
        <main className="flex-1 bg-tertiary overflow-auto">
          {activeTab === 'dashboard' && (
            <Dashboard fornecedores={fornecedores} servicos={servicos} />
          )}
          
          {activeTab === 'fornecedores' && (
            <FornecedoresManager
              fornecedores={fornecedores}
              servicos={servicos}
              userRole={user.role}
              onAddFornecedor={handleAddFornecedor}
              onUpdateFornecedor={handleUpdateFornecedor}
              onDeleteFornecedor={handleDeleteFornecedor}
            />
          )}
          
          {activeTab === 'servicos' && (
            <ServicosManager
              servicos={servicos}
              userRole={user.role}
              onAddServico={handleAddServico}
              onUpdateServico={handleUpdateServico}
              onDeleteServico={handleDeleteServico}
            />
          )}
          
          {activeTab === 'eventos' && (
            <EventosManager
              eventos={eventos}
              fornecedores={fornecedores}
              userRole={user.role}
              onAddEvento={(evento) => setEventos([...eventos, evento])}
              onUpdateEvento={(updatedEvento) => {
                setEventos(eventos.map(e => e.id === updatedEvento.id ? updatedEvento : e));
              }}
              onDeleteEvento={(id) => {
                setEventos(eventos.filter(e => e.id !== id));
              }}
            />
          )}
          
          {activeTab === 'relatorios' && (
            <RelatoriosManager
              fornecedores={fornecedores}
              eventos={eventos}
              servicos={servicos}
            />
          )}
          
          {activeTab === 'configuracoes' && (
            <ConfiguracoesManager userRole={user.role} />
          )}
          
          {activeTab === 'users' && (
            <UsersManager
              userRole={user.role}
              users={users}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          )}
          
          {activeTab === 'subscription' && (
            <SubscriptionManager
              userRole={user.role}
              subscription={subscription}
              onUpdatePlan={handleUpdatePlan}
            />
          )}
          
          {activeTab === 'integrations' && (
            <IntegrationsManager
              userRole={user.role}
              apiKeys={apiKeys}
              webhooks={webhooks}
              integrations={integrations}
              onCreateApiKey={handleCreateApiKey}
              onRevokeApiKey={handleRevokeApiKey}
              onAddWebhook={handleAddWebhook}
              onUpdateWebhook={handleUpdateWebhook}
              onDeleteWebhook={handleDeleteWebhook}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;