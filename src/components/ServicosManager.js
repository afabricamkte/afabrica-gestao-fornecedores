import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

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
            {servicos && servicos.length > 0 ? (
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
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este tipo de serviço?')) {
                            onDeleteServico(servico.id);
                          }
                        }}
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

export default ServicosManager;