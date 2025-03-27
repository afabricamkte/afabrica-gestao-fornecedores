import React, { useState } from 'react';
import { Calendar, Clock, Database, Download, Upload, CheckCircle, RotateCw, AlertTriangle } from 'lucide-react';

const DadosBackup = () => {
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [retentionPeriod, setRetentionPeriod] = useState('30');
  const [includedData, setIncludedData] = useState({
    eventos: true,
    fornecedores: true,
    usuarios: true,
    configuracoes: true,
    relatorios: false
  });
  const [backupTime, setBackupTime] = useState('02:00');
  
  const [status, setStatus] = useState(null); // loading, success, error
  const [lastBackup, setLastBackup] = useState({
    date: '26/03/2025',
    time: '02:15',
    size: '24.3 MB',
    status: 'success'
  });
  
  // Histórico de backups simulado
  const backupHistory = [
    { id: 1, date: '26/03/2025', time: '02:15', size: '24.3 MB', status: 'success' },
    { id: 2, date: '25/03/2025', time: '02:10', size: '24.1 MB', status: 'success' },
    { id: 3, date: '24/03/2025', time: '02:12', size: '23.9 MB', status: 'success' },
    { id: 4, date: '23/03/2025', time: '02:18', size: '23.8 MB', status: 'success' },
    { id: 5, date: '22/03/2025', time: '02:05', size: '22.7 MB', status: 'error' }
  ];
  
  const handleDataToggle = (dataType) => {
    setIncludedData({
      ...includedData,
      [dataType]: !includedData[dataType]
    });
  };
  
  const handleSaveConfig = () => {
    setStatus('loading');
    
    setTimeout(() => {
      setStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1500);
  };
  
  const handleBackupNow = () => {
    setStatus('loading');
    
    setTimeout(() => {
      const newBackup = {
        date: '26/03/2025',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        size: '24.5 MB',
        status: 'success'
      };
      
      setLastBackup(newBackup);
      setStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-primary">Backup e Restauração de Dados</h3>
        <p className="text-gray-500 mt-1">
          Configure backups automáticos ou realize backups e restaurações manuais.
        </p>
      </div>
      
      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Operação realizada com sucesso!
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Erro ao processar a operação. Tente novamente.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium mb-4">Configurações de Backup</h4>
          
          <div className="space-y-4 p-4 border rounded-md">
            <div>
              <label className="block text-sm font-medium mb-1">Frequência</label>
              <select
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="hourly">A cada hora</option>
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-gray-500" />
                  Horário do Backup
                </div>
              </label>
              <input
                type="time"
                value={backupTime}
                onChange={(e) => setBackupTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500 mt-1">
                Recomendamos horários de baixo tráfego (madrugada).
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Período de Retenção (dias)</label>
              <select
                value={retentionPeriod}
                onChange={(e) => setRetentionPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="7">7 dias</option>
                <option value="14">14 dias</option>
                <option value="30">30 dias</option>
                <option value="60">60 dias</option>
                <option value="90">90 dias</option>
                <option value="180">180 dias</option>
                <option value="365">365 dias</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Dados a Incluir</label>
              
              <div className="space-y-2">
                {Object.keys(includedData).map((dataType) => (
                  <label key={dataType} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includedData[dataType]}
                      onChange={() => handleDataToggle(dataType)}
                      className="mr-2"
                    />
                    <span className="capitalize">{dataType}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSaveConfig}
              disabled={status === 'loading'}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Salvando...
                </span>
              ) : (
                'Salvar Configurações'
              )}
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-4">Operações Manuais</h4>
          
          <div className="p-4 border rounded-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5 className="font-medium">Último Backup</h5>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar size={14} className="mr-1" />
                  {lastBackup.date} às {lastBackup.time}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Database size={14} className="mr-1" />
                  {lastBackup.size}
                </div>
              </div>
              
              <div className={`px-2 py-1 text-xs rounded-full ${
                lastBackup.status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {lastBackup.status === 'success' ? 'Completo' : 'Falha'}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleBackupNow}
                disabled={status === 'loading'}
                className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <RotateCw size={16} className="mr-1" />
                Criar Backup Agora
              </button>
              
              <button
                className="flex items-center justify-center flex-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Download size={16} className="mr-1" />
                Download
              </button>
            </div>
          </div>
          
          <div className="p-4 border rounded-md">
            <h5 className="font-medium mb-2">Restaurar Backup</h5>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Selecione um arquivo de backup para restaurar ou escolha uma data do histórico.
              </p>
              
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-sm">
                    <Upload size={16} className="mr-1 text-gray-500" />
                    Escolher arquivo
                  </div>
                </div>
                
                <button
                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50"
                >
                  Restaurar
                </button>
              </div>
            </div>
            
            <h5 className="font-medium mt-4 mb-2">Histórico de Backups</h5>
            <div className="max-h-40 overflow-y-auto border rounded">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Data</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Tamanho</th>
                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-500">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backupHistory.map((backup) => (
                    <tr key={backup.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {backup.date} {backup.time}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">{backup.size}</td>
                      <td className="px-4 py-2 text-center">
                        <button className="text-primary hover:text-primary-dark mr-2" title="Restaurar">
                          <RotateCw size={16} />
                        </button>
                        <button className="text-primary hover:text-primary-dark" title="Download">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosBackup;