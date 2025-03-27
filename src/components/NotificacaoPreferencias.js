import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Toggle } from 'lucide-react';

const NotificacaoPreferencias = () => {
  const [notificacoes, setNotificacoes] = useState({
    novoEvento: {
      email: true,
      sistema: true,
      sms: false
    },
    novoFornecedor: {
      email: true,
      sistema: true,
      sms: false
    },
    atualizacaoEvento: {
      email: false,
      sistema: true,
      sms: false
    },
    lembretesPagamento: {
      email: true,
      sistema: true,
      sms: true
    },
    avaliacaoFornecedor: {
      email: false,
      sistema: true,
      sms: false
    }
  });
  
  const [status, setStatus] = useState(null);
  
  const handleToggleChannel = (tipoNotificacao, canal) => {
    setNotificacoes({
      ...notificacoes,
      [tipoNotificacao]: {
        ...notificacoes[tipoNotificacao],
        [canal]: !notificacoes[tipoNotificacao][canal]
      }
    });
  };
  
  const handleSave = () => {
    // Simulação de salvamento
    setStatus('saving');
    
    setTimeout(() => {
      setStatus('success');
      
      // Limpar status após alguns segundos
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1000);
  };
  
  // Obter ícone para o tipo de notificação
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'novoEvento':
        return <Bell className="h-5 w-5 text-purple-500" />;
      case 'novoFornecedor':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'atualizacaoEvento':
        return <Toggle className="h-5 w-5 text-green-500" />;
      case 'lembretesPagamento':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'avaliacaoFornecedor':
        return <MessageSquare className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Título legível para o tipo de notificação
  const getNotificationTitle = (type) => {
    switch (type) {
      case 'novoEvento':
        return 'Novo evento criado';
      case 'novoFornecedor':
        return 'Novo fornecedor cadastrado';
      case 'atualizacaoEvento':
        return 'Atualização de evento';
      case 'lembretesPagamento':
        return 'Lembretes de pagamento';
      case 'avaliacaoFornecedor':
        return 'Avaliação de fornecedor';
      default:
        return type;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-primary">Preferências de Notificação</h3>
        <p className="text-gray-500 mt-1">
          Configure como e quando você deseja receber notificações do sistema.
        </p>
      </div>
      
      {status === 'success' && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Preferências de notificação salvas com sucesso!
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Notificação
              </th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center">
                  <Bell className="h-4 w-4 mr-1" />
                  No Sistema
                </div>
              </th>
              <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center">
                  <Smartphone className="h-4 w-4 mr-1" />
                  SMS
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(notificacoes).map((tipo) => (
              <tr key={tipo}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(tipo)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {getNotificationTitle(tipo)}
                      </div>
                    </div>
                  </div>
                </td>
                
                {/* Email */}
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificacoes[tipo].email}
                      onChange={() => handleToggleChannel(tipo, 'email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
                
                {/* Sistema */}
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificacoes[tipo].sistema}
                      onChange={() => handleToggleChannel(tipo, 'sistema')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
                
                {/* SMS */}
                <td className="px-3 py-4 whitespace-nowrap text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificacoes[tipo].sms}
                      onChange={() => handleToggleChannel(tipo, 'sms')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'saving' ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Salvando...
            </>
          ) : (
            'Salvar Preferências'
          )}
        </button>
      </div>
    </div>
  );
};

export default NotificacaoPreferencias;