import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, Search } from 'lucide-react';

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
                    R$ {fornecedor.valor?.toLocaleString('pt-BR')}
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

export default FornecedoresManager;