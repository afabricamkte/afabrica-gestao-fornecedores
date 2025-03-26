import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// Componente de gerenciamento de APIs e integrações
const IntegrationsManager = ({ userRole, apiKeys, webhooks, integrations, onCreateApiKey, onRevokeApiKey, onAddWebhook, onUpdateWebhook, onDeleteWebhook }) => {
  const [activeTab] = useState('api-keys'); // Removida a atribuição de setActiveTab
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [apiKeyName, setApiKeyName] = useState('');
  const [newApiKey, setNewApiKey] = useState(null);

  const [showWebhookForm, setShowWebhookForm] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [webhookForm, setWebhookForm] = useState({
    name: '',
    url: '',
    events: [],
    active: true
  });

  const handleCreateApiKey = () => {
    if (!apiKeyName) return;
    const newKey = { id: Date.now(), name: apiKeyName, prefix: 'sk_live_' + Math.random().toString(36).substr(2, 8), createdAt: new Date().toLocaleDateString(), lastUsed: '-' };
    onCreateApiKey(newKey);
    setNewApiKey(newKey);
    setShowApiKeyForm(false);
    setApiKeyName('');
  };

  const handleWebhookChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWebhookForm({ ...webhookForm, [name]: type === 'checkbox' ? checked : value });
  };

  const handleWebhookEventToggle = (event) => {
    const newEvents = webhookForm.events.includes(event)
      ? webhookForm.events.filter(e => e !== event)
      : [...webhookForm.events, event];
    setWebhookForm({ ...webhookForm, events: newEvents });
  };

  const handleSaveWebhook = () => {
    if (editingWebhook) {
      onUpdateWebhook({ ...webhookForm, id: editingWebhook.id });
    } else {
      onAddWebhook({ ...webhookForm, id: Date.now() });
    }
    setShowWebhookForm(false);
    setEditingWebhook(null);
    setWebhookForm({ name: '', url: '', events: [], active: true });
  };

  const handleEditWebhook = (webhook) => {
    setEditingWebhook(webhook);
    setWebhookForm(webhook);
    setShowWebhookForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Integrações</h2>
        {userRole === 'admin' && (
          <button
            onClick={() => setShowApiKeyForm(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            <PlusCircle size={18} className="mr-2" />
            Nova Chave de API
          </button>
        )}
      </div>

      {showApiKeyForm && (
        <div className="p-6 mb-4 bg-green-50 border-l-4 border-green-500">
          <h4 className="text-lg font-bold text-green-700 mb-2">Criar Nova Chave de API</h4>
          <div className="flex">
            <input
              type="text"
              value={apiKeyName}
              onChange={(e) => setApiKeyName(e.target.value)}
              placeholder="Nome da chave (ex: Integração Calendário)"
              className="flex-grow p-2 border border-gray-300 rounded-l"
            />
            <button
              onClick={handleCreateApiKey}
              className="bg-primary text-white px-4 py-2 rounded-r hover:bg-opacity-90"
            >
              Criar
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Dê à chave um nome descritivo para lembrar onde ela é usada.
          </p>
        </div>
      )}

      {newApiKey && (
        <div className="p-6 mb-4 bg-green-50 border-l-4 border-green-500">
          <h4 className="text-lg font-bold text-green-700 mb-2">Chave de API Criada</h4>
          <p className="text-sm text-green-600 mb-2">
            Esta é a única vez que você verá esta chave. Copie-a agora!
          </p>
          <div className="bg-white p-3 border border-green-200 rounded font-mono text-sm mb-3 break-all">
            {newApiKey.prefix}
          </div>
          <button
            onClick={() => setNewApiKey(null)}
            className="text-green-700 font-medium hover:text-green-900"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="p-6">
        {apiKeys.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prefixo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último uso
                </th>
                {userRole === 'admin' && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiKeys.map((key) => (
                <tr key={key.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {key.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {key.prefix}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {key.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {key.lastUsed}
                  </td>
                  {userRole === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => onRevokeApiKey(key.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Revogar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Nenhuma chave de API encontrada
          </div>
        )}
      </div>

      {activeTab === 'webhooks' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b">
            <h3 className="text-xl font-bold">Webhooks</h3>
            {userRole === 'admin' && (
              <button
                onClick={() => setShowWebhookForm(true)}
                className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
              >
                <PlusCircle size={18} className="mr-2" />
                Novo Webhook
              </button>
            )}
          </div>

          {showWebhookForm && (
            <div className="p-6">
              <h4 className="text-lg font-bold mb-4">{editingWebhook ? 'Editar Webhook' : 'Novo Webhook'}</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={webhookForm.name}
                    onChange={handleWebhookChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="url"
                    name="url"
                    value={webhookForm.url}
                    onChange={handleWebhookChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="https://sua-aplicacao.com/webhook"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Eventos</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['evento.created', 'fornecedor.created'].map(event => (
                      <div key={event} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`event-${event}`}
                          checked={webhookForm.events.includes(event)}
                          onChange={() => handleWebhookEventToggle(event)}
                          className="mr-2"
                        />
                        <label htmlFor={`event-${event}`} className="text-sm">
                          {event}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="webhook-active"
                    name="active"
                    checked={webhookForm.active}
                    onChange={handleWebhookChange}
                    className="mr-2"
                  />
                  <label htmlFor="webhook-active">Ativo</label>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowWebhookForm(false);
                      setEditingWebhook(null);
                      setWebhookForm({
                        name: '',
                        url: '',
                        events: [],
                        active: true
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveWebhook}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                  >
                    {editingWebhook ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="p-6">
            {webhooks.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Eventos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    {userRole === 'admin' && (
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {webhooks.map((webhook) => (
                    <tr key={webhook.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {webhook.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {webhook.url}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {webhook.events.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            webhook.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {webhook.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      {userRole === 'admin' && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditWebhook(webhook)}
                            className="text-primary hover:text-primary-dark mr-3"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteWebhook(webhook.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhum webhook configurado
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold">Integrações Disponíveis</h3>
              <p className="text-gray-500 mt-1">
                Conecte o AFÁBRICA com outros sistemas e serviços.
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration) => (
                  <div key={integration.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4 flex items-center border-b">
                      <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{integration.name}</h4>
                        <p className="text-xs text-gray-500">{integration.category}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                      <button
                        onClick={() => alert('Conectar integração')}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
                      >
                        {integration.connected ? 'Desconectar' : 'Conectar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsManager;