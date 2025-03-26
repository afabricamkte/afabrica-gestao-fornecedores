import React, { useState, useEffect } from 'react';
import { ChevronDown, User, Users, Eye, LogOut, PlusCircle, Trash2, Edit, Filter, Search, 
         Calendar, PieChart, Settings, FileText, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import _ from 'lodash';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         BarChart, Bar, PieChart as RePieChart, Pie, Cell } from 'recharts';

// Função para criar estilo global com as fontes da AFÁBRICA
const GlobalStyles = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&display=swap');
      
      :root {
        --primary: #010d36;
        --secondary: #dfd7c0;
        --tertiary: #fef9ef;
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

// Componente de Login
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Em um cenário real, validaria credenciais com API
    if (email && password) {
      let role = 'viewer';
      if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('colab')) {
        role = 'collaborator';
      }
      onLogin({ email, role });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tertiary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
          <p className="text-lg">Sistema de Gestão de Fornecedores</p>
        </div>
        
        <form onSubmit={handleSubmit}>
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
          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente de Cabeçalho
const Header = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="bg-primary text-secondary py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">AFÁBRICA</h1>
          <span className="text-sm">Gestão de Fornecedores</span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span>{user.email}</span>
            <ChevronDown size={16} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <p className="font-medium">{user.email}</p>
                <p className="text-xs capitalize">{user.role}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Componente da Barra Lateral
const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Eye size={18} /> },
    { id: 'fornecedores', label: 'Fornecedores', icon: <Users size={18} /> },
    { id: 'servicos', label: 'Tipos de Serviço', icon: <Filter size={18} /> },
    { id: 'eventos', label: 'Eventos', icon: <Calendar size={18} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <FileText size={18} /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> }
  ];
  
  return (
    <div className="bg-primary text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-secondary">Menu</h2>
        <ul>
          {tabs.map((tab) => (
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
    </div>
  );
};

// Componente Dashboard
const Dashboard = ({ fornecedores, servicos }) => {
  // Cálculos para o dashboard
  const totalFornecedores = fornecedores.length;
  const totalServicos = servicos.length;
  const fornecedoresPorServico = _.groupBy(fornecedores, 'tipoServico');
  
  // Total financeiro comprometido com fornecedores
  const totalCompromisso = fornecedores.reduce((sum, item) => sum + (item.valor || 0), 0);
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Fornecedores</h3>
          <p className="text-3xl font-bold">{totalFornecedores}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Tipos de Serviço</h3>
          <p className="text-3xl font-bold">{totalServicos}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Total Comprometido</h3>
          <p className="text-3xl font-bold">R$ {totalCompromisso.toLocaleString('pt-BR')}</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-xl font-bold mb-4">Fornecedores por Tipo de Serviço</h3>
        <div className="space-y-4">
          {Object.keys(fornecedoresPorServico).map((servico) => (
            <div key={servico} className="flex items-center">
              <div className="w-1/4 font-medium">{servico}</div>
              <div className="w-3/4">
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
  );
};

// Componente Formulário Fornecedor
const FornecedorForm = ({ fornecedor, servicos, onSave, onCancel }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoServico: '',
    valor: '',
    statusPagamento: 'Pendente',
    observacoes: '',
    contato: '',
    cnpj: '',
    endereco: '',
    avaliacao: 5,
    ...fornecedor
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'valor' ? parseFloat(value) || '' : value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">{fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome da Empresa</label>
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
            <label className="block text-sm font-medium mb-1">CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="00.000.000/0000-00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Contato</label>
            <input
              type="text"
              name="contato"
              value={form.contato}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
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
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Endereço</label>
            <input
              type="text"
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Serviço</label>
            <select
              name="tipoServico"
              value={form.tipoServico}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Selecione...</option>
              {servicos.map((servico) => (
                <option key={servico.id} value={servico.nome}>
                  {servico.nome}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Valor Base (R$)</label>
            <input
              type="number"
              name="valor"
              value={form.valor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status de Pagamento</label>
            <select
              name="statusPagamento"
              value={form.statusPagamento}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="Pendente">Pendente</option>
              <option value="Parcial">Parcial</option>
              <option value="Pago">Pago</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Avaliação (1-5)</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, avaliacao: star })}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      star <= form.avaliacao ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Observações</label>
          <textarea
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          ></textarea>
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

// Componente Lista de Fornecedores
const FornecedoresList = ({ fornecedores, servicos, userRole, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [filteredFornecedores, setFilteredFornecedores] = useState(fornecedores);
  const [selectedServico, setSelectedServico] = useState('');
  
  useEffect(() => {
    let filtered = fornecedores;
    
    if (search) {
      filtered = filtered.filter(f => 
        f.nome.toLowerCase().includes(search.toLowerCase()) ||
        f.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (selectedServico) {
      filtered = filtered.filter(f => f.tipoServico === selectedServico);
    }
    
    setFilteredFornecedores(filtered);
  }, [fornecedores, search, selectedServico]);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 space-y-2 md:space-y-0">
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
        
        <div className="flex space-x-2">
          <select
            value={selectedServico}
            onChange={(e) => setSelectedServico(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Todos os serviços</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.nome}>
                {servico.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Serviço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {(userRole === 'admin' || userRole === 'collaborator') && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFornecedores.length > 0 ? (
              filteredFornecedores.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{fornecedor.nome}</div>
                    <div className="text-sm text-gray-500">{fornecedor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {fornecedor.tipoServico}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    R$ {fornecedor.valor.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        fornecedor.statusPagamento === 'Pago'
                          ? 'bg-green-100 text-green-800'
                          : fornecedor.statusPagamento === 'Parcial'
                          ? 'bg-yellow-100 text-yellow-800'
                          : fornecedor.statusPagamento === 'Cancelado'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {fornecedor.statusPagamento}
                    </span>
                  </td>
                  {(userRole === 'admin' || userRole === 'collaborator') && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onEdit(fornecedor)}
                        className="text-primary hover:text-primary-dark mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      {userRole === 'admin' && (
                        <button
                          onClick={() => onDelete(fornecedor.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={(userRole === 'admin' || userRole === 'collaborator') ? 5 : 4}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Nenhum fornecedor encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente Gerenciamento de Fornecedores
const FornecedoresManager = ({ fornecedores, servicos, userRole, onAddFornecedor, onUpdateFornecedor, onDeleteFornecedor }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingFornecedor, setEditingFornecedor] = useState(null);
  
  const handleEdit = (fornecedor) => {
    setEditingFornecedor(fornecedor);
    setShowForm(true);
  };
  
  const handleSave = (fornecedor) => {
    if (editingFornecedor) {
      onUpdateFornecedor({ ...fornecedor, id: editingFornecedor.id });
    } else {
      onAddFornecedor({ ...fornecedor, id: Date.now() });
    }
    setShowForm(false);
    setEditingFornecedor(null);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingFornecedor(null);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Fornecedores</h2>
        {(userRole === 'admin' || userRole === 'collaborator') && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            <PlusCircle size={18} className="mr-2" />
            Novo Fornecedor
          </button>
        )}
      </div>
      
      {showForm ? (
        <FornecedorForm
          fornecedor={editingFornecedor}
          servicos={servicos}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <FornecedoresList
          fornecedores={fornecedores}
          servicos={servicos}
          userRole={userRole}
          onEdit={handleEdit}
          onDelete={onDeleteFornecedor}
        />
      )}
    </div>
  );
};

// Componente de Gerenciamento de Serviços
const ServicosManager = ({ servicos, userRole, onAddServico, onUpdateServico, onDeleteServico }) => {
  const [novoServico, setNovoServico] = useState('');
  const [editingServico, setEditingServico] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingServico) {
      onUpdateServico({ id: editingServico.id, nome: novoServico });
      setEditingServico(null);
    } else {
      onAddServico({ id: Date.now(), nome: novoServico });
    }
    setNovoServico('');
  };
  
  const handleEdit = (servico) => {
    setEditingServico(servico);
    setNovoServico(servico.nome);
  };
  
  const handleCancel = () => {
    setEditingServico(null);
    setNovoServico('');
  };
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Tipos de Serviço</h2>
      
      {(userRole === 'admin' || userRole === 'collaborator') && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={novoServico}
              onChange={(e) => setNovoServico(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l"
              placeholder="Nome do serviço"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r hover:bg-opacity-90"
            >
              {editingServico ? 'Atualizar' : 'Adicionar'}
            </button>
            {editingServico && (
              <button
                type="button"
                onClick={handleCancel}
                className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome do Serviço
              </th>
              {userRole === 'admin' && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {servicos.length > 0 ? (
              servicos.map((servico) => (
                <tr key={servico.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{servico.nome}</div>
                  </td>
                  {userRole === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(servico)}
                        className="text-primary hover:text-primary-dark mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDeleteServico(servico.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={userRole === 'admin' ? 2 : 1}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Nenhum tipo de serviço encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

  // Componente para gestão de eventos
const EventosManager = ({ eventos, fornecedores, userRole, onAddEvento, onUpdateEvento, onDeleteEvento }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [filteredEventos, setFilteredEventos] = useState(eventos);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    let filtered = eventos;
    
    if (search) {
      filtered = filtered.filter(e => 
        e.nome.toLowerCase().includes(search.toLowerCase()) ||
        e.cliente.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    setFilteredEventos(filtered);
  }, [eventos, search, statusFilter]);
  
  const handleEdit = (evento) => {
    setEditingEvento(evento);
    setShowForm(true);
  };
  
  const handleSave = (evento) => {
    if (editingEvento) {
      onUpdateEvento({ ...evento, id: editingEvento.id });
    } else {
      onAddEvento({ ...evento, id: Date.now() });
    }
    setShowForm(false);
    setEditingEvento(null);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingEvento(null);
  };
  
  const EventoForm = ({ evento, fornecedores, onSave, onCancel }) => {
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
      ...evento
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
      const newIds = form.fornecedoresIds.includes(id)
        ? form.fornecedoresIds.filter(fId => fId !== id)
        : [...form.fornecedoresIds, id];
      
      setForm({ ...form, fornecedoresIds: newIds });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(form);
    };
    
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">{evento ? 'Editar Evento' : 'Novo Evento'}</h2>
        
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
  
  const getEventoStatus = (status) => {
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
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Eventos</h2>
        {(userRole === 'admin' || userRole === 'collaborator') && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            <PlusCircle size={18} className="mr-2" />
            Novo Evento
          </button>
        )}
      </div>
      
      {showForm ? (
        <EventoForm
          evento={editingEvento}
          fornecedores={fornecedores}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-2 md:space-y-0">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
                placeholder="Buscar eventos..."
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="">Todos os status</option>
              <option value="Proposta enviada">Proposta enviada</option>
              <option value="Em planejamento">Em planejamento</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Em execução">Em execução</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEventos.length > 0 ? (
              filteredEventos.map((evento) => {
                const statusStyles = getEventoStatus(evento.status);
                const eventFornecedores = fornecedores.filter(f => 
                  evento.fornecedoresIds.includes(f.id)
                );
                
                return (
                  <div key={evento.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-primary">{evento.nome}</h3>
                        <span className={`px-3 py-1 rounded-full flex items-center text-xs ${statusStyles.color}`}>
                          {statusStyles.icon}
                          {evento.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        <p className="mb-1"><strong>Cliente:</strong> {evento.cliente}</p>
                        <p className="mb-1">
                          <strong>Data:</strong> {new Date(evento.dataInicio).toLocaleDateString()} 
                          {evento.dataFim !== evento.dataInicio && 
                            ` - ${new Date(evento.dataFim).toLocaleDateString()}`}
                        </p>
                        <p className="mb-1"><strong>Local:</strong> {evento.local}</p>
                        <p className="mb-1">
                          <strong>Orçamento:</strong> R$ {evento.orcamentoTotal.toLocaleString('pt-BR')}
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
                      
                      {(userRole === 'admin' || userRole === 'collaborator') && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(evento)}
                            className="text-primary hover:text-primary-dark"
                          >
                            <Edit size={18} />
                          </button>
                          {userRole === 'admin' && (
                            <button
                              onClick={() => onDeleteEvento(evento.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">Nenhum evento encontrado</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Componente para Relatórios e Análises
const RelatoriosManager = ({ fornecedores, eventos, servicos }) => {
  const [selectedReport, setSelectedReport] = useState('fornecedores');
  
  // Dados para gráfico de fornecedores por serviço
  const fornecedoresPorServico = _.groupBy(fornecedores, 'tipoServico');
  const dataServicos = Object.keys(fornecedoresPorServico).map(servico => ({
    name: servico,
    value: fornecedoresPorServico[servico].length
  }));
  
  // Dados para gastos por evento
  const dataEventos = eventos.map(evento => ({
    name: evento.nome,
    valor: evento.orcamentoTotal
  }));
  
  // Dados para status de pagamento
  const pagamentosStatus = _.groupBy(fornecedores, 'statusPagamento');
  const dataPagamentos = Object.keys(pagamentosStatus).map(status => ({
    name: status,
    value: pagamentosStatus[status].length
  }));
  
  // Cores para gráficos
  const COLORS = ['#010d36', '#1e40af', '#3b82f6', '#93c5fd', '#dfd7c0', '#d1d5db'];
  
  // Total de orçamento comprometido
  const totalOrcamento = eventos.reduce((sum, e) => sum + e.orcamentoTotal, 0);
  
  // Totais por status de evento
  const eventosPorStatus = _.groupBy(eventos, 'status');
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Relatórios e Análises</h2>
      
      <div className="mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium border-b-2 ${
              selectedReport === 'fornecedores'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedReport('fornecedores')}
          >
            Fornecedores
          </button>
          <button
            className={`py-2 px-4 font-medium border-b-2 ${
              selectedReport === 'eventos'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedReport('eventos')}
          >
            Eventos
          </button>
          <button
            className={`py-2 px-4 font-medium border-b-2 ${
              selectedReport === 'financeiro'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedReport('financeiro')}
          >
            Financeiro
          </button>
        </div>
      </div>
      
      {selectedReport === 'fornecedores' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Total de Fornecedores</h3>
              <p className="text-3xl font-bold">{fornecedores.length}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Valor Médio</h3>
              <p className="text-3xl font-bold">
                R$ {(fornecedores.reduce((sum, f) => sum + f.valor, 0) / fornecedores.length || 0).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Avaliação Média</h3>
              <div className="flex items-center">
                <p className="text-3xl font-bold mr-2">
                  {(fornecedores.reduce((sum, f) => sum + (f.avaliacao || 0), 0) / fornecedores.length || 0).toFixed(1)}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Fornecedores por Tipo de Serviço</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataServicos}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {dataServicos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} fornecedores`, 'Quantidade']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Status de Pagamento</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataPagamentos}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#010d36" name="Fornecedores" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedReport === 'eventos' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Total de Eventos</h3>
              <p className="text-3xl font-bold">{eventos.length}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Orçamento Total</h3>
              <p className="text-3xl font-bold">
                R$ {totalOrcamento.toLocaleString('pt-BR')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Orçamento Médio</h3>
              <p className="text-3xl font-bold">
                R$ {(totalOrcamento / eventos.length || 0).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Eventos por Status</h3>
              <div className="space-y-4">
                {Object.keys(eventosPorStatus).map((status) => (
                  <div key={status} className="flex items-center">
                    <div className="w-1/3 font-medium">{status}</div>
                    <div className="w-2/3">
                      <div className="bg-gray-200 rounded-full h-4 w-full">
                        <div 
                          className="bg-primary rounded-full h-4" 
                          style={{ width: `${(eventosPorStatus[status].length / eventos.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-sm mt-1">{eventosPorStatus[status].length} eventos</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Orçamento por Evento</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataEventos}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Orçamento']} />
                    <Bar dataKey="valor" fill="#dfd7c0" name="Orçamento" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedReport === 'financeiro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Orçamento Total</h3>
              <p className="text-3xl font-bold text-green-600">
                R$ {totalOrcamento.toLocaleString('pt-BR')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Custos com Fornecedores</h3>
              <p className="text-3xl font-bold text-red-600">
                R$ {fornecedores.reduce((sum, f) => sum + f.valor, 0).toLocaleString('pt-BR')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Margem Estimada</h3>
              <p className="text-3xl font-bold">
                R$ {(totalOrcamento - fornecedores.reduce((sum, f) => sum + f.valor, 0)).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Análise Financeira por Mês</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { mes: 'Jan', receita: 35000, custo: 27000, margem: 8000 },
                    { mes: 'Fev', receita: 42000, custo: 29000, margem: 13000 },
                    { mes: 'Mar', receita: 28000, custo: 22000, margem: 6000 },
                    { mes: 'Abr', receita: 85000, custo: 68000, margem: 17000 },
                    { mes: 'Mai', receita: 42000, custo: 33000, margem: 9000 },
                    { mes: 'Jun', receita: 28500, custo: 21000, margem: 7500 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                    <Legend />
                    <Line type="monotone" dataKey="receita" stroke="#010d36" strokeWidth={2} name="Receita" />
                    <Line type="monotone" dataKey="custo" stroke="#ef4444" strokeWidth={2} name="Custo" />
                    <Line type="monotone" dataKey="margem" stroke="#10b981" strokeWidth={2} name="Margem" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para Configurações
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
      
      <div className="space-y-8">
        {userRole === 'admin' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Configurações de Email</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Servidor SMTP</label>
                <input
                  type="text"
                  name="smtpServer"
                  value={emailConfig.smtpServer}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Porta</label>
                <input
                  type="text"
                  name="port"
                  value={emailConfig.port}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Usuário</label>
                <input
                  type="text"
                  name="username"
                  value={emailConfig.username}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  name="password"
                  value={emailConfig.password}
                  onChange={handleEmailChange}
                  className="w-full p-2 border border-gray-300 rounded"
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
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        )}
        
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
      </div>
    </div>
  );
};


  // Componente principal da aplicação
const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
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
  
  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  const handleLogout = () => {
    setUser(null);
  };
  
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <GlobalStyles />
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 bg-tertiary">
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
        </main>
      </div>
    </div>
  );
};

export default App;