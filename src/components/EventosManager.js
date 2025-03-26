import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Search, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

// Componente Formulário de Evento
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
      [name]: name === 'orcamentoTotal' ? parseFloat(value) || '' : value 
    });
  };
  
  const handleFornecedorToggle = (id) => {
    const fornecedoresIds = form.fornecedoresIds || [];
    const newIds = fornecedoresIds.includes(id)
      ? fornecedoresIds.filter(fId => fId !== id)
      : [...fornecedoresIds, id];
    
    setForm({ ...form, fornecedoresIds: newIds });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-primary border-b pb-2">{evento ? 'Editar Evento' : 'Novo Evento'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Evento</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
                    checked={form.fornecedoresIds?.includes(fornecedor.id) || false}
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
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-all duration-300"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

// Componente principal de Gerenciamento de Eventos
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
            className="flex items-center bg-accent hover:bg-accent-light text-white hover:text-primary-dark px-4 py-2 rounded-lg transition-all duration-300 shadow-sm"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
                placeholder="Buscar eventos..."
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
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
            {filteredEventos && filteredEventos.length > 0 ? (
              filteredEventos.map((evento) => {
                const statusStyles = getEventoStatus(evento.status);
                const eventFornecedores = fornecedores.filter(f => 
                  evento.fornecedoresIds && evento.fornecedoresIds.includes(f.id)
                );
                
                return (
                  <div key={evento.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-primary">{evento.nome}</h3>
                        <span className={`px-3 py-1 rounded-full flex items-center text-xs font-medium ${statusStyles.color} shadow-sm`}>
                          {statusStyles.icon}
                          {evento.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        <p className="mb-1"><strong>Cliente:</strong> {evento.cliente}</p>
                        <p className="mb-1">
                          <strong>Data:</strong> {evento.dataInicio && new Date(evento.dataInicio).toLocaleDateString()} 
                          {evento.dataFim && evento.dataFim !== evento.dataInicio && 
                            ` - ${new Date(evento.dataFim).toLocaleDateString()}`}
                        </p>
                        <p className="mb-1"><strong>Local:</strong> {evento.local}</p>
                        <p className="mb-1">
                          <strong>Orçamento:</strong> R$ {evento.orcamentoTotal ? evento.orcamentoTotal.toLocaleString('pt-BR') : '0'}
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
                            className="text-accent hover:text-accent-light transition-colors duration-300"
                          >
                            <Edit size={18} />
                          </button>
                          {userRole === 'admin' && (
                            <button
                              onClick={() => {
                                if (window.confirm('Tem certeza que deseja excluir este evento?')) {
                                  onDeleteEvento(evento.id);
                                }
                              }}
                              className="text-danger hover:text-danger/70 transition-colors duration-300"
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

export default EventosManager;