import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  BarChart3, LineChart, PieChart, Calendar, Filter, RefreshCcw, Download
} from 'lucide-react';
import GraficoFornecedor from './GraficoFornecedor';
import GraficoEvento from './GraficoEvento';

// Dados de exemplo para os gráficos (em um cenário real, isso viria de uma API)
const dadosFornecedores = [
  { nome: "Fornecedor A", valor: 125000, tickets: 42, periodo: "2024-Q1" },
  { nome: "Fornecedor B", valor: 98500, tickets: 36, periodo: "2024-Q1" },
  { nome: "Fornecedor C", valor: 145000, tickets: 51, periodo: "2024-Q1" },
  { nome: "Fornecedor D", valor: 76200, tickets: 29, periodo: "2024-Q1" },
  { nome: "Fornecedor E", valor: 110000, tickets: 38, periodo: "2024-Q1" },
  { nome: "Fornecedor A", valor: 132000, tickets: 45, periodo: "2024-Q2" },
  { nome: "Fornecedor B", valor: 105000, tickets: 39, periodo: "2024-Q2" },
  { nome: "Fornecedor C", valor: 138000, tickets: 48, periodo: "2024-Q2" },
  { nome: "Fornecedor D", valor: 82000, tickets: 31, periodo: "2024-Q2" },
  { nome: "Fornecedor E", valor: 118000, tickets: 41, periodo: "2024-Q2" }
];

const dadosEventos = [
  { data: "2024-01-15", participantes: 120, custo: 15000, satisfacao: 4.2, periodo: "2024-Q1" },
  { data: "2024-02-05", participantes: 85, custo: 12000, satisfacao: 4.0, periodo: "2024-Q1" },
  { data: "2024-02-25", participantes: 150, custo: 18000, satisfacao: 4.5, periodo: "2024-Q1" },
  { data: "2024-03-10", participantes: 95, custo: 13500, satisfacao: 3.8, periodo: "2024-Q1" },
  { data: "2024-04-05", participantes: 110, custo: 14000, satisfacao: 4.1, periodo: "2024-Q2" },
  { data: "2024-04-20", participantes: 130, custo: 16000, satisfacao: 4.3, periodo: "2024-Q2" },
  { data: "2024-05-12", participantes: 145, custo: 17500, satisfacao: 4.4, periodo: "2024-Q2" },
  { data: "2024-06-01", participantes: 160, custo: 19000, satisfacao: 4.6, periodo: "2024-Q2" }
];

const RelatoriosManager = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('');
  const [tipoGraficoFornecedor, setTipoGraficoFornecedor] = useState('barra');
  const [tipoGraficoEvento, setTipoGraficoEvento] = useState('linha');
  const [mostrarTendencia, setMostrarTendencia] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // Lista de períodos disponíveis
  const periodos = ['', '2024-Q1', '2024-Q2'];
  const nomePeriodos = {
    '': 'Todos',
    '2024-Q1': '1º Trimestre 2024',
    '2024-Q2': '2º Trimestre 2024'
  };

  // Simular carregamento quando muda o período
  useEffect(() => {
    setCarregando(true);
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [periodoSelecionado]);

  // Função para baixar todos os dados
  const baixarTodosOsDados = () => {
    const todosDados = {
      fornecedores: dadosFornecedores,
      eventos: dadosEventos
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todosDados));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `relatorio_completo_${periodoSelecionado || 'todos'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Atualizar relatórios (simulado)
  const atualizarRelatorios = () => {
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Central de Relatórios</h1>
        <p className="text-gray-600">Visualize e analise dados estratégicos da sua organização</p>
      </header>

      {/* Barra de controles globais */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 mb-1">
              Período
            </label>
            <select
              id="periodo"
              value={periodoSelecionado}
              onChange={(e) => setPeriodoSelecionado(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={carregando}
            >
              {periodos.map(periodo => (
                <option key={periodo} value={periodo}>{nomePeriodos[periodo]}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={atualizarRelatorios}
            disabled={carregando}
            className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors mt-auto"
          >
            <RefreshCcw size={16} className={carregando ? "animate-spin" : ""} />
            <span>{carregando ? "Atualizando..." : "Atualizar Dados"}</span>
          </button>
        </div>

        <button
          onClick={baixarTodosOsDados}
          className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
        >
          <Download size={16} />
          <span>Exportar Todos os Dados</span>
        </button>
      </div>

      {/* Tabs para diferentes tipos de relatórios */}
      <Tabs defaultValue="fornecedores" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="fornecedores" className="flex items-center space-x-2">
            <BarChart3 size={16} />
            <span>Fornecedores</span>
          </TabsTrigger>
          <TabsTrigger value="eventos" className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>Eventos</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Conteúdo da aba de Fornecedores */}
        <TabsContent value="fornecedores" className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg flex flex-wrap gap-3 items-center">
            <span className="font-medium text-gray-700 flex items-center">
              <Filter size={16} className="mr-2" />
              Tipo de Visualização:
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setTipoGraficoFornecedor('barra')}
                className={`flex items-center px-3 py-1 rounded-md ${
                  tipoGraficoFornecedor === 'barra' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                <BarChart3 size={16} className="mr-1" />
                Barras
              </button>
              <button
                onClick={() => setTipoGraficoFornecedor('pizza')}
                className={`flex items-center px-3 py-1 rounded-md ${
                  tipoGraficoFornecedor === 'pizza' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                <PieChart size={16} className="mr-1" />
                Pizza
              </button>
            </div>
          </div>
          
          <GraficoFornecedor 
            dados={dadosFornecedores} 
            periodo={periodoSelecionado} 
            tipo={tipoGraficoFornecedor} 
          />
        </TabsContent>
        
        {/* Conteúdo da aba de Eventos */}
        <TabsContent value="eventos" className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700 flex items-center">
                <Filter size={16} className="mr-2" />
                Tipo de Visualização:
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTipoGraficoEvento('linha')}
                  className={`flex items-center px-3 py-1 rounded-md ${
                    tipoGraficoEvento === 'linha' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <LineChart size={16} className="mr-1" />
                  Linhas
                </button>
                <button
                  onClick={() => setTipoGraficoEvento('area')}
                  className={`flex items-center px-3 py-1 rounded-md ${
                    tipoGraficoEvento === 'area' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300'
                  }`}
                >
                  <BarChart3 size={16} className="mr-1" />
                  Áreas
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={mostrarTendencia}
                  onChange={() => setMostrarTendencia(!mostrarTendencia)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Mostrar Tendência</span>
              </label>
            </div>
          </div>
          
          <GraficoEvento 
            dados={dadosEventos} 
            periodo={periodoSelecionado} 
            tipo={tipoGraficoEvento}
            incluirTendencia={mostrarTendencia}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosManager;