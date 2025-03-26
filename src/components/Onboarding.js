import React, { useState } from 'react';
import { Trash2, PlusCircle, CheckCircle } from 'lucide-react';

// Componente de OnBoarding para novos clientes
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: '',
    industry: '',
    users: [{ name: '', email: '', role: 'admin' }],
    plan: 'professional'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (index, field, value) => {
    const newUsers = [...formData.users];
    newUsers[index][field] = value;
    setFormData({ ...formData, users: newUsers });
  };

  const addUser = () => {
    setFormData({
      ...formData,
      users: [...formData.users, { name: '', email: '', role: 'viewer' }]
    });
  };

  const removeUser = (index) => {
    const newUsers = [...formData.users];
    newUsers.splice(index, 1);
    setFormData({ ...formData, users: newUsers });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Onboarding</h2>
      <div className="space-y-8">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Informações da Organização</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome da Organização</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Setor/Indústria</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="eventos-corporativos">Eventos Corporativos</option>
                  <option value="casamentos">Casamentos e Celebrações</option>
                  <option value="shows">Shows e Festivais</option>
                  <option value="feiras">Feiras e Exposições</option>
                  <option value="esportivos">Eventos Esportivos</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              >
                Próximo
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Usuários da Equipe</h3>
            <div className="space-y-4">
              {formData.users.map((user, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{index === 0 ? 'Administrador Principal' : `Usuário ${index + 1}`}</h4>
                    {index > 0 && (
                      <button
                        onClick={() => removeUser(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome</label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleUserChange(index, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleUserChange(index, 'email', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    {index > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Função</label>
                        <select
                          value={user.role}
                          onChange={(e) => handleUserChange(index, 'role', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="admin">Administrador</option>
                          <option value="collaborator">Colaborador</option>
                          <option value="viewer">Visualizador</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={addUser}
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <PlusCircle size={16} className="mr-1" />
                Adicionar usuário
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Voltar
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              >
                Próximo
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Escolha seu Plano</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['basic', 'professional', 'enterprise'].map((plan) => {
                const planInfo = {
                  basic: {
                    name: 'Básico',
                    price: 99.90,
                    features: ['Até 3 usuários', 'Até 30 fornecedores', 'Até 15 eventos por mês']
                  },
                  professional: {
                    name: 'Profissional',
                    price: 199.90,
                    features: ['Até 10 usuários', 'Até 100 fornecedores', 'Até 50 eventos por mês', 'Relatórios avançados']
                  },
                  enterprise: {
                    name: 'Empresarial',
                    price: 499.90,
                    features: ['Usuários ilimitados', 'Fornecedores ilimitados', 'Eventos ilimitados', 'Suporte dedicado']
                  }
                };
                return (
                  <div
                    key={plan}
                    className={`p-4 border rounded-lg ${formData.plan === plan ? 'border-primary' : 'border-gray-300'}`}
                    onClick={() => setFormData({ ...formData, plan })}
                  >
                    <h4 className="text-lg font-bold mb-2">{planInfo[plan].name}</h4>
                    <p className="text-2xl font-bold mb-4">R$ {planInfo[plan].price.toFixed(2)}</p>
                    <ul className="space-y-2">
                      {planInfo[plan].features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle size={16} className="mr-2 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4">
                      <div className={`h-4 w-4 rounded-full ${formData.plan === plan ? 'bg-primary' : 'border border-gray-300'} mx-auto`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;