import React, { useState, useEffect } from 'react';
import GraficoEvento from './GraficoEvento';
import EventService from '../services/EventService';
import { FileText, Calendar, DollarSign } from 'lucide-react';

const RelatorioEventos = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [timeRange, setTimeRange] = useState('6months');
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await EventService.getEventStats();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!stats) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">Não foi possível carregar as estatísticas</p>
      </div>
    );
  }
  
  // Prepare dados para o gráfico de eventos por status
  const statusData = Object.entries(stats.porStatus).map(([status, count]) => ({
    name: status,
    value: count,
    // Atribuir cores baseadas no status
    color: 
      status === 'Proposta enviada' ? '#f59e0b' : 
      status === 'Em planejamento' ? '#3b82f6' : 
      status === 'Confirmado' ? '#10b981' : 
      status === 'Em execução' ? '#8b5cf6' : 
      status === 'Concluído' ? '#6b7280' : 
      status === 'Cancelado' ? '#ef4444' : '#d1d5db'
  }));
  
  // Dados para gráfico de eventos e valor por mês
  const monthlyData = stats.porMes;
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Relatório de Eventos</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="3months">Últimos 3 meses</option>
          <option value="6months">Últimos 6 meses</option>
          <option value="year">Último ano</option>
        </select>
      </div>
      
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de eventos</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor total</p>
              <h3 className="text-2xl font-bold">
                R$ {stats.valorTotal.toLocaleString('pt-BR')}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor médio por evento</p>
              <h3 className="text-2xl font-bold">
                R$ {stats.total > 0 
                  ? Math.round(stats.valorTotal / stats.total).toLocaleString('pt-BR') 
                  : 0}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Eventos por Status</h3>
          <GraficoEvento 
            type="pie" 
            data={statusData}
            height={300}
            config={{
              innerRadius: 60,
              outerRadius: 120,
              dataKey: 'value',
              nameKey: 'name',
              tooltipFormatter: (value) => [`${value} eventos`, 'Quantidade']
            }}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Eventos e Valores por Mês</h3>
          <GraficoEvento
            type="bar"
            data={monthlyData}
            height={300}
            config={{
              bars: [
                { dataKey: 'eventos', name: 'Eventos', color: '#3b82f6' },
                { dataKey: 'valor', name: 'Valor Total (R$)', color: '#10b981' }
              ],
              xAxisDataKey: 'mes',
              tooltipFormatter: (value, name) => 
                name === 'Valor Total (R$)' 
                  ? [`R$ ${value.toLocaleString('pt-BR')}`, name]
                  : [value, name]
            }}
          />
        </div>
      </div>
      
      {/* Tabela com resumo de eventos por status */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h3 className="text-lg font-bold mb-4">Resumo por Status</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % do Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(stats.porStatus).map(([status, count]) => (
                <tr key={status}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        status === 'Proposta enviada' ? 'bg-yellow-500' : 
                        status === 'Em planejamento' ? 'bg-blue-500' : 
                        status === 'Confirmado' ? 'bg-green-500' : 
                        status === 'Em execução' ? 'bg-purple-500' : 
                        status === 'Concluído' ? 'bg-gray-500' : 
                        'bg-red-500'
                      }`}></div>
                      <div className="text-sm font-medium text-gray-900">{status}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stats.total > 0 ? ((count / stats.total) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RelatorioEventos;