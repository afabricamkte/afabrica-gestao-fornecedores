import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, FileText, BarChart2, Calendar, DollarSign } from 'lucide-react';
import AvaliacaoFornecedor from './AvaliacaoFornecedor';
import FornecedorService from '../services/FornecedorService';
import GraficoEvento from './GraficoEvento';

const FornecedorDetails = ({ fornecedorId, onClose }) => {
  const [fornecedor, setFornecedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  
  useEffect(() => {
    const fetchFornecedor = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await FornecedorService.getFornecedorById(fornecedorId);
        setFornecedor(data);
      } catch (err) {
        console.error('Erro ao carregar fornecedor:', err);
        setError('Não foi possível carregar os detalhes do fornecedor.');
      } finally {
        setLoading(false);
      }
    };
    
    if (fornecedorId) {
      fetchFornecedor();
    }
  }, [fornecedorId]);
  
  const handleAvaliacaoChange = (novaAvaliacao) => {
    setFornecedor({
      ...fornecedor,
      avaliacao: novaAvaliacao
    });
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !fornecedor) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-red-600 mb-2">Erro</h3>
          <p className="text-gray-500">{error || 'Fornecedor não encontrado'}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }
  
  // Preparar dados para gráficos
  const historicoData = fornecedor.historico
    ? [...fornecedor.historico].sort((a, b) => new Date(a.data) - new Date(b.data))
    : [];
  
  // Calculando valor total e médio
  const valorTotal = historicoData.reduce((total, item) => total + item.valor, 0);
  const valorMedio = historicoData.length > 0 ? valorTotal / historicoData.length : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="bg-primary text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{fornecedor.nome}</h2>
            <p className="text-secondary">{fornecedor.tipoServico}</p>
          </div>
          <div className="bg-white/10 p-2 rounded">
            <div className="flex items-center">
              <span className="text-white mr-2">Avaliação:</span>
              <AvaliacaoFornecedor
                fornecedorId={fornecedor.id}
                avaliacaoAtual={fornecedor.avaliacao}
                onAvaliacaoChange={handleAvaliacaoChange}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Navegação de abas */}
      <div className="border-b">
        <nav className="flex">
          <button
            className={`px-4 py-3 font-medium border-b-2 ${
              activeTab === 'info'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Informações
          </button>
          <button
            className={`px-4 py-3 font-medium border-b-2 ${
              activeTab === 'historico'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('historico')}
          >
            Histórico de Eventos
          </button>
          <button
            className={`px-4 py-3 font-medium border-b-2 ${
              activeTab === 'estatisticas'
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('estatisticas')}
          >
            Estatísticas
          </button>
        </nav>
      </div>
      
      {/* Conteúdo das abas */}
      <div className="p-6">
        {/* Informações do Fornecedor */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-gray-900">{fornecedor.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Telefone</h3>
                    <p className="text-gray-900">{fornecedor.telefone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <DollarSign className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Valor Base</h3>
                    <p className="text-gray-900">R$ {fornecedor.valor?.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">CNPJ</h3>
                    <p className="text-gray-900">{fornecedor.cnpj}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                    <p className="text-gray-900">{fornecedor.endereco}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status de Pagamento</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      fornecedor.statusPagamento === 'Pago'
                        ? 'bg-green-100 text-green-800'
                        : fornecedor.statusPagamento === 'Parcial'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {fornecedor.statusPagamento}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <BarChart2 className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Eventos Realizados</h3>
                    <p className="text-gray-900">{fornecedor.historico?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {fornecedor.observacoes && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Observações</h3>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-md border">
                  {fornecedor.observacoes}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Histórico de Eventos */}
        {activeTab === 'historico' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Histórico de Eventos</h3>
              <div className="text-sm text-gray-500">
                Total: R$ {valorTotal.toLocaleString('pt-BR')}
              </div>
            </div>
            
            {historicoData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Evento
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historicoData.map((evento, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(evento.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {evento.evento}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          R$ {evento.valor.toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">Nenhum histórico de evento encontrado.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Estatísticas */}
        {activeTab === 'estatisticas' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Estatísticas do Fornecedor</h3>
            
            {/* Cards de resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Total de Eventos</h4>
                <p className="text-2xl font-bold text-primary">{fornecedor.historico?.length || 0}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Valor Total</h4>
                <p className="text-2xl font-bold text-primary">R$ {valorTotal.toLocaleString('pt-BR')}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Valor Médio</h4>
                <p className="text-2xl font-bold text-primary">R$ {valorMedio.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            
            {/* Gráfico de eventos */}
            {historicoData.length > 0 ? (
              <div className="mt-6">
                <h4 className="text-md font-medium mb-4">Valores por Evento</h4>
                <div className="bg-white border rounded-md p-4">
                  <GraficoEvento
                    type="bar"
                    data={historicoData.map(item => ({
                      name: item.evento,
                      value: item.valor
                    }))}
                    height={300}
                    config={{
                      dataKey: 'value',
                      name: 'Valor (R$)',
                      xAxisDataKey: 'name',
                      tooltipFormatter: (value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">Sem dados suficientes para gerar estatísticas.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Rodapé com ações */}
      <div className="bg-gray-50 px-6 py-3 flex justify-end border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default FornecedorDetails;