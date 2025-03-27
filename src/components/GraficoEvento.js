import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { AlertTriangle, Download, Calendar } from 'lucide-react';

const GraficoEvento = ({ dados, periodo, tipo = 'linha', incluirTendencia = false }) => {
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [exibirPeriodo, setExibirPeriodo] = useState('mensal');

  // Cores para o gráfico
  const CORES = {
    participantes: '#0088FE',
    custo: '#FF8042',
    satisfacao: '#00C49F',
    tendencia: '#8884D8'
  };

  useEffect(() => {
    // Simulando uma chamada de API ou processamento de dados
    setCarregando(true);
    setErro(null);

    try {
      // Aqui você normalmente faria uma chamada para API ou processaria os dados
      setTimeout(() => {
        if (!dados || dados.length === 0) {
          throw new Error('Nenhum dado disponível para o período selecionado');
        }

        // Filtrando dados por período (simulado)
        let dadosFiltrados = [...dados];
        
        if (periodo) {
          dadosFiltrados = dados.filter(item => item.periodo === periodo);
        }
        
        // Aplicar agrupamento com base no período de exibição
        let dadosAgrupados = dadosFiltrados;
        
        if (exibirPeriodo === 'mensal' && dadosFiltrados.some(d => d.semana)) {
          // Agrupar dados semanais por mês
          const meses = {};
          dadosFiltrados.forEach(item => {
            const mes = item.data.substring(0, 7); // Formato: 'YYYY-MM'
            if (!meses[mes]) {
              meses[mes] = { 
                data: mes, 
                participantes: 0, 
                custo: 0, 
                eventos: 0,
                satisfacao: 0
              };
            }
            meses[mes].participantes += item.participantes || 0;
            meses[mes].custo += item.custo || 0;
            meses[mes].eventos += 1;
            // Média ponderada da satisfação
            if (item.satisfacao) {
              meses[mes].satisfacao = (meses[mes].satisfacao * (meses[mes].eventos - 1) + item.satisfacao) / meses[mes].eventos;
            }
          });
          dadosAgrupados = Object.values(meses);
        }
        
        // Adicionar linha de tendência se solicitado
        if (incluirTendencia) {
          // Cálculo simples de linha de tendência linear
          const n = dadosAgrupados.length;
          if (n > 1) {
            const x = Array.from({ length: n }, (_, i) => i);
            const y = dadosAgrupados.map(d => d.participantes);
            
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
            const sumXX = x.reduce((a, b) => a + b * b, 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            // Adicionar valores de tendência aos dados
            dadosAgrupados = dadosAgrupados.map((d, i) => ({
              ...d,
              tendencia: intercept + slope * i
            }));
          }
        }
        
        setDadosFiltrados(dadosAgrupados);
        setCarregando(false);
      }, 800); // Simula o tempo de carregamento
    } catch (error) {
      setErro(error.message);
      setCarregando(false);
    }
  }, [dados, periodo, exibirPeriodo, incluirTendencia]);

  // Função para exportar dados
  const exportarDados = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dadosFiltrados));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `eventos_${periodo || 'todos'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Alternar período de exibição
  const alternarPeriodo = () => {
    setExibirPeriodo(prev => prev === 'mensal' ? 'semanal' : 'mensal');
  };

  // Renderização condicional para estado de carregamento
  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
        <p className="ml-2">Carregando dados de eventos...</p>
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

  // Formatadores para os tooltips
  const formatadorCusto = (valor) => `R$ ${valor.toLocaleString('pt-BR')}`;
  const formatadorParticipantes = (valor) => `${valor} participantes`;
  const formatadorSatisfacao = (valor) => `${valor.toFixed(1)}/5`;

  // Renderização do gráfico selecionado
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {periodo ? `Eventos - ${periodo}` : 'Análise de Eventos'}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={alternarPeriodo}
            className="flex items-center text-sm bg-gray-50 text-gray-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            <Calendar size={16} className="mr-1" />
            {exibirPeriodo === 'mensal' ? 'Ver Semanal' : 'Ver Mensal'}
          </button>
          <button
            onClick={exportarDados}
            className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
          >
            <Download size={16} className="mr-1" />
            Exportar
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {tipo === 'linha' ? (
            <LineChart
              data={dadosFiltrados}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="data" 
                tickFormatter={(value) => {
                  // Formatar data conforme o período
                  if (exibirPeriodo === 'mensal') {
                    return value.substring(0, 7); // YYYY-MM
                  }
                  return value; // Data completa
                }}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'participantes') return formatadorParticipantes(value);
                  if (name === 'custo') return formatadorCusto(value);
                  if (name === 'satisfacao') return formatadorSatisfacao(value);
                  if (name === 'tendencia') return formatadorParticipantes(value);
                  return value;
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="participantes" 
                name="Participantes" 
                stroke={CORES.participantes} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="custo" 
                name="Custo (R$)" 
                stroke={CORES.custo} 
                strokeWidth={2}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="satisfacao" 
                name="Satisfação (0-5)" 
                stroke={CORES.satisfacao} 
                strokeWidth={2}
              />
              {incluirTendencia && (
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="tendencia" 
                  name="Tendência" 
                  stroke={CORES.tendencia} 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          ) : (
            <AreaChart
              data={dadosFiltrados}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'participantes') return formatadorParticipantes(value);
                  if (name === 'custo') return formatadorCusto(value);
                  if (name === 'satisfacao') return formatadorSatisfacao(value);
                  return value;
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="participantes" 
                name="Participantes" 
                fill={CORES.participantes} 
                stroke={CORES.participantes}
                fillOpacity={0.2}
              />
              <Area 
                type="monotone" 
                dataKey="custo" 
                name="Custo (R$)" 
                fill={CORES.custo} 
                stroke={CORES.custo}
                fillOpacity={0.2}
              />
              <Area 
                type="monotone" 
                dataKey="satisfacao" 
                name="Satisfação (0-5)" 
                fill={CORES.satisfacao} 
                stroke={CORES.satisfacao}
                fillOpacity={0.2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Resumo estatístico */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {dadosFiltrados.length > 0 && (
          <>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="text-xs text-blue-700 uppercase font-semibold">Total de Participantes</h4>
              <p className="text-2xl font-bold text-blue-900">
                {dadosFiltrados.reduce((sum, item) => sum + (item.participantes || 0), 0)}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-xs text-orange-700 uppercase font-semibold">Custo Total</h4>
              <p className="text-2xl font-bold text-orange-900">
                {dadosFiltrados.reduce((sum, item) => sum + (item.custo || 0), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="text-xs text-green-700 uppercase font-semibold">Satisfação Média</h4>
              <p className="text-2xl font-bold text-green-900">
                {(dadosFiltrados.reduce((sum, item) => sum + (item.satisfacao || 0), 0) / dadosFiltrados.length).toFixed(1)}/5
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-xs text-purple-700 uppercase font-semibold">Custo por Participante</h4>
              <p className="text-2xl font-bold text-purple-900">
                {(dadosFiltrados.reduce((sum, item) => sum + (item.custo || 0), 0) / 
                dadosFiltrados.reduce((sum, item) => sum + (item.participantes || 1), 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GraficoEvento;