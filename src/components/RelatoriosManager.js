import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         BarChart, Bar, PieChart as RePieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';

const RelatoriosManager = ({ fornecedores, eventos, servicos }) => {
  const [selectedReport, setSelectedReport] = useState('fornecedores');
  
  // Dados para gráfico de fornecedores por serviço
  const fornecedoresPorServico = _.groupBy(fornecedores || [], 'tipoServico');
  const dataServicos = Object.keys(fornecedoresPorServico || {}).map(servico => ({
    name: servico,
    value: fornecedoresPorServico[servico].length
  }));
  
  // Dados para gastos por evento
  const dataEventos = (eventos || []).map(evento => ({
    name: evento.nome,
    valor: evento.orcamentoTotal || 0
  }));
  
  // Dados para status de pagamento
  const pagamentosStatus = _.groupBy(fornecedores || [], 'statusPagamento');
  const dataPagamentos = Object.keys(pagamentosStatus || {}).map(status => ({
    name: status,
    value: pagamentosStatus[status].length
  }));
  
  // Cores para gráficos
  const COLORS = ['#010d36', '#1e40af', '#3b82f6', '#93c5fd', '#dfd7c0', '#d1d5db'];
  
  // Total de orçamento comprometido
  const totalOrcamento = (eventos || []).reduce((sum, e) => sum + (e.orcamentoTotal || 0), 0);
  
  // Totais por status de evento
  const eventosPorStatus = _.groupBy(eventos || [], 'status');
  
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
              <p className="text-3xl font-bold">{fornecedores ? fornecedores.length : 0}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Valor Médio</h3>
              <p className="text-3xl font-bold">
                R$ {fornecedores && fornecedores.length > 0 
                  ? (fornecedores.reduce((sum, f) => sum + (f.valor || 0), 0) / fornecedores.length || 0)
                    .toLocaleString('pt-BR', { maximumFractionDigits: 2 })
                  : '0,00'
                }
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Avaliação Média</h3>
              <div className="flex items-center">
                <p className="text-3xl font-bold mr-2">
                  {fornecedores && fornecedores.length > 0
                    ? (fornecedores.reduce((sum, f) => sum + (f.avaliacao || 0), 0) / fornecedores.length || 0)
                      .toFixed(1)
                    : '0.0'
                  }
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
                  <RePieChart>
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
                  </RePieChart>
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
              <p className="text-3xl font-bold">{eventos ? eventos.length : 0}</p>
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
                R$ {eventos && eventos.length > 0
                  ? (totalOrcamento / eventos.length || 0).toLocaleString('pt-BR', { maximumFractionDigits: 2 })
                  : '0,00'
                }
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
                          style={{ width: `${(eventosPorStatus[status].length / (eventos ? eventos.length : 1)) * 100}%` }}
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
                R$ {(fornecedores || []).reduce((sum, f) => sum + (f.valor || 0), 0).toLocaleString('pt-BR')}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Margem Estimada</h3>
              <p className="text-3xl font-bold">
                R$ {(totalOrcamento - (fornecedores || []).reduce((sum, f) => sum + (f.valor || 0), 0)).toLocaleString('pt-BR')}
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

export default RelatoriosManager;