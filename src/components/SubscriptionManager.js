import React from 'react';
import { CheckCircle } from 'lucide-react';

// Componente de Gestão de Planos e Assinaturas
const SubscriptionManager = ({ userRole, subscription, onUpdatePlan }) => {
  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 99.90,
      features: [
        'Até 3 usuários',
        'Gestão de até 30 fornecedores',
        'Gestão de até 15 eventos por mês',
        'Relatórios básicos'
      ]
    },
    {
      id: 'professional',
      name: 'Profissional',
      price: 199.90,
      features: [
        'Até 10 usuários',
        'Gestão de até 100 fornecedores',
        'Gestão de até 50 eventos por mês',
        'Relatórios avançados',
        'Integração com calendário',
        'Suporte prioritário'
      ]
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      price: 399.90,
      features: [
        'Usuários ilimitados',
        'Fornecedores ilimitados',
        'Eventos ilimitados',
        'Relatórios personalizados',
        'API para integrações',
        'Gerente de contas dedicado',
        'Personalização de marca'
      ]
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Plano e Assinatura</h2>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold text-primary">
              {subscription.plan === 'basic' ? 'Plano Básico' : 
               subscription.plan === 'professional' ? 'Plano Profissional' : 'Plano Empresarial'}
            </h3>
            <p className="text-gray-500">Próxima renovação: {subscription.nextBillingDate}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              R$ {subscription.plan === 'basic' ? '99,90' : 
                  subscription.plan === 'professional' ? '199,90' : '399,90'}/mês
            </p>
            <span className={`px-2 py-1 text-xs rounded-full ${
              subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {subscription.status === 'active' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Uso atual</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Usuários</p>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-2">{subscription.usageStats.users}</span>
                <span className="text-sm text-gray-500">/ {
                  subscription.plan === 'basic' ? '3' : 
                  subscription.plan === 'professional' ? '10' : 'ilimitado'
                }</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Fornecedores</p>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-2">{subscription.usageStats.suppliers}</span>
                <span className="text-sm text-gray-500">/ {
                  subscription.plan === 'basic' ? '30' : 
                  subscription.plan === 'professional' ? '100' : 'ilimitado'
                }</span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Eventos este mês</p>
              <div className="flex items-center">
                <span className="text-xl font-bold mr-2">{subscription.usageStats.eventsThisMonth}</span>
                <span className="text-sm text-gray-500">/ {
                  subscription.plan === 'basic' ? '15' : 
                  subscription.plan === 'professional' ? '50' : 'ilimitado'
                }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Planos disponíveis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`bg-white rounded-lg shadow overflow-hidden border-2 ${
              subscription.plan === plan.id ? 'border-primary' : 'border-transparent'
            }`}
          >
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-2xl font-bold mt-1">R$ {plan.price.toFixed(2).replace('.', ',')}<span className="text-sm font-normal">/mês</span></p>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {subscription.plan === plan.id ? (
                <button
                  className="w-full px-4 py-2 border-2 border-primary text-primary rounded hover:bg-primary hover:text-white transition"
                  disabled
                >
                  Plano atual
                </button>
              ) : (
                <button
                  onClick={() => onUpdatePlan(plan.id)}
                  className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
                >
                  {subscription.plan === 'enterprise' && plan.id !== 'enterprise' 
                    ? 'Fazer downgrade' 
                    : 'Fazer upgrade'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Histórico de pagamentos</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscription.paymentHistory.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {payment.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  R$ {payment.amount.toFixed(2).replace('.', ',')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payment.status === 'paid' ? 'Pago' : 'Falha'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionManager;