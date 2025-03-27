import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { AlertTriangle, Download } from 'lucide-react';

const GraficoFornecedor = ({ dados, periodo, tipo = 'barra' }) => {
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Cores para o gráfico
  const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#8DD1E1'];

  useEffect(() => {
    // Simulando uma chamada de API ou processamento de dados
    setCarregando(true);
    setErro(null);

    try {
      // Aqui você normalmente faria uma chamada para API ou processaria os dados
      // Por enquanto, vamos apenas filtrar os dados recebidos por período
      setTimeout(() => {
        if (!dados || dados.length === 0) {
          throw new Error('Nenhum dado disponível para o período selecionado');
        }

        // Filtrando dados por período (simulado)
        const dadosTratados = dados
          .filter(item => !periodo || item.periodo === periodo)
          .sort((a, b) => b.valor - a.valor); // Ordenando por valor
        
        setDadosFiltrados(dadosTratados);
        setCarregando(false);
      }, 800); // Simula o tempo de carregamento
    } catch (error) {
      setErro(error.message);
      setCarregando(false);
    }
  }, [dados, periodo]);

  // Função para exportar dados
  const exportarDados = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dadosFiltrados));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `fornecedores_${periodo || 'todos'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Renderização condicional para estado de carregamento
  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
        <p className="ml-2">Carregando dados...</p>
      </div>
    );
  }

  // Renderização condicional para estado de erro
  if (erro) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <AlertTriangle size={32} />
        <p className="mt-2">{erro}</p>
      </div>
    );
  }

  // Renderização do gráfico selecionado
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {periodo ? `Desempenho de Fornecedores - ${periodo}` : 'Desempenho Geral de Fornecedores'}
        </h3>
        <button
          onClick={exportarDados}
          className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
        >
          <Download size={16} className="mr-1" />
          Exportar
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {tipo === 'barra' ? (
            <BarChart
              data={dadosFiltrados}
              margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="nome" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                labelFormatter={(label) => `Fornecedor: ${label}`}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar 
                dataKey="valor" 
                name="Valor (R$)" 
                fill="#0088FE"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="tickets" 
                name="Tickets" 
                fill="#00C49F"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={dadosFiltrados}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="valor"
                nameKey="nome"
                label={({ nome, percent }) => `${nome}: ${(percent * 100).toFixed(0)}%`}
              >
                {dadosFiltrados.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
              />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Dados em formato de tabela para acessibilidade */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Fornecedor</th>
              <th className="px-4 py-2 text-right">Valor (R$)</th>
              <th className="px-4 py-2 text-right">Tickets</th>
              <th className="px-4 py-2 text-right">% do Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dadosFiltrados.map((item, index) => {
              const valorTotal = dadosFiltrados.reduce((sum, i) => sum + i.valor, 0);
              const percentual = (item.valor / valorTotal * 100).toFixed(1);
              
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="px-4 py-2">{item.nome}</td>
                  <td className="px-4 py-2 text-right">
                    {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-4 py-2 text-right">{item.tickets}</td>
                  <td className="px-4 py-2 text-right">{percentual}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GraficoFornecedor;