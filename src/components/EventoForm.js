import React, { useState, useEffect } from 'react';
import { CalendarClock, DollarSign, MapPin, Users, FileText, AlertCircle } from 'lucide-react';

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
  
  const [errors, setErrors] = useState({});
  const [selectedFornecedores, setSelectedFornecedores] = useState([]);
  const [categoriasFornecedores, setCategoriasFornecedores] = useState({});
  
  // Agrupar fornecedores por categoria
  useEffect(() => {
    if (fornecedores && fornecedores.length > 0) {
      const categorias = {};
      fornecedores.forEach(fornecedor => {
        if (!categorias[fornecedor.tipoServico]) {
          categorias[fornecedor.tipoServico] = [];
        }
        categorias[fornecedor.tipoServico].push(fornecedor);
      });
      setCategoriasFornecedores(categorias);
    }
  }, [fornecedores]);
  
  // Inicializar fornecedores selecionados ao editar evento
  useEffect(() => {
    if (evento && evento.fornecedoresIds && fornecedores) {
      setSelectedFornecedores(
        fornecedores.filter(f => evento.fornecedoresIds.includes(f.id))
      );
    }
  }, [evento, fornecedores]);
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || '' : value
    }));
    
    // Limpar erro quando o campo é alterado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleFornecedorToggle = (fornecedor) => {
    const isSelected = form.fornecedoresIds?.includes(fornecedor.id);
    let updatedIds;
    let updatedSelected;
    
    if (isSelected) {
      updatedIds = form.fornecedoresIds.filter(id => id !== fornecedor.id);
      updatedSelected = selectedFornecedores.filter(f => f.id !== fornecedor.id);
    } else {
      updatedIds = [...(form.fornecedoresIds || []), fornecedor.id];
      updatedSelected = [...selectedFornecedores, fornecedor];
    }
    
    setForm(prev => ({ ...prev, fornecedoresIds: updatedIds }));
    setSelectedFornecedores(updatedSelected);
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!form.nome.trim()) {
      newErrors.nome = 'Nome do evento é obrigatório';
    }
    
    if (!form.cliente.trim()) {
      newErrors.cliente = 'Nome do cliente é obrigatório';
    }
    
    if (!form.dataInicio) {
      newErrors.dataInicio = 'Data de início é obrigatória';
    }
    
    if (form.dataFim && new Date(form.dataFim) < new Date(form.dataInicio)) {
      newErrors.dataFim = 'Data de término deve ser após a data de início';
    }
    
    if (!form.local.trim()) {
      newErrors.local = 'Local do evento é obrigatório';
    }
    
    if (!form.orcamentoTotal && form.orcamentoTotal !== 0) {
      newErrors.orcamentoTotal = 'Orçamento é obrigatório';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    onSave(form);
  };
  
  // Calcular total dos fornecedores selecionados
  const getTotalFornecedores = () => {
    return selectedFornecedores.reduce((total, f) => total + (f.valor || 0), 0);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-primary">
        {evento ? 'Editar Evento' : 'Novo Evento'}
      </h2>
      
      {/* Alertas de validação */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium">
                Corrija os seguintes erros antes de prosseguir:
              </h3>
              <ul className="mt-2 text-sm list-disc list-inside">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Detalhes básicos */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <FileText className="mr-2" size={18} />
            Informações Básicas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="nome">
                Nome do Evento *
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Conferência Anual 2025"
              />
              {errors.nome && (
                <p className="mt-1 text-xs text-red-500">{errors.nome}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cliente">
                Cliente *
              </label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.cliente ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Empresa ABC"
              />
              {errors.cliente && (
                <p className="mt-1 text-xs text-red-500">{errors.cliente}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Proposta enviada">Proposta enviada</option>
                <option value="Em planejamento">Em planejamento</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Em execução">Em execução</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="orcamentoTotal">
                Orçamento Total (R$) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <DollarSign size={16} />
                </div>
                <input
                  type="number"
                  id="orcamentoTotal"
                  name="orcamentoTotal"
                  value={form.orcamentoTotal}
                  onChange={handleChange}
                  className={`w-full pl-10 p-2 border rounded-md ${
                    errors.orcamentoTotal ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.orcamentoTotal && (
                <p className="mt-1 text-xs text-red-500">{errors.orcamentoTotal}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Datas e Local */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CalendarClock className="mr-2" size={18} />
            Data e Local
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dataInicio">
                Data de Início *
              </label>
              <input
                type="date"
                id="dataInicio"
                name="dataInicio"
                value={form.dataInicio}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.dataInicio ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dataInicio && (
                <p className="mt-1 text-xs text-red-500">{errors.dataInicio}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dataFim">
                Data de Término
              </label>
              <input
                type="date"
                id="dataFim"
                name="dataFim"
                value={form.dataFim}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.dataFim ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dataFim && (
                <p className="mt-1 text-xs text-red-500">{errors.dataFim}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="local">
                Local *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <MapPin size={16} />
                </div>
                <input
                  type="text"
                  id="local"
                  name="local"
                  value={form.local}
                  onChange={handleChange}
                  className={`w-full pl-10 p-2 border rounded-md ${
                    errors.local ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Centro de Convenções"
                />
              </div>
              {errors.local && (
                <p className="mt-1 text-xs text-red-500">{errors.local}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Descrição */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-1" htmlFor="descricao">
            Descrição
          </label>
          <textarea
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Descreva os detalhes do evento..."
          ></textarea>
        </div>
        
        {/* Fornecedores */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Users className="mr-2" size={18} />
            Fornecedores
            {selectedFornecedores.length > 0 && (
              <span className="ml-2 bg-accent text-white text-xs rounded-full px-2 py-1">
                {selectedFornecedores.length} selecionados
              </span>
            )}
          </h3>
          
          {/* Resumo de fornecedores selecionados */}
          {selectedFornecedores.length > 0 && (
            <div className="mb-4 p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Fornecedores Selecionados</h4>
                <span className="text-sm">
                  Total: R$ {getTotalFornecedores().toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="space-y-2">
                {selectedFornecedores.map(f => (
                  <div key={f.id} className="flex justify-between items-center bg-white p-2 rounded border">
                    <div>
                      <span className="font-medium">{f.nome}</span>
                      <span className="text-sm text-gray-500 ml-2">({f.tipoServico})</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-4">
                        R$ {f.valor?.toLocaleString('pt-BR')}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleFornecedorToggle(f)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="border rounded-md">
            <div className="bg-gray-50 p-4 rounded-t-md border-b">
              <h4 className="font-medium">Adicionar Fornecedores ao Evento</h4>
              <p className="text-sm text-gray-500">
                Selecione os fornecedores que participarão deste evento
              </p>
            </div>
            
            <div className="p-4 max-h-60 overflow-y-auto">
              {Object.keys(categoriasFornecedores).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(categoriasFornecedores).map(([categoria, fornecedoresCategoria]) => (
                    <div key={categoria}>
                      <h5 className="font-medium mb-2">{categoria}</h5>
                      <div className="space-y-2">
                        {fornecedoresCategoria.map(fornecedor => (
                          <div 
                            key={fornecedor.id}
                            className={`flex justify-between items-center p-2 rounded border cursor-pointer ${
                              form.fornecedoresIds?.includes(fornecedor.id)
                                ? 'bg-primary-light/20 border-primary'
                                : 'bg-white hover:bg-gray-50'
                            }`}
                            onClick={() => handleFornecedorToggle(fornecedor)}
                          >
                            <div>
                              <div className="font-medium">{fornecedor.nome}</div>
                              <div className="text-xs text-gray-500">
                                {fornecedor.telefone} • {fornecedor.email}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                R$ {fornecedor.valor?.toLocaleString('pt-BR')}
                              </div>
                              <div className="text-xs text-gray-500">
                                {form.fornecedoresIds?.includes(fornecedor.id) ? 'Selecionado' : 'Clique para selecionar'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">
                  Nenhum fornecedor cadastrado
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Ações */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
          >
            {evento ? 'Atualizar Evento' : 'Criar Evento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventoForm;