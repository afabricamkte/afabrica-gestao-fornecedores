import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle } from 'lucide-react';

const ServicoForm = ({ servico, onSave, onCancel }) => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    ...servico
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o campo é alterado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!form.nome.trim()) {
      newErrors.nome = 'Nome do serviço é obrigatório';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSave(form);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">
        {servico ? 'Editar Tipo de Serviço' : 'Novo Tipo de Serviço'}
      </h2>
      
      {/* Alertas de validação */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <ul className="list-disc list-inside text-sm">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="nome">
              Nome do Serviço *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                <FileText size={16} />
              </div>
              <input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className={`w-full pl-10 p-2 border rounded-md ${
                  errors.nome ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Sonorização"
              />
            </div>
            {errors.nome && (
              <p className="mt-1 text-xs text-red-500">{errors.nome}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Descreva brevemente o tipo de serviço..."
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
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
            {servico ? 'Atualizar Serviço' : 'Criar Serviço'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicoForm;