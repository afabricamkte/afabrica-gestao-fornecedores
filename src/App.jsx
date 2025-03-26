setEventos(eventos.map(e => e.id === updatedEvento.id ? updatedEvento : e));
  };
  
  const handleDeleteEvento = (id) => {
    setEventos(eventos.filter(e => e.id !== id));
  };
  
  // Filtrar eventos do usuário atual (admin vê todos)
  const getUserEventos = () => {
    if (user.role === 'admin') {
      return eventos;
    }
    return eventos.filter(evento => evento.userId === user.id);
  };
  
  // Toggle para a sidebar mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalStyles />
      <Header 
        user={user} 
        onLogout={handleLogout} 
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user}
          isSidebarOpen={isSidebarOpen}
        />
        
        <div className="flex-1 p-0 lg:pl-64">
          <main className="min-h-screen bg-tertiary">
            {activeTab === 'dashboard' && (
              <Dashboard 
                fornecedores={fornecedores} 
                servicos={servicos} 
                eventos={getUserEventos()}
                user={user}
              />
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
                eventos={getUserEventos()}
                fornecedores={fornecedores}
                userRole={user.role}
                onAddEvento={handleAddEvento}
                onUpdateEvento={handleUpdateEvento}
                onDeleteEvento={handleDeleteEvento}
              />
            )}
            
            {activeTab === 'relatorios' && (
              <RelatoriosManager
                fornecedores={fornecedores}
                eventos={getUserEventos()}
                servicos={servicos}
                user={user}
              />
            )}
            
            {activeTab === 'avaliacoes' && (
              <AvaliacoesManager
                fornecedores={fornecedores}
                userRole={user.role}
                onUpdateFornecedor={handleUpdateFornecedor}
              />
            )}
            
            {activeTab === 'usuarios' && user.role === 'admin' && (
              <UsuariosManager userRole={user.role} />
            )}
            
            {activeTab === 'configuracoes' && (
              <ConfiguracoesManager userRole={user.role} user={user} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// Dashboard atualizado para foco em gestão de eventos
const Dashboard = ({ fornecedores, servicos, eventos, user }) => {
  // Cálculos para o dashboard
  const totalFornecedores = fornecedores.length;
  const totalServicos = servicos.length;
  const totalEventos = eventos.length;
  
  // Fornecedores por serviço
  const fornecedoresPorServico = _.groupBy(fornecedores, 'tipoServico');
  
  // Eventos por status
  const eventosPorStatus = _.groupBy(eventos, 'status');
  
  // Total financeiro comprometido com eventos
  const totalOrcamento = eventos.reduce((sum, e) => sum + e.orcamentoTotal, 0);
  
  // Próximos eventos (ordenados por data)
  const proximosEventos = [...eventos]
    .filter(e => new Date(e.dataInicio) >= new Date())
    .sort((a, b) => new Date(a.dataInicio) - new Date(b.dataInicio))
    .slice(0, 3);
  
  // Dados para o gráfico de eventos por mês
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const eventosAgrupadosPorMes = _.groupBy(eventos, evento => 
    new Date(evento.dataInicio).getMonth()
  );
  
  const dadosEventosPorMes = meses.map((mes, index) => ({
    mes,
    eventos: eventosAgrupadosPorMes[index]?.length || 0,
    orcamento: eventosAgrupadosPorMes[index]?.reduce((sum, e) => sum + e.orcamentoTotal, 0) || 0
  }));
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-600">Bem-vindo, {user.name}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Calendar size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Eventos</p>
            <p className="text-2xl font-bold">{totalEventos}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Fornecedores</p>
            <p className="text-2xl font-bold">{totalFornecedores}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <Filter size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Tipos de Serviço</p>
            <p className="text-2xl font-bold">{totalServicos}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <DollarSign size={24} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orçamento Total</p>
            <p className="text-2xl font-bold">R$ {totalOrcamento.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Eventos por Mês</h3>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosEventosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="eventos" name="Eventos" fill="#010d36" />
                  <Line yAxisId="right" type="monotone" dataKey="orcamento" name="Orçamento (R$)" stroke="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Próximos Eventos</h3>
          </div>
          <div className="p-6">
            {proximosEventos.length > 0 ? (
              <div className="space-y-4">
                {proximosEventos.map(evento => (
                  <div key={evento.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="font-medium">{evento.nome}</div>
                    <div className="text-sm text-gray-500">{evento.cliente}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        {new Date(evento.dataInicio).toLocaleDateString('pt-BR')}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full 
                        ${evento.status === 'Confirmado' ? 'bg-green-100 text-green-800' : 
                        evento.status === 'Em planejamento' ? 'bg-blue-100 text-blue-800' : 
                        evento.status === 'Proposta enviada' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                        {evento.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Nenhum evento próximo</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Eventos por Status</h3>
          </div>
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(eventosPorStatus).map(([status, eventos]) => ({
                      name: status,
                      value: eventos.length
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {Object.keys(eventosPorStatus).map((status, index) => {
                      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
                      return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                    })}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Fornecedores por Serviço</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.keys(fornecedoresPorServico).map((servico) => (
                <div key={servico} className="flex items-center">
                  <div className="w-1/3 font-medium">{servico}</div>
                  <div className="w-2/3">
                    <div className="bg-gray-200 rounded-full h-4 w-full">
                      <div 
                        className="bg-primary rounded-full h-4" 
                        style={{ width: `${(fornecedoresPorServico[servico].length / totalFornecedores) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm mt-1">{fornecedoresPorServico[servico].length} fornecedores</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para Configurações atualizado
const ConfiguracoesManager = ({ userRole, user }) => {
  const [perfilForm, setPerfilForm] = useState({
    name: user.name,
    email: user.email,
    company: user.company,
    phone: '(11) 98765-4321', // Simulado
    address: 'Av. Paulista, 1000, São Paulo - SP' // Simulado
  });
  
  const [planoAtual, setPlanoAtual] = useState(user.plan);
  
  const [notificacoes, setNotificacoes] = useState({
    novoEvento: true,
    novoFornecedor: true,
    atualizacaoEvento: true,
    lembretesPagamento: true
  });
  
  const [tema, setTema] = useState({
    modo: 'claro',
    corPrincipal: '#010d36',
    corSecundaria: '#dfd7c0',
    corTerciaria: '#fef9ef'
  });
  
  const handlePerfilChange = (e) => {
    const { name, value } = e.target;
    setPerfilForm({
      ...perfilForm,
      [name]: value
    });
  };
  
  const handleNotificacaoChange = (e) => {
    const { name, checked } = e.target;
    setNotificacoes({
      ...notificacoes,
      [name]: checked
    });
  };
  
  const handleTemaChange = (e) => {
    const { name, value } = e.target;
    setTema({
      ...tema,
      [name]: value
    });
  };
  
  const planos = [
    {
      nome: 'Basic',
      valor: 'Gratuito',
      recursos: [
        'Até 3 eventos simultâneos',
        'Acesso à base de fornecedores',
        'Relatórios básicos',
        'Suporte por email'
      ],
      recomendado: false,
      id: 'basic'
    },
    {
      nome: 'Pro',
      valor: 'R$ 99/mês',
      recursos: [
        'Até 10 eventos simultâneos',
        'Acesso à base de fornecedores',
        'Relatórios avançados',
        'Suporte prioritário',
        'Exportação de relatórios'
      ],
      recomendado: true,
      id: 'pro'
    },
    {
      nome: 'Premium',
      valor: 'R$ 199/mês',
      recursos: [
        'Eventos ilimitados',
        'Acesso à base de fornecedores',
        'Relatórios personalizados',
        'Suporte 24/7',
        'Gerenciamento de equipe',
        'API para integração'
      ],
      recomendado: false,
      id: 'premium'
    }
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Configurações</h2>
      
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Perfil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={perfilForm.name}
                onChange={handlePerfilChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={perfilForm.email}
                onChange={handlePerfilChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Empresa/Organização</label>
              <input
                type="text"
                name="company"
                value={perfilForm.company}
                onChange={handlePerfilChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Telefone</label>
              <input
                type="text"
                name="phone"
                value={perfilForm.phone}
                onChange={handlePerfilChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Endereço</label>
              <input
                type="text"
                name="address"
                value={perfilForm.address}
                onChange={handlePerfilChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Seu Plano</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planos.map((plano) => (
              <div 
                key={plano.id} 
                className={`border rounded-lg p-6 transition-all ${
                  planoAtual === plano.id ? 'border-primary shadow-md' : 'border-gray-200'
                } ${plano.recomendado ? 'relative' : ''}`}
              >
                {plano.recomendado && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl rounded-tr transform translate-x-0 -translate-y-0">
                    Recomendado
                  </div>
                )}
                
                <h4 className="text-lg font-bold">{plano.nome}</h4>
                <div className="text-2xl font-bold mt-2 mb-4">{plano.valor}</div>
                
                <ul className="space-y-2 mb-6">
                  {plano.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">{recurso}</span>
                    </li>
                  ))}
                </ul>
                
                {planoAtual === plano.id ? (
                  <button
                    className="w-full py-2 border border-primary text-primary rounded font-medium"
                    disabled
                  >
                    Plano Atual
                  </button>
                ) : (
                  <button
                    onClick={() => setPlanoAtual(plano.id)}
                    className="w-full py-2 bg-primary text-white rounded hover:bg-opacity-90 font-medium"
                  >
                    {planoAtual === 'basic' ? 'Fazer Upgrade' : 
                     plano.id === 'basic' ? 'Fazer Downgrade' : 
                     plano.id === 'premium' ? 'Fazer Upgrade' : 'Trocar Plano'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Notificações</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="novoEvento"
                checked={notificacoes.novoEvento}
                onChange={handleNotificacaoChange}
                className="mr-2"
              />
              <span>Receber notificação quando um novo evento for criado</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="novoFornecedor"
                checked={notificacoes.novoFornecedor}
                onChange={handleNotificacaoChange}
                className="mr-2"
              />
              <span>Receber notificação quando um novo fornecedor for cadastrado</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="atualizacaoEvento"
                checked={notificacoes.atualizacaoEvento}
                onChange={handleNotificacaoChange}
                className="mr-2"
              />
              <span>Receber notificação quando um evento for atualizado</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="lembretesPagamento"
                checked={notificacoes.lembretesPagamento}
                onChange={handleNotificacaoChange}
                className="mr-2"
              />
              <span>Receber lembretes de pagamento</span>
            </label>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            >
              Salvar Preferências
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Segurança</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Senha Atual</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Nova Senha</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar Nova Senha</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            >
              Alterar Senha
            </button>
          </div>
        </div>
        
        {userRole === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Configurações do Sistema</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tema</label>
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded p-3 text-center cursor-pointer ${
                    tema.modo === 'claro' ? 'border-primary bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setTema({...tema, modo: 'claro'})}
                >
                  <div className="font-medium">Claro</div>
                </div>
                <div
                  className={`border rounded p-3 text-center cursor-pointer ${
                    tema.modo === 'escuro' ? 'border-primary bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setTema({...tema, modo: 'escuro'})}
                >
                  <div className="font-medium">Escuro</div>
                </div>
                <div
                  className={`border rounded p-3 text-center cursor-pointer ${
                    tema.modo === 'sistema' ? 'border-primary bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setTema({...tema, modo: 'sistema'})}
                >
                  <div className="font-medium">Sistema</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cor Primária</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="corPrincipal"
                    value={tema.corPrincipal}
                    onChange={handleTemaChange}
                    className="w-10 h-10 p-0 border-0"
                  />
                  <input
                    type="text"
                    name="corPrincipal"
                    value={tema.corPrincipal}
                    onChange={handleTemaChange}
                    className="flex-1 ml-2 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cor Secundária</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="corSecundaria"
                    value={tema.corSecundaria}
                    onChange={handleTemaChange}
                    className="w-10 h-10 p-0 border-0"
                  />
                  <input
                    type="text"
                    name="corSecundaria"
                    value={tema.corSecundaria}
                    onChange={handleTemaChange}
                    className="flex-1 ml-2 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cor Terciária</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="corTerciaria"
                    value={tema.corTerciaria}
                    onChange={handleTemaChange}
                    className="w-10 h-10 p-0 border-0"
                  />
                  <input
                    type="text"
                    name="corTerciaria"
                    value={tema.corTerciaria}
                    onChange={handleTemaChange}
                    className="flex-1 ml-2 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;};

// Componente principal da aplicação - Refatorado
const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Dados compartilhados de fornecedores (base de dados global)
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
    },
    {
      id: 4,
      nome: 'DecorFest Decorações',
      email: 'contato@decorfest.com',
      telefone: '(11) 96666-4567',
      tipoServico: 'Decoração',
      valor: 8500,
      statusPagamento: 'Pendente',
      observacoes: 'Especializado em decorações temáticas',
      contato: 'Marina Santos',
      cnpj: '45.678.901/0001-34',
      endereco: 'Alameda Santos, 800, São Paulo - SP',
      avaliacao: 4.5
    },
    {
      id: 5,
      nome: 'TechView Audiovisual',
      email: 'comercial@techview.com',
      telefone: '(11) 95555-7890',
      tipoServico: 'Audiovisual',
      valor: 6500,
      statusPagamento: 'Pago',
      observacoes: 'Equipamentos de última geração',
      contato: 'Fernando Costa',
      cnpj: '56.789.012/0001-45',
      endereco: 'Rua Haddock Lobo, 400, São Paulo - SP',
      avaliacao: 4.8
    }
  ]);
  
  // Tipos de serviço
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
  
  // Eventos são agora por usuário, não globais
  const [eventos, setEventos] = useState([
    { 
      id: 1,
      userId: 3, // Pertence ao usuário 3
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
      userId: 4, // Pertence ao usuário 4
      nome: 'Lançamento Produto XYZ', 
      cliente: 'Tech Solutions', 
      dataInicio: '2025-05-20', 
      dataFim: '2025-05-20', 
      local: 'Hotel Grand Hyatt', 
      orcamentoTotal: 42000,
      status: 'Em planejamento',
      descricao: 'Evento de lançamento de produto com coquetel para 150 convidados.',
      fornecedoresIds: [2, 5]
    },
    { 
      id: 3,
      userId: 3, // Pertence ao usuário 3
      nome: 'Workshop de Inovação', 
      dataInicio: '2025-06-10', 
      dataFim: '2025-06-11', 
      cliente: 'Startup Hub', 
      local: 'Espaço de Eventos Downtown', 
      orcamentoTotal: 28500,
      status: 'Proposta enviada',
      descricao: 'Workshop de dois dias para 80 participantes com dinâmicas colaborativas.',
      fornecedoresIds: [5]
    },
    {
      id: 4,
      userId: 1, // Admin pode ver todos
      nome: 'Gala Beneficente Anual',
      cliente: 'Fundação Esperança',
      dataInicio: '2025-07-25',
      dataFim: '2025-07-25',
      local: 'Museu de Arte Moderna',
      orcamentoTotal: 120000,
      status: 'Confirmado',
      descricao: 'Jantar de gala com leilão beneficente para 200 convidados VIP.',
      fornecedoresIds: [3, 4, 5]
    }
  ]);
  
  // Funções de login/logout
  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('dashboard');
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsSidebarOpen(false);
  };
  
  // Funções para gerenciar fornecedores
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
  
  // Funções para gerenciar tipos de serviço
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
  
  // Funções para gerenciar eventos
  const handleAddEvento = (evento) => {
    // Adiciona o ID do usuário atual ao evento
    const newEvento = {
      ...evento,
      userId: user.id,
      id: Date.now()
    };
    setEventos([...eventos, newEvento]);
  };
  
  const handleUpdateEvento = (updatedEvento) => {
    setEventos(eventos.map(e => e.id === updatedEvento.id ? updatedEvento  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gestão de Usuários</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
        >
          <UserPlus size={18} className="mr-2" />
          Novo Usuário
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredFornecedores.map(fornecedor => (
          <div key={fornecedor.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-primary">{fornecedor.nome}</h3>
                  <p className="text-sm text-gray-500">{fornecedor.tipoServico}</p>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={16} 
                      fill={star <= (fornecedor.avaliacao || 0) ? "#FFD700" : "none"} 
                      stroke={star <= (fornecedor.avaliacao || 0) ? "#FFD700" : "#D1D5DB"}
                    />
                  ))}
                  <span className="ml-1 text-sm">
                    {fornecedor.avaliacao ? fornecedor.avaliacao.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p className="mb-1">
                  <span className="font-medium">Contato:</span> {fornecedor.contato}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Email:</span> {fornecedor.email}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Telefone:</span> {fornecedor.telefone}
                </p>
              </div>
              
              {reviews.filter(r => r.fornecedorId === fornecedor.id).length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Avaliações recentes</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {reviews
                      .filter(r => r.fornecedorId === fornecedor.id)
                      .map(review => (
                        <div key={review.id} className="text-sm border-l-2 border-gray-200 pl-3">
                          <div className="flex items-center">
                            <div className="font-medium">{review.autor}</div>
                            <div className="ml-auto flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  size={12} 
                                  fill={star <= review.avaliacao ? "#FFD700" : "none"} 
                                  stroke={star <= review.avaliacao ? "#FFD700" : "#D1D5DB"}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs mt-1">{review.comentario}</p>
                          <p className="text-gray-400 text-xs mt-1">{new Date(review.data).toLocaleDateString('pt-BR')}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedFornecedor(fornecedor)}
                  className="px-4 py-2 bg-primary text-white text-sm rounded hover:bg-opacity-90"
                >
                  Avaliar Fornecedor
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredFornecedores.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Nenhum fornecedor encontrado</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Fornecedores Mais Bem Avaliados</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={fornecedores
                .filter(f => f.avaliacao)
                .sort((a, b) => b.avaliacao - a.avaliacao)
                .slice(0, 5)
                .map(f => ({
                  nome: f.nome,
                  avaliacao: f.avaliacao
                }))}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis dataKey="nome" type="category" width={150} />
              <Tooltip formatter={(value) => [`${value}/5`, 'Avaliação']} />
              <Bar dataKey="avaliacao" fill="#010d36" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {selectedFornecedor && (
        <RatingModal 
          fornecedor={selectedFornecedor}
          onRate={handleRateSupplier}
          onClose={() => setSelectedFornecedor(null)}
        />
      )}
    </div>
  );
};
      
      {showAddForm && (
        <UserForm
          onSave={handleAddUser}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      {editingUser && (
        <UserForm
          user={editingUser}
          onSave={handleUpdateUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 flex flex-wrap gap-4 border-b">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todas as funções</option>
            <option value="admin">Administrador</option>
            <option value="manager">Gerente</option>
            <option value="user">Usuário</option>
          </select>
          
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos os planos</option>
            <option value="basic">Básico</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuário
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Função/Plano
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Cadastro
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-primary mr-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">{user.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                        {user.role === 'admin' ? 'Administrador' : 
                         user.role === 'manager' ? 'Gerente' : 'Usuário'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Plano {user.plan === 'premium' ? 'Premium' : 
                            user.plan === 'pro' ? 'Pro' : 'Básico'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                      user.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status === 'active' ? 'Ativo' : 
                       user.status === 'inactive' ? 'Inativo' : 'Suspenso'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.dateCreated).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-primary hover:text-primary-dark mr-3"
                    >
                      <Edit size={18} />
                    </button>
                    {user.id !== 1 && ( // Previne a exclusão do admin principal
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Estatísticas de Usuários</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
            <div className="text-blue-600 mb-2">Total de Usuários</div>
            <div className="text-2xl font-bold">{users.length}</div>
          </div>
          <div className="p-4 border rounded-lg bg-green-50 border-green-200">
            <div className="text-green-600 mb-2">Usuários Ativos</div>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
          </div>
          <div className="p-4 border rounded-lg bg-purple-50 border-purple-200">
            <div className="text-purple-600 mb-2">Planos Premium</div>
            <div className="text-2xl font-bold">{users.filter(u => u.plan === 'premium').length}</div>
          </div>
          <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
            <div className="text-orange-600 mb-2">Média de Eventos</div>
            <div className="text-2xl font-bold">4.2</div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Básico', usuarios: users.filter(u => u.plan === 'basic').length },
              { name: 'Pro', usuarios: users.filter(u => u.plan === 'pro').length },
              { name: 'Premium', usuarios: users.filter(u => u.plan === 'premium').length },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usuarios" name="Usuários" fill="#010d36" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Componente de Avaliação de Fornecedores (novo)
const AvaliacoesManager = ({ fornecedores, userRole, onUpdateFornecedor }) => {
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [sortBy, setSortBy] = useState('rating');
  const [search, setSearch] = useState('');
  const [tipoServicoFilter, setTipoServicoFilter] = useState('');
  
  // Obter tipos de serviço únicos
  const tiposServico = [...new Set(fornecedores.map(f => f.tipoServico))];
  
  // Filtrar e ordenar fornecedores
  const filteredFornecedores = fornecedores
    .filter(f => {
      let matches = true;
      if (search) {
        const searchLower = search.toLowerCase();
        matches = f.nome.toLowerCase().includes(searchLower) || 
                 f.tipoServico.toLowerCase().includes(searchLower);
      }
      if (tipoServicoFilter && matches) {
        matches = f.tipoServico === tipoServicoFilter;
      }
      return matches;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.avaliacao || 0) - (a.avaliacao || 0);
      } else if (sortBy === 'name') {
        return a.nome.localeCompare(b.nome);
      } else if (sortBy === 'service') {
        return a.tipoServico.localeCompare(b.tipoServico);
      }
      return 0;
    });
  
  // Reviews simulados
  const reviews = [
    { id: 1, fornecedorId: 1, autor: 'Carlos Silva', empresa: 'Eventos Silva', comentario: 'Excelente qualidade de som e atendimento profissional.', avaliacao: 5, data: '2025-01-10' },
    { id: 2, fornecedorId: 1, autor: 'Ana Rodrigues', empresa: 'AR Produções', comentario: 'Bom serviço, mas tivemos alguns problemas com atrasos.', avaliacao: 3, data: '2025-02-15' },
    { id: 3, fornecedorId: 2, autor: 'Roberto Mendes', empresa: 'RM Eventos', comentario: 'Iluminação impecável, atendeu todas as expectativas.', avaliacao: 5, data: '2025-01-05' },
    { id: 4, fornecedorId: 3, autor: 'Juliana Costa', empresa: 'JC Conferências', comentario: 'Comida excelente e serviço de primeira.', avaliacao: 5, data: '2025-02-20' }
  ];
  
  const handleRateSupplier = (fornecedor, rating) => {
    // Em uma aplicação real, isso enviaria a avaliação para o backend
    // e atualizaria o fornecedor com a média das avaliações
    const updatedFornecedor = {
      ...fornecedor,
      avaliacao: rating
    };
    onUpdateFornecedor(updatedFornecedor);
    setSelectedFornecedor(null);
  };
  
  const RatingModal = ({ fornecedor, onRate, onClose }) => {
    const [rating, setRating] = useState(fornecedor.avaliacao || 0);
    const [comment, setComment] = useState('');
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Avaliar Fornecedor</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          <div className="mb-4">
            <p className="font-medium text-lg">{fornecedor.nome}</p>
            <p className="text-gray-500">{fornecedor.tipoServico}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Sua avaliação</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    size={28} 
                    fill={star <= rating ? "#FFD700" : "none"} 
                    stroke={star <= rating ? "#FFD700" : "#D1D5DB"}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Comentário (opcional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Compartilhe sua experiência com este fornecedor..."
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={() => onRate(fornecedor, rating)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              disabled={rating === 0}
            >
              Enviar Avaliação
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Avaliações de Fornecedores</h2>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-2 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
            placeholder="Buscar fornecedores..."
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={tipoServicoFilter}
            onChange={(e) => setTipoServicoFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos os serviços</option>
            {tiposServico.map((servico, index) => (
              <option key={index} value={servico}>{servico}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="rating">Ordenar por Avaliação</option>
            <option value="name">Ordenar por Nome</option>
            <option value="service">Ordenar por Serviço</option>
          </select>
        </div>
      </div>import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, User, Users, Eye, LogOut, PlusCircle, Trash2, Edit, Filter, Search, 
  Calendar, PieChart, Settings, FileText, DollarSign, CheckCircle, AlertCircle,
  Home, CreditCard, Award, Building, Mail, Lock, UserPlus, Shield, Star, BarChart2,
  Database, Package, Coffee, Briefcase, X, Menu, Bell, HelpCircle, Clock
} from 'lucide-react';
import _ from 'lodash';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, PieChart as RePieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

// Estilos globais com as fontes da AFÁBRICA
const GlobalStyles = () => {
  return (
    <style jsx global>{`
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

// Componente de Gestão de Usuários (novo)
const UsuariosManager = ({ userRole }) => {
  const [users, setUsers] = useState([
    {id: 1, name: 'Admin Principal', email: 'admin@afabrica.com', role: 'admin', company: 'AFÁBRICA', plan: 'premium', status: 'active', dateCreated: '2025-01-15'},
    {id: 2, name: 'Gerente de Contas', email: 'gerente@afabrica.com', role: 'manager', company: 'AFÁBRICA', plan: 'premium', status: 'active', dateCreated: '2025-01-18'},
    {id: 3, name: 'Organizador Eventos ABC', email: 'org1@eventosabc.com', role: 'user', company: 'Eventos ABC', plan: 'pro', status: 'active', dateCreated: '2025-02-05'},
    {id: 4, name: 'Organizador Prime Eventos', email: 'prime@eventos.com', role: 'user', company: 'Prime Eventos', plan: 'basic', status: 'active', dateCreated: '2025-02-10'},
    {id: 5, name: 'Gerente Conferências', email: 'conferencias@acme.com', role: 'user', company: 'ACME Conferências', plan: 'premium', status: 'inactive', dateCreated: '2025-02-18'},
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filter, setFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  
  const filteredUsers = users.filter(user => {
    let matches = true;
    if (filter) {
      const searchStr = filter.toLowerCase();
      matches = user.name.toLowerCase().includes(searchStr) || 
                user.email.toLowerCase().includes(searchStr) ||
                user.company.toLowerCase().includes(searchStr);
    }
    if (roleFilter && matches) {
      matches = user.role === roleFilter;
    }
    if (planFilter && matches) {
      matches = user.plan === planFilter;
    }
    return matches;
  });
  
  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now(), dateCreated: new Date().toISOString().slice(0, 10) }]);
    setShowAddForm(false);
  };
  
  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  };
  
  const handleDeleteUser = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  
  const UserForm = ({ user, onSave, onCancel }) => {
    const [form, setForm] = useState({
      name: '',
      email: '',
      company: '',
      role: 'user',
      plan: 'basic',
      status: 'active',
      ...user
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(form);
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4">{user ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Empresa/Organização</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Função</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="user">Usuário</option>
                <option value="manager">Gerente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Plano</label>
              <select
                name="plan"
                value={form.plan}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="basic">Básico</option>
                <option value="pro">Pro</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="suspended">Suspenso</option>
              </select>
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
              {user ? 'Atualizar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    );
  };

// Componente de Login/Registro
const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [plan, setPlan] = useState('basic');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Em um cenário real, validaria credenciais com API
      if (email && password) {
        let role = 'user';
        if (email.includes('admin')) {
          role = 'admin';
        } else if (email.includes('manager')) {
          role = 'manager';
        }
        onLogin({ email, name: 'Usuário Teste', role, company: 'Empresa Teste', plan: 'premium' });
      }
    } else {
      // Em um cenário real, enviaria dados para API de registro
      if (email && password && name && company) {
        onLogin({ email, name, role: 'user', company, plan });
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
          <p className="text-lg">Plataforma de Gestão de Eventos</p>
        </div>
        
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`py-2 px-4 font-medium ${isLogin ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`py-2 px-4 font-medium ${!isLogin ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Cadastro
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required={!isLogin}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="company">
                  Empresa/Organização
                </label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required={!isLogin}
                />
              </div>
            </>
          )}
          
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
          </div>
          
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Plano
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`border rounded p-3 text-center cursor-pointer ${
                    plan === 'basic' ? 'border-primary bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setPlan('basic')}
                >
                  <div className="font-medium">Básico</div>
                  <div className="text-xs text-gray-500">Gratuito</div>
                </div>
                <div
                  className={`border rounded p-3 text-center cursor-pointer ${
                    plan === 'pro' ? 'border-primary bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setPlan('pro')}
                >
                  <div className="font-medium">Pro</div>
                  <div className="text-xs text-gray-500">R$99/mês</div>
                </div>
                <div
                  className={`border rounded p-3 text-center cursor-pointer ${
                    plan === 'premium' ? 'border-primary bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => setPlan('premium')}
                >
                  <div className="font-medium">Premium</div>
                  <div className="text-xs text-gray-500">R$199/mês</div>
                </div>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            {isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente de Cabeçalho
const Header = ({ user, onLogout, toggleSidebar, isSidebarOpen, notificationsCount = 2 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const notifications = [
    { id: 1, title: 'Novo fornecedor adicionado', message: 'Floricultura Primavera foi adicionado à base de fornecedores', time: '2 horas atrás' },
    { id: 2, title: 'Lembrete de evento', message: 'Evento "Workshop de Marketing" acontecerá em 2 dias', time: '5 horas atrás' }
  ];
  
  return (
    <header className="bg-primary text-secondary py-3 px-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 focus:outline-none lg:hidden"
          >
            {isSidebarOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
          
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-2">AFÁBRICA</h1>
            <span className="text-sm hidden sm:inline">Gestão de Eventos</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1 rounded-full hover:bg-white hover:bg-opacity-10 focus:outline-none relative"
            >
              <Bell size={20} />
              {notificationsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notificationsCount}
                </span>
              )}
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 text-primary">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium">Notificações</p>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div key={notification.id} className="px-4 py-2 hover:bg-gray-50 border-b border-gray-100">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="px-4 py-2 text-center">
                  <button className="text-sm text-primary hover:underline">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="hidden md:inline">{user.name}</span>
              <ChevronDown size={16} />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-3 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 capitalize">
                      {user.plan} plan
                    </span>
                    <span className="ml-2 text-xs text-gray-500 capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>
                
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="inline mr-2" />
                  Meu Perfil
                </a>
                
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="inline mr-2" />
                  Configurações
                </a>
                
                <a href="#billing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <CreditCard size={16} className="inline mr-2" />
                  Faturamento
                </a>
                
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                >
                  <LogOut size={16} className="inline mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Componente da Barra Lateral (Sidebar)
const Sidebar = ({ activeTab, setActiveTab, user, isSidebarOpen }) => {
  // Definição de tabs com controle de permissão
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} />, roles: ['admin', 'manager', 'user'] },
    { id: 'eventos', label: 'Meus Eventos', icon: <Calendar size={18} />, roles: ['admin', 'manager', 'user'] },
    { id: 'fornecedores', label: 'Fornecedores', icon: <Users size={18} />, roles: ['admin', 'manager', 'user'] },
    { id: 'servicos', label: 'Tipos de Serviço', icon: <Filter size={18} />, roles: ['admin', 'manager'] },
    { id: 'relatorios', label: 'Relatórios', icon: <FileText size={18} />, roles: ['admin', 'manager', 'user'] },
    { id: 'avaliacoes', label: 'Avaliações', icon: <Star size={18} />, roles: ['admin', 'manager', 'user'] },
    { id: 'usuarios', label: 'Usuários', icon: <User size={18} />, roles: ['admin'] },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} />, roles: ['admin', 'manager', 'user'] }
  ];
  
  // Filtrar tabs com base na role do usuário
  const filteredTabs = tabs.filter(tab => tab.roles.includes(user.role));
  
  return (
    <div className={`bg-primary text-white w-64 min-h-screen p-4 fixed lg:static transition-all duration-300 z-20 ${
      isSidebarOpen ? 'left-0' : '-left-64 lg:left-0'
    }`}>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-secondary">Menu</h2>
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
          </div>
        </div>
        
        <div className="mb-6 pb-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-primary mr-3">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.company}</p>
            </div>
          </div>
        </div>
        
        <ul>
          {filteredTabs.map((tab) => (
            <li key={tab.id} className="mb-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-2 rounded ${
                  activeTab === tab.id ? 'bg-secondary text-primary' : 'hover:bg-opacity-10 hover:bg-secondary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto">
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <h3 className="font-medium mb-2 text-sm">Precisa de ajuda?</h3>
          <p className="text-xs text-gray-300 mb-3">
            Acesse nossa central de suporte ou entre em contato com nossa equipe.
          </p>
          <button className="w-full py-2 bg-secondary text-primary text-sm rounded flex items-center justify-center">
            <HelpCircle size={16} className="mr-2" />
            Central de Ajuda
          </button>
        </div>
      </div>
    </div>
  );
};