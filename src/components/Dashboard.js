import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import _ from 'lodash';

const Dashboard = ({ fornecedores, servicos }) => {
  // Cálculos para o dashboard
  const totalFornecedores = fornecedores.length;
  const totalServicos = servicos.length;
  const fornecedoresPorServico = _.groupBy(fornecedores, 'tipoServico');
  
  // Total financeiro comprometido com fornecedores
  const totalCompromisso = fornecedores.reduce((sum, item) => sum + (item.valor || 0), 0);
  
  // Dados para gráfico
  const dataServicos = Object.keys(fornecedoresPorServico).map(servico => ({
    name: servico,
    value: fornecedoresPorServico[servico].length
  }));
  
  // Cores para gráficos
  const COLORS = ['#010d36', '#1e40af', '#3b82f6', '#93c5fd', '#dfd7c0', '#d1d5db'];
  
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
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
        
        <div className="bg-white p-6 rounded-lg shadow h-80">
          <h3 className="text-xl font-bold mb-4">Distribuição de Fornecedores</h3>
          <ResponsiveContainer width="100%" height="90%">
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Evolução de Gastos (Últimos 6 meses)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { mes: 'Jan', gasto: 35000 },
              { mes: 'Fev', gasto: 42000 },
              { mes: 'Mar', gasto: 28000 },
              { mes: 'Abr', gasto: 30000 },
              { mes: 'Mai', gasto: 34000 },
              { mes: 'Jun', gasto: totalCompromisso }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Legend />
              <Line type="monotone" dataKey="gasto" stroke="#010d36" strokeWidth={2} name="Total Gasto" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;