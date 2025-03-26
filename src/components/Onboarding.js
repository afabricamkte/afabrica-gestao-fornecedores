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
    
    const handleSubmit = () => {
      // Aqui você enviaria os dados para a API
      onComplete(formData);
    };
    
    return (
      <div className="min-h-screen bg-tertiary flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary">AFÁBRICA</h1>
            <p className="text-lg">Configuração inicial da sua conta</p>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {i}
                  </div>
                  {i < 3 && (
                    <div className={`h-1 w-16 ${step > i ? 'bg-primary' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Informações da Organização</h2>
              <div className="space-y-4 mb-6">
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
              
              <div className="flex justify-end">
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
              <h2 className="text-2xl font-bold mb-4">Usuários da Equipe</h2>
              <p className="text-gray-600 mb-4">Adicione os membros da sua equipe que usarão a plataforma.</p>
              
              <div className="space-y-4 mb-6">
                {formData.users.map((user, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{index === 0 ? 'Administrador Principal' : `Usuário ${index + 1}`}</h3>
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
              
              <div className="flex justify-between">
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
              <h2 className="text-2xl font-bold mb-4">Escolha seu Plano</h2>
              <p className="text-gray-600 mb-6">Selecione o plano que melhor atende às necessidades da sua organização.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                      price: 399.90,
                      features: ['Usuários ilimitados', 'Fornecedores ilimitados', 'Eventos ilimitados', 'Suporte prioritário']
                    }
                  };
                  
                  return (
                    <div
                      key={plan}
                      className={`bg-white rounded-lg shadow border-2 p-6 cursor-pointer ${
                        formData.plan === plan ? 'border-primary' : 'border-transparent hover:border-gray-200'
                      }`}
                      onClick={() => setFormData({ ...formData, plan })}
                    >
                      <h3 className="text-xl font-bold mb-1">{planInfo[plan].name}</h3>
                      <p className="text-2xl font-bold mb-4">
                        R$ {planInfo[plan].price.toFixed(2).replace('.', ',')}
                        <span className="text-sm font-normal">/mês</span>
                      </p>
                      
                      <ul className="space-y-2 mb-4">
                        {planInfo[plan].features.map((feature, i) => (
                          <li key={i} className="flex items-center">
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
              
              <div className="flex justify-between">
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