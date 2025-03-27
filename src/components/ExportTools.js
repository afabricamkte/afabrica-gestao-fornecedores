import React, { useState } from 'react';
import { DownloadCloud, FileText, Database, BarChart, Check, AlertTriangle } from 'lucide-react';

const ExportTools = ({ data, title = 'Exportar Dados', description = 'Exporte seus dados para diferentes formatos.' }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dataSelection, setDataSelection] = useState('all');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [dateRange, setDateRange] = useState('all');
  const [exportStatus, setExportStatus] = useState(null); // 'success', 'error', or null
  const [isExporting, setIsExporting] = useState(false);
  
  // Simular exportação
  const handleExport = () => {
    setIsExporting(true);
    setExportStatus(null);
    
    // Simular processo de exportação
    setTimeout(() => {
      setIsExporting(false);
      
      // Simular sucesso (ou falha aleatória para demonstração)
      const isSuccess = Math.random() > 0.2; // 80% chance de sucesso
      
      if (isSuccess) {
        setExportStatus('success');
        // Em um app real, aqui seria iniciado o download do arquivo
        console.log('Exportando dados:', {
          format: exportFormat,
          selection: dataSelection,
          includeHeaders,
          dateRange
        });
      } else {
        setExportStatus('error');
      }
      
      // Limpar status após alguns segundos
      setTimeout(() => {
        setExportStatus(null);
      }, 5000);
    }, 1500);
  };
  
  // Opções de formatos com ícones
  const formatOptions = [
    { id: 'csv', label: 'CSV', icon: <FileText size={16} />, description: 'Ideal para planilhas e análises' },
    { id: 'excel', label: 'Excel', icon: <BarChart size={16} />, description: 'Formato Microsoft Excel (XLSX)' },
    { id: 'json', label: 'JSON', icon: <Database size={16} />, description: 'Para integração com sistemas' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      
      {/* Status de exportação */}
      {exportStatus && (
        <div className={`mb-4 p-4 rounded-md ${exportStatus === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex">
            {exportStatus === 'success' ? (
              <>
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-green-700">Dados exportados com sucesso!</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700">Erro ao exportar dados. Tente novamente.</span>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">1. Selecione o formato</h4>
          <div className="space-y-2">
            {formatOptions.map(option => (
              <label 
                key={option.id}
                className={`flex items-start p-3 border rounded-md cursor-pointer ${
                  exportFormat === option.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="exportFormat"
                  value={option.id}
                  checked={exportFormat === option.id}
                  onChange={() => setExportFormat(option.id)}
                  className="mt-0.5 mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="mr-2">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">2. Configurações de exportação</h4>
          
          <div className="p-4 border rounded-md space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dados a exportar</label>
              <select
                value={dataSelection}
                onChange={(e) => setDataSelection(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todos os dados</option>
                <option value="events">Apenas eventos</option>
                <option value="suppliers">Apenas fornecedores</option>
                <option value="services">Apenas serviços</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Período</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todo o período</option>
                <option value="month">Último mês</option>
                <option value="quarter">Último trimestre</option>
                <option value="year">Último ano</option>
                <option value="custom">Período personalizado</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeHeaders"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="includeHeaders" className="text-sm">
                Incluir cabeçalhos/metadados
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Exportando...
            </>
          ) : (
            <>
              <DownloadCloud size={18} className="mr-2" />
              Exportar Dados
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExportTools;