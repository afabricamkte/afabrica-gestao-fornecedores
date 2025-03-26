import React, { useState, useEffect } from 'react';
import { ChevronDown, User, Users, Eye, LogOut, PlusCircle, Trash2, Edit, Filter, Search, 
         Calendar, PieChart, Settings, FileText, DollarSign, CheckCircle, AlertCircle,
         UserPlus, CreditCard, Award, Star, Bell, Home, BarChart, UserCheck, Clock } from 'lucide-react';
import _ from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         BarChart, Bar, PieChart as RePieChart, Pie, Cell } from 'recharts';

// Função para criar estilo global com as fontes da AFÁBRICA
const GlobalStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap');
      
      :root {
        --primary: #010d36;
        --secondary: #dfd7c0;
        --tertiary: #fef9ef;
        --success: #10b981;
        --warning: #f59e0b;
        --danger: #ef4444;
        --info: #3b82f6;
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

// Dados simulados para o sistema SaaS
const dadosIniciais = {
  usuarios: [
    { 
      id: 1, 
      nome: 'Admin AFÁBRICA', 
      email: 'admin@afabrica.com', 
      senha: 'admin123', 
      role: 'admin', 
      plano: 'enterprise',
      empresaId: null,
      status: 'ativo',
      dataCriacao: '2024-01-01',
      ultimoAcesso: '2025-03-15'
    },
    { 
      id: 2, 
      nome: 'Maria Silva', 
      email: 'maria@evento.com', 
      senha: 'maria123', 
      role: 'client', 
      plano: 'professional',
      empresaId: 1,
      status: 'ativo',
      dataCriacao: '2024-01-15',
      ultimoAcesso: '2025-03-10'
    },
    { 
      id: 3, 
      nome: 'João Produtor', 
      email: 'joao@evento.com', 
      senha: 'joao123', 
      role: 'collaborator', 
      plano: null,
      empresaId: 1,
      status: 'ativo',
      dataCriacao: '2024-01-20',
      ultimoAcesso: '2025-02-28'
    },
    { 
      id: 4, 
      nome: 'Carlos Mendes', 
      email: 'carlos@fest.com', 
      senha: 'carlos123', 
      role: 'client', 
      plano: 'basic',
      empresaId: 2,
      status: 'ativo',
      dataCriacao: '2024-02-05',
      ultimoAcesso: '2025-03-01'
    },
  ],
  
  empresas: [
    {
      id: 1,
      nome: 'Eventos & Cia',
      cnpj: '12.345.678/0001-90',
      plano: 'professional',
      dataCriacao: '2024-01-15',
      status: 'ativo',
      colaboradoresIds: [3],
      limiteEventos: 50,
      eventosCriados: 2
    },
    {
      id: 2,
      nome: 'Festa Perfeita',
      cnpj: '23.456.789/0001-21',
      plano: 'basic',
      dataCriacao: '2024-02-05',
      status: 'ativo',
      colaboradoresIds: [],
      limiteEventos: 10,
      eventosCriados: 1
    }
  ],
  
  planos: [
    {
      id: 'free',
      nome: 'Gratuito',
      preco: 0,
      limiteEventos: 3,
      limiteColaboradores: 0,
      acessoFornecedores: true,
      relatorios: false,
      suporteTecnico: 'email',
      descricao: 'Ideal para testar a plataforma'
    },
    {
      id: 'basic',
      nome: 'Básico',
      preco: 49.90,
      limiteEventos: 10,
      limiteColaboradores: 1,
      acessoFornecedores: true,
      relatorios: true,
      suporteTecnico: 'email',
      descricao: 'Para produtores iniciantes'
    },
    {
      id: 'professional',
      nome: 'Profissional',
      preco: 99.90,
      limiteEventos: 50,
      limiteColaboradores: 5,
      acessoFornecedores: true,
      relatorios: true,
      suporteTecnico: 'chat',
      descricao: 'Para empresas de eventos'
    },
    {
      id: 'enterprise',
      nome: 'Empresarial',
      preco: 199.90,
      limiteEventos: 'ilimitado',
      limiteColaboradores: 'ilimitado',
      acessoFornecedores: true,
      relatorios: true,
      suporteTecnico: 'dedicado',
      descricao: 'Para grandes produtoras'
    }
  ],
  
  fornecedores: [
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
      avaliacoes: [
        { id: 1, usuarioId: 2, pontuacao: 4, comentario: 'Excelente qualidade de som', data: '2024-12-10' },
        { id: 2, usuarioId: 4, pontuacao: 3, comentario: 'Bom atendimento, mas atrasou', data: '2025-01-15' }
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
      avaliacao: 5,
      avaliacoes: [
        { id: 3, usuarioId: 2, pontuacao: 5, comentario: 'Iluminação impecável!', data: '2024-11-20' }
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
      avaliacao: 4.5,
      avaliacoes: [
        { id: 4, usuarioId: 2, pontuacao: 5, comentario: 'Comida deliciosa e apresentação impecável', data: '2025-01-05' },
        { id: 5, usuarioId: 4, pontuacao: 4, comentario: 'Muito bom, apenas alguns atrasos', data: '2024-12-18' }
      ]
    }
  ],
  
  servicos: [
    { id: 1, nome: 'Sonorização' },
    { id: 2, nome: 'Iluminação' },
    { id: 3, nome: 'Alimentação' },
    { id: 4, nome: 'Palco e Estruturas' },
    { id: 5, nome: 'Audiovisual' },
    { id: 6, nome: 'Decoração' },
    { id: 7, nome: 'Mestre de Cerimônias' },
    { id: 8, nome: 'Transporte' }
  ],
  
  eventos: [
    { 
      id: 1, 
      nome: 'Conferência de Lideranças 2025', 
      cliente: 'Corporação ABC', 
      empresaId: 1,
      criadoPor: 2,
      dataInicio: '2025-04-15', 
      dataFim: '2025-04-17', 
      local: 'Centro de Convenções São Paulo', 
      orcamentoTotal: 85000,
      status: 'Confirmado',
      descricao: 'Evento corporativo para 300 pessoas com palestras e workshops.',
      fornecedoresIds: [1, 2, 3],
      dataCriacao: '2025-01-10'
    },
    { 
      id: 2, 
      nome: 'Lançamento Produto XYZ', 
      cliente: 'Tech Solutions', 
      empresaId: 1,
      criadoPor: 3,
      dataInicio: '2025-05-20', 
      dataFim: '2025-05-20', 
      local: 'Hotel Grand Hyatt', 
      orcamentoTotal: 42000,
      status: 'Em planejamento',
      descricao: 'Evento de lançamento de produto com coquetel para 150 convidados.',
      fornecedoresIds: [2],
      dataCriacao: '2025-02-05'
    },
    { 
      id: 3, 
      nome: 'Festa de Aniversário', 
      cliente: 'Carlos Oliveira', 
      empresaId: 2,
      criadoPor: 4,
      dataInicio: '2025-04-25', 
      dataFim: '2025-04-25', 
      local: 'Casa de Festas Elegance', 
      orcamentoTotal: 15000,
      status: 'Confirmado',
      descricao: 'Festa de aniversário para 80 convidados com música ao vivo.',
      fornecedoresIds: [3],
      dataCriacao: '2025-02-15'
    }
  ]
};

// Componente de Login
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [view, setView] = useState('login'); // login, registro, recuperarSenha

  const handleSubmit = (e) => {
    e.preventDefault();
    // Em um cenário real, validaria credenciais com API
    
    // Simulação de login com usuários do sistema
    const usuarioEncontrado = dadosIniciais?.usuarios?.find(
      (u) => u?.email === email && u?.senha === password
    );
    
    if (usuarioEncontrado) {
      let empresa = null;
      if (usuarioEncontrado.empresaId) {
        empresa = dadosIniciais?.empresas?.find(e => e?.id === usuarioEncontrado.empresaId);
      }
      
      onLogin({ ...usuarioEncontrado, empresa });
    } else {
      setErro('Email ou senha inválidos');
    }
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    // Aqui seria implementado o registro real com API
    alert('Em um sistema real, aqui seria processado o registro de novo usuário e empresa');
    setView('login');
  };

  const renderLogin = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
        <p className="text-lg">Plataforma de Gestão de Eventos</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {erro && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{erro}</div>}
        
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
          <div className="mt-1 text-right">
            <button 
              type="button" 
              onClick={() => setView('recuperarSenha')}
              className="text-sm text-primary hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition mb-4"
        >
          Entrar
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button 
              type="button"
              onClick={() => setView('registro')}
              className="text-primary hover:underline"
            >
              Registre-se
            </button>
          </p>
        </div>
      </form>
    </div>
  );

  const renderRegistro = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
        <p className="text-lg">Crie sua conta</p>
      </div>
      
      <form onSubmit={handleRegistro} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome completo</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Nome da empresa</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">CNPJ (opcional)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Plano</label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="free">Gratuito</option>
            <option value="basic">Básico (R$ 49,90/mês)</option>
            <option value="professional">Profissional (R$ 99,90/mês)</option>
            <option value="enterprise">Empresarial (R$ 199,90/mês)</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
        >
          Criar conta
        </button>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button 
              type="button"
              onClick={() => setView('login')}
              className="text-primary hover:underline"
            >
              Faça login
            </button>
          </p>
        </div>
      </form>
    </div>
  );

  const renderRecuperarSenha = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
        <p className="text-lg">Recuperar senha</p>
      </div>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Em um sistema real, um email de recuperação seria enviado');
        setView('login');
      }} className="space-y-4">
        <p className="text-sm text-gray-600 mb-4">
          Informe seu email e enviaremos instruções para redefinir sua senha.
        </p>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
        >
          Enviar instruções
        </button>
        
        <div className="text-center">
          <button 
            type="button"
            onClick={() => setView('login')}
            className="text-primary hover:underline text-sm"
          >
            Voltar para o login
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary p-4">
      {view === 'login' && renderLogin()}
      {view === 'registro' && renderRegistro()}
      {view === 'recuperarSenha' && renderRecuperarSenha()}
    </div>
  );
};

// Componente de Cabeçalho
const Header = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificacoesOpen, setNotificacoesOpen] = useState(false);
  
  // Simulação de notificações
  const notificacoes = [
    { id: 1, texto: 'Novo fornecedor adicionado ao sistema', data: '2025-03-15', lida: false },
    { id: 2, texto: 'Evento "Conferência de Lideranças" atualizado', data: '2025-03-14', lida: true },
    { id: 3, texto: 'Lembrete: Pagamento pendente para LuzTech', data: '2025-03-10', lida: true }
  ];
  
  return (
    <header className="bg-primary text-secondary py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">AFÁBRICA</h1>
          <span className="text-sm">Gestão de Eventos</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Botão de notificações */}
          <div className="relative">
            <button 
              onClick={() => setNotificacoesOpen(!notificacoesOpen)}
              className="text-secondary hover:text-white focus:outline-none relative"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notificacoes.filter(n => !n.lida).length}
              </span>
            </button>
            
            {notificacoesOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-medium">Notificações</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notificacoes.length > 0 ? (
                    notificacoes.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 border-b border-gray-100 ${!notif.lida ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-sm text-gray-800">{notif.texto}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(notif.data).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Não há notificações
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 text-center">
                  <button className="text-xs text-primary hover:underline">
                    Marcar todas como lidas
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Menu do usuário */}
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span>{user.nome}</span>
              <ChevronDown size={16} />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-3 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user.nome}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  {user.empresa && (
                    <div className="mt-1 flex items-center">
                      <span className="text-xs px-2 py-0.5 bg-primary text-white rounded-full">
                        {user.empresa.nome}
                      </span>
                      <span className="ml-1 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                        {dadosIniciais.planos.find(p => p.id === user.plano)?.nome || 'Gratuito'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="py-1">
                  <a href="#perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      Meu Perfil
                    </div>
                  </a>
                  {user.role === 'client' && (
                    <a href="#plano" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <div className="flex items-center">
                        <CreditCard size={16} className="mr-2" />
                        Meu Plano
                      </div>
                    </a>
                  )}
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <div className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      Configurações
                    </div>
                  </a>
                </div>
                
                <div className="py-1 border-t border-gray-100">
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center text-red-600">
                      <LogOut size={16} className="mr-2" />
                      Sair
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente da Barra Lateral
const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  // Definição de itens do menu baseados no papel do usuário
  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
      { id: 'eventos', label: 'Eventos', icon: <Calendar size={18} /> },
      { id: 'fornecedores', label: 'Fornecedores', icon: <Users size={18} /> },
      { id: 'servicos', label: 'Tipos de Serviço', icon: <Filter size={18} /> },
      { id: 'relatorios', label: 'Relatórios', icon: <BarChart size={18} /> }
    ];
    
    // Itens específicos para administrador
    if (userRole === 'admin') {
      return [
        ...commonItems,
        { id: 'usuarios', label: 'Usuários', icon: <UserCheck size={18} /> },
        { id: 'planos', label: 'Planos', icon: <Award size={18} /> },
        { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> }
      ];
    }
    
    return [
      ...commonItems,
      { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> }
    ];
  };
  
  const menuItems = getMenuItems();
  
  return (
    <div className="bg-primary text-white w-64 min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-secondary">Menu</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-2 rounded ${
                  activeTab === item.id ? 'bg-secondary text-primary' : 'hover:bg-opacity-10 hover:bg-secondary'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Barra lateral móvel
const MobileSidebar = ({ activeTab, setActiveTab, userRole, isOpen, onClose }) => {
  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
      { id: 'eventos', label: 'Eventos', icon: <Calendar size={18} /> },
      { id: 'fornecedores', label: 'Fornecedores', icon: <Users size={18} /> },
      { id: 'servicos', label: 'Tipos de Serviço', icon: <Filter size={18} /> },
      { id: 'relatorios', label: 'Relatórios', icon: <BarChart size={18} /> },
    ];
    
    if (userRole === 'admin') {
      return [
        ...commonItems,
        { id: 'usuarios', label: 'Usuários', icon: <UserCheck size={18} /> },
        { id: 'planos', label: 'Planos', icon: <Award size={18} /> },
        { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> }
      ];
    }
    
    return [
      ...commonItems,
      { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> }
    ];
  };
  
  const menuItems = getMenuItems();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-primary text-white p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-secondary">Menu</h2>
          <button onClick={onClose} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center p-2 rounded ${
                  activeTab === item.id ? 'bg-secondary text-primary' : 'hover:bg-opacity-10 hover:bg-secondary'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Componente de Título da Página com Botão Móvel
const PageTitle = ({ title, onMenuToggle, actionButton }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <button className="mr-2 md:hidden" onClick={onMenuToggle}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {actionButton}
    </div>
  );
};

// Componente Dashboard
const Dashboard = ({ user, events, fornecedores, servicos }) => {
  // Filtrar eventos específicos da empresa do usuário se não for admin
  const filteredEvents = user.role === 'admin' 
    ? events 
    : events.filter(event => event.empresaId === user.empresa?.id);
  
  // Cálculos para o dashboard
  const totalEvents = filteredEvents.length;
  const totalPendingEvents = filteredEvents.filter(e => e.status !== 'Concluído' && e.status !== 'Cancelado').length;
  const totalFornecedores = user.role === 'admin' ? fornecedores.length : 
    [...new Set(filteredEvents.flatMap(e => e.fornecedoresIds))].length;
  
  // Total financeiro comprometido com eventos
  const totalBudget = filteredEvents.reduce((sum, item) => sum + (item.orcamentoTotal || 0), 0);
  
  // Próximos eventos (ordenados por data)
  const upcomingEvents = [...filteredEvents]
    .filter(e => new Date(e.dataInicio) >= new Date())
    .sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
    .slice(0, 3);
  
  // Fornecedores mais utilizados
  const fornecedoresByUsage = user.role === 'admin' 
    ? fornecedores
    : fornecedores.filter(f => 
        filteredEvents.some(e => e.fornecedoresIds.includes(f.id))
      );
  
  // Dados para gráfico de eventos por status
  const eventsByStatus = _.groupBy(filteredEvents, 'status');
  const chartData = Object.keys(eventsByStatus).map(status => ({
    name: status,
    value: eventsByStatus[status].length
  }));
  
  // Cores para o gráfico
  const COLORS = ['#010d36', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];
  
  return (
    <div className="p-4 md:p-6">
      <PageTitle 
        title={`Olá, ${user.nome}`} 
        onMenuToggle={() => {}} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Eventos Ativos</h3>
            <Calendar size={24} className="text-primary" />
          </div>
          <p className="text-3xl font-bold">{totalPendingEvents}</p>
          <p className="text-sm text-gray-500">de {totalEvents} eventos totais</p>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Orçamento Total</h3>
            <DollarSign size={24} className="text-green-600" />
          </div>
          <p className="text-3xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-gray-500">em todos os eventos</p>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Fornecedores</h3>
            <Users size={24} className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{totalFornecedores}</p>
          <p className="text-sm text-gray-500">fornecedores utilizados</p>
        </div>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Próximo Evento</h3>
            <Clock size={24} className="text-orange-500" />
          </div>
          {upcomingEvents.length > 0 ? (
            <>
              <p className="text-xl font-medium truncate">{upcomingEvents[0].nome}</p>
              <p className="text-sm text-gray-500">
                {new Date(upcomingEvents[0].dataInicio).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-lg">Nenhum evento próximo</p>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Próximos Eventos</h3>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map(event => {
                const daysUntil = Math.ceil((new Date(event.dataInicio) - new Date()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={event.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg">{event.nome}</h4>
                        <p className="text-sm text-gray-600">{event.cliente}</p>
                        <div className="mt-1 flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-500" />
                          <span className="text-sm">
                            {new Date(event.dataInicio).toLocaleDateString()} 
                            {event.dataFim !== event.dataInicio && 
                              ` - ${new Date(event.dataFim).toLocaleDateString()}`}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <DollarSign size={14} className="mr-1 text-gray-500" />
                          <span className="text-sm">
                            R$ {event.orcamentoTotal.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="px-3 py-1 rounded-full text-xs text-white bg-primary mb-2">
                          {event.status}
                        </span>
                        <span className="text-sm font-medium">
                          {daysUntil === 0 ? 'Hoje' : daysUntil === 1 ? 'Amanhã' : `Em ${daysUntil} dias`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-20" />
              <p>Nenhum evento programado</p>
            </div>
          )}
          {totalEvents > 3 && (
            <div className="mt-4 text-center">
              <button className="text-primary hover:underline text-sm">
                Ver todos os eventos
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Eventos por Status</h3>
          {filteredEvents.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} eventos`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <PieChart size={48} className="mx-auto mb-4 opacity-20" />
              <p>Sem dados para exibir</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Fornecedores Mais Utilizados</h3>
          {fornecedoresByUsage.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fornecedor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Serviço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avaliação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fornecedoresByUsage.slice(0, 5).map(fornecedor => (
                    <tr key={fornecedor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{fornecedor.nome}</div>
                        <div className="text-sm text-gray-500">{fornecedor.contato}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {fornecedor.tipoServico}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < Math.floor(fornecedor.avaliacao) 
                                ? "text-yellow-400 fill-current" 
                                : i < fornecedor.avaliacao 
                                  ? "text-yellow-400 fill-current opacity-50" 
                                  : "text-gray-300"}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {fornecedor.avaliacao.toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 opacity-20" />
              <p>Nenhum fornecedor utilizado ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente de gestão de Eventos
const EventosManager = ({ user, events, fornecedores, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('lista'); // lista, detalhes, form
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Filtrar eventos específicos da empresa do usuário se não for admin
  const userEvents = user.role === 'admin' 
    ? events 
    : events.filter(event => event.empresaId === user.empresa?.id);
  
  useEffect(() => {
    let filtered = userEvents;
    
    if (search) {
      filtered = filtered.filter(e => 
        e.nome.toLowerCase().includes(search.toLowerCase()) ||
        e.cliente.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    setFilteredEvents(filtered);
  }, [userEvents, search, statusFilter]);
  
  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
    setView('form');
  };
  
  const handleView = (event) => {
    setSelectedEvent(event);
    setView('detalhes');
  };
  
  const handleSave = (event) => {
    if (editingEvent) {
      onUpdateEvent({ ...event, id: editingEvent.id });
    } else {
      onAddEvent({ 
        ...event, 
        id: Date.now(),
        empresaId: user.empresa?.id || null,
        criadoPor: user.id,
        dataCriacao: new Date().toISOString().split('T')[0]
      });
    }
    setShowForm(false);
    setEditingEvent(null);
    setView('lista');
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
    setView('lista');
  };
  
  const EventoForm = ({ event, fornecedores, onSave, onCancel }) => {
    const [form, setForm] = useState({
      nome: '',
      cliente: '',
      dataInicio: '',
      dataFim: '',
      local: '',
      orcamentoTotal: '',
      status: 'Em planejamento',
      descricao: '',
      fornecedoresIds: [],
      ...event
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ 
        ...form, 
        [name]: name === 'orcamentoTotal' ? parseFloat(value) || '' : 
                name === 'fornecedoresIds' ? form.fornecedoresIds : value 
      });
    };
    
    const handleFornecedorToggle = (id) => {
      const newIds = form.fornecedoresIds && form.fornecedoresIds.includes(id)
        ? form.fornecedoresIds.filter(fId => fId !== id)
        : [...(form.fornecedoresIds || []), id];
      
      setForm({ ...form, fornecedoresIds: newIds });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(form);
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{event ? 'Editar Evento' : 'Novo Evento'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome do Evento</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cliente</label>
              <input
                type="text"
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Data de Início</label>
              <input
                type="date"
                name="dataInicio"
                value={form.dataInicio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Data de Término</label>
              <input
                type="date"
                name="dataFim"
                value={form.dataFim}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Local</label>
              <input
                type="text"
                name="local"
                value={form.local}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Orçamento Total (R$)</label>
              <input
                type="number"
                name="orcamentoTotal"
                value={form.orcamentoTotal}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="Proposta enviada">Proposta enviada</option>
                <option value="Em planejamento">Em planejamento</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Em execução">Em execução</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Fornecedores</label>
            <div className="bg-gray-50 p-3 rounded border max-h-60 overflow-y-auto">
              {fornecedores.length > 0 ? (
                fornecedores.map((fornecedor) => (
                  <div key={fornecedor.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`fornecedor-${fornecedor.id}`}
                      checked={form.fornecedoresIds.includes(fornecedor.id)}
                      onChange={() => handleFornecedorToggle(fornecedor.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`fornecedor-${fornecedor.id}`} className="text-sm">
                      {fornecedor.nome} ({fornecedor.tipoServico})
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Nenhum fornecedor cadastrado</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  const EventoDetalhes = ({ event, fornecedores, onEdit, onDelete, onBack }) => {
    const eventFornecedores = fornecedores.filter(f => event.fornecedoresIds.includes(f.id));
    const criador = dadosIniciais.usuarios.find(u => u.id === event.criadoPor);
    
    const getStatusClass = (status) => {
      switch(status) {
        case 'Proposta enviada': return 'bg-blue-100 text-blue-800';
        case 'Em planejamento': return 'bg-purple-100 text-purple-800';
        case 'Confirmado': return 'bg-green-100 text-green-800';
        case 'Em execução': return 'bg-yellow-100 text-yellow-800';
        case 'Concluído': return 'bg-gray-100 text-gray-800';
        case 'Cancelado': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <button 
              onClick={onBack} 
              className="flex items-center text-gray-600 hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Voltar
            </button>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(event)}
                className="px-3 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white"
              >
                <Edit size={16} />
              </button>
              {user.role === 'admin' || user.id === event.criadoPor ? (
                <button
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
                      onDelete(event.id);
                      onBack();
                    }
                  }}
                  className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold">{event.nome}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusClass(event.status)}`}>
              {event.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Detalhes do Evento</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Cliente</p>
                    <p className="font-medium">{event.cliente}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Data</p>
                    <p className="font-medium">
                      {new Date(event.dataInicio).toLocaleDateString('pt-BR')} 
                      {event.dataFim !== event.dataInicio && 
                        ` a ${new Date(event.dataFim).toLocaleDateString('pt-BR')}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Local</p>
                    <p className="font-medium">{event.local}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Orçamento Total</p>
                    <p className="font-medium">R$ {event.orcamentoTotal.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Informações Adicionais</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Criado por</p>
                    <p className="font-medium">{criador?.nome || 'Usuário desconhecido'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Data de criação</p>
                    <p className="font-medium">{new Date(event.dataCriacao).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fornecedores</p>
                    <p className="font-medium">{eventFornecedores.length} selecionados</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duração</p>
                    <p className="font-medium">
                      {Math.ceil((new Date(event.dataFim) - new Date(event.dataInicio)) / (1000 * 60 * 60 * 24) + 1)} dias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descrição</h3>
            <div className="bg-gray-50 p-4 rounded">
              <p>{event.descricao || 'Nenhuma descrição fornecida.'}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Fornecedores ({eventFornecedores.length})</h3>
            {eventFornecedores.length > 0 ? (
              <div className="bg-gray-50 rounded overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Serviço</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avaliação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventFornecedores.map(fornecedor => (
                      <tr key={fornecedor.id} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{fornecedor.nome}</p>
                            <p className="text-xs text-gray-500">{fornecedor.contato}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">{fornecedor.tipoServico}</td>
                        <td className="px-4 py-3">R$ {fornecedor.valor.toLocaleString('pt-BR')}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(fornecedor.avaliacao) 
                                  ? "text-yellow-400 fill-current" 
                                  : i < fornecedor.avaliacao 
                                    ? "text-yellow-400 fill-current opacity-50" 
                                    : "text-gray-300"}
                              />
                            ))}
                            <span className="ml-1 text-xs text-gray-600">
                              {fornecedor.avaliacao.toFixed(1)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded text-gray-500 text-center">
                Nenhum fornecedor selecionado para este evento.
              </div>
            )}
          </div>
          
          <div className="border-t pt-4 flex justify-end space-x-2">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Voltar
            </button>
            <button
              onClick={() => onEdit(event)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const EventoCard = ({ event, onView, onEdit, onDelete }) => {
    const getEventStatus = (status) => {
      switch (status) {
        case 'Proposta enviada':
          return { color: 'bg-blue-100 text-blue-800', icon: <FileText size={14} className="mr-1" /> };
        case 'Em planejamento':
          return { color: 'bg-purple-100 text-purple-800', icon: <Calendar size={14} className="mr-1" /> };
        case 'Confirmado':
          return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} className="mr-1" /> };
        case 'Em execução':
          return { color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle size={14} className="mr-1" /> };
        case 'Concluído':
          return { color: 'bg-gray-100 text-gray-800', icon: <CheckCircle size={14} className="mr-1" /> };
        case 'Cancelado':
          return { color: 'bg-red-100 text-red-800', icon: <AlertCircle size={14} className="mr-1" /> };
        default:
          return { color: 'bg-gray-100 text-gray-800', icon: null };
      }
    };
    
    const statusStyles = getEventStatus(event.status);
    const eventFornecedores = fornecedores.filter(f => 
      event.fornecedoresIds.includes(f.id)
    );
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div 
          className="p-6 cursor-pointer"
          onClick={() => onView(event)}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-primary">{event.nome}</h3>
            <span className={`px-3 py-1 rounded-full flex items-center text-xs ${statusStyles.color}`}>
              {statusStyles.icon}
              {event.status}
            </span>
          </div>
          
          <div className="text-sm text-gray-500 mb-4">
            <p className="mb-1"><strong>Cliente:</strong> {event.cliente}</p>
            <p className="mb-1">
              <strong>Data:</strong> {new Date(event.dataInicio).toLocaleDateString()} 
              {event.dataFim !== event.dataInicio && 
                ` - ${new Date(event.dataFim).toLocaleDateString()}`}
            </p>
            <p className="mb-1"><strong>Local:</strong> {event.local}</p>
            <p className="mb-1">
              <strong>Orçamento:</strong> R$ {event.orcamentoTotal.toLocaleString('pt-BR')}
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2">Fornecedores ({eventFornecedores.length})</h4>
            {eventFornecedores.length > 0 ? (
              <ul className="text-sm text-gray-600">
                {eventFornecedores.slice(0, 3).map((f) => (
                  <li key={f.id} className="mb-1">• {f.nome} ({f.tipoServico})</li>
                ))}
                {eventFornecedores.length > 3 && (
                  <li className="text-gray-500">+ {eventFornecedores.length - 3} mais</li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Nenhum fornecedor atribuído</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(event);
              }}
              className="text-primary hover:text-primary-dark"
            >
              <Edit size={18} />
            </button>
            {(user.role === 'admin' || user.id === event.criadoPor) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm('Tem certeza que deseja excluir este evento?')) {
                    onDelete(event.id);
                  }
                }}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const EventList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventoCard
            key={event.id}
            event={event}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={onDeleteEvent}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Nenhum evento encontrado</p>
          <button 
            onClick={() => {
              setShowForm(true);
              setView('form');
            }}
            className="mt-4 text-primary hover:underline"
          >
            Criar um novo evento
          </button>
        </div>
      )}
    </div>
  );}