import React, { useState } from 'react';

const ConfiguracoesManager = ({ userRole }) => {
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: 'smtp.afabrica.com.br',
    port: '587',
    username: 'sistema@afabrica.com.br',
    password: '********',
    useTLS: true
  });
  
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
  
  const [activeTab, setActiveTab] = useState('geral');
  
  const handleEmailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmailConfig({
      ...emailConfig,
      [name]: type === 'checkbox' ? checked : value
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
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Configurações</h2>
      
      <div className="mb-6">
        <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 mb-6 no-scrollbar">
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-all duration-300 ${
              activeTab === 'geral'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('geral')}
          >
            Gerais
          </button>
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-all duration-300 ${
              activeTab === 'notificacoes'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('notificacoes')}
          >
            Notificações
          </button>
          <button
            className={`py-3 px-4 font-medium border-b-2 transition-all duration-300 ${
              activeTab === 'personalizacao'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('personalizacao')}
          >
            Personalização
          </button>
          {userRole === 'admin' && (
            <button
              className={`py-3 px-4 font-medium border-b-2 transition-all duration-300 ${
                activeTab === 'sistema'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('sistema')}
            >
              Sistema
            </button>
          )}
        </div>
      </div>
      
      {activeTab === 'geral' && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Configurações Gerais</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Idioma</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
              >
                <option>Português (Brasil)</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fuso Horário</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
              >
                <option>Brasília (GMT-3)</option>
                <option>São Paulo (GMT-3)</option>
                <option>UTC (GMT+0)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Formato de Data</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
              >
                <option>DD/MM/AAAA</option>
                <option>MM/DD/AAAA</option>
                <option>AAAA-MM-DD</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-all duration-300">
              Salvar Configurações
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'notificacoes' && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Notificações</h3>
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
          
          <div className="mt-6">
            <h4 className="text-md font-medium mb-2 text-primary">Método de Entrega</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={true}
                  className="mr-2"
                />
                <span>Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={true}
                  className="mr-2"
                />
                <span>Dentro da plataforma</span>
              </label>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-all duration-300">
              Salvar Preferências
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'personalizacao' && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Personalização</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Modo de Exibição</label>
              <select 
                name="modo"
                value={tema.modo}
                onChange={handleTemaChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
              >
                <option value="claro">Claro</option>
                <option value="escuro">Escuro</option>
                <option value="automatico">Automático (segue o sistema)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cor Principal</label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="corPrincipal"
                  value={tema.corPrincipal}
                  onChange={handleTemaChange}
                  className="mr-2 w-10 h-10 border border-gray-300 rounded"
                />
                <input 
                  type="text"
                  name="corPrincipal"
                  value={tema.corPrincipal} 
                  onChange={handleTemaChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
                  className="mr-2 w-10 h-10 border border-gray-300 rounded"
                />
                <input 
                  type="text"
                  name="corSecundaria"
                  value={tema.corSecundaria} 
                  onChange={handleTemaChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cor de Fundo</label>
              <div className="flex items-center">
                <input
                  type="color"
                  name="corTerciaria"
                  value={tema.corTerciaria}
                  onChange={handleTemaChange}
                  className="mr-2 w-10 h-10 border border-gray-300 rounded"
                />
                <input 
                  type="text"
                  name="corTerciaria"
                  value={tema.corTerciaria} 
                  onChange={handleTemaChange}
                  className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-all duration-300">
              Salvar Tema
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'sistema' && userRole === 'admin' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Configurações de Email</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Servidor SMTP</label>
                <input
                  type="text"
                  name="smtpServer"
                  value={emailConfig.smtpServer}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Porta</label>
                <input
                  type="text"
                  name="port"
                  value={emailConfig.port}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Usuário</label>
                <input
                  type="text"
                  name="username"
                  value={emailConfig.username}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  name="password"
                  value={emailConfig.password}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
              
              <div className="col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="useTLS"
                    checked={emailConfig.useTLS}
                    onChange={handleEmailChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Usar TLS/SSL</span>
                </label>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-all duration-300">
                Salvar Configurações
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-primary border-b pb-2">Configurações Avançadas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Limite de Itens por Página</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Política de Backup</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all">
                  <option>Diário</option>
                  <option>Semanal</option>
                  <option>Mensal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tempo de Sessão (minutos)</label>
                <input
                  type="number"
                  min="5"
                  value="30"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={false}
                    className="mr-2"
                  />
                  <span>Modo de Manutenção</span>
                </label>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Quando ativado, somente administradores poderão acessar o sistema
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-all duration-300">
                Salvar Configurações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracoesManager;