import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, DollarSign, Building, MapPin, AlertCircle } from 'lucide-react';
import AvaliacaoFornecedor from './AvaliacaoFornecedor';

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
    avaliacao: 0,
    ...fornecedor
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? parseFloat(value) || '' : value
    });
    
    // Limpar erro quando o campo é alterado
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };
  
  const handleAvaliacaoChange = (avaliacao) => {
    setForm({ ...form, avaliacao });
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!form.nome.trim()) {
      newErrors.nome = 'Nome da empresa é obrigatório';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!form.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }
    
    if (!form.tipoServico) {
      newErrors.tipoServico = 'Tipo de serviço é obrigatório';
    }
    
    if (!form.valor && form.valor !== 0) {
      newErrors.valor = 'Valor é obrigatório';
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
  
  // Formatar CNPJ
  const formatCNPJ = (value) => {
    if (!value) return '';
    
    // Remove caracteres não numéricos
    const cnpj = value.replace(/\D/g, '');
    
    // Aplica a máscara do CNPJ: XX.XXX.XXX/XXXX-XX
    return cnpj
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };
  
  // Formatar telefone
  const formatTelefone = (value) => {
    if (!value) return '';
    
    // Remove caracteres não numéricos
    const telefone = value.replace(/\D/g, '');
    
    // Aplica a máscara de telefone: (XX) XXXXX-XXXX
    if (telefone.length <= 10) {
      return telefone
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 14);
    } else {
      return telefone
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
    }
  };
  
  // Handlers para formatação
  const handleCNPJChange = (e) => {
    const formattedValue = formatCNPJ(e.target.value);
    setForm({ ...form, cnpj: formattedValue });
    
    if (errors.cnpj) {
      setErrors({ ...errors, cnpj: undefined });
    }
  };
  
  const handleTelefoneChange = (e) => {
    const formattedValue = formatTelefone(e.target.value);
    setForm({ ...form, telefone: formattedValue });
    
    if (errors.telefone) {
      setErrors({ ...errors, telefone: undefined });
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b text-primary">
        {fornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
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
        {/* Informações básicas */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Building className="mr-2" size={18} />
            Informações da Empresa
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="nome">
                Nome da Empresa *
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
                placeholder="Ex: SomPro Áudio"
              />
              {errors.nome && (
                <p className="mt-1 text-xs text-red-500">{errors.nome}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="cnpj">
                CNPJ
              </label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                value={form.cnpj}
                onChange={handleCNPJChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="00.000.000/0000-00"
                maxLength={18}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-10 p-2 border rounded-md ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="contato@empresa.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="telefone">
                Telefone *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Phone size={16} />
                </div>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleTelefoneChange}
                  className={`w-full pl-10 p-2 border rounded-md ${
                    errors.telefone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                />
              </div>
              {errors.telefone && (
                <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="contato">
                Nome do Contato
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  id="contato"
                  name="contato"
                  value={form.contato}
                  onChange={handleChange}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                  placeholder="Ex: João Silva"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="endereco">
                Endereço
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <MapPin size={16} />
                </div>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Av. Paulista, 1000, São Paulo - SP"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Informações de serviço */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Informações de Serviço</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="tipoServico">
                Tipo de Serviço *
              </label>
              <select
                id="tipoServico"
                name="tipoServico"
                value={form.tipoServico}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.tipoServico ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione um tipo de serviço</option>
                {servicos.map((servico) => (
                  <option key={servico.id} value={servico.nome}>
                    {servico.nome}
                  </option>
                ))}
              </select>
              {errors.tipoServico && (
                <p className="mt-1 text-xs text-red-500">{errors.tipoServico}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="valor">
                Valor Base (R$) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <DollarSign size={16} />
                </div>
                <input
                  type="number"
                  id="valor"
                  name="valor"
                  value={form.valor}
                  onChange={handleChange}
                  className={`w-full pl-10 p-2 border rounded-md ${
                    errors.valor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              {errors.valor && (
                <p className="mt-1 text-xs text-red-500">{errors.valor}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="statusPagamento">
                Status de Pagamento
              </label>
              <select
                id="statusPagamento"
                name="statusPagamento"
                value={form.statusPagamento}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pendente">Pendente</option>
                <option value="Parcial">Parcial</option>
                <option value="Pago">Pago</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Avaliação
              </label>
              <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
                <AvaliacaoFornecedor
                  fornecedorId={fornecedor?.id}
                  avaliacaoAtual={form.avaliacao}
                  onAvaliacaoChange={handleAvaliacaoChange}
                  readOnly={false}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Observações */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-1" htmlFor="observacoes">
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Adicione informações relevantes sobre este fornecedor..."
          ></textarea>
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
            {fornecedor ? 'Atualizar Fornecedor' : 'Criar Fornecedor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FornecedorForm;