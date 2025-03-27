import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Key, Save } from 'lucide-react';

const UserProfile = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    jobTitle: user.jobTitle || '',
    avatar: user.avatar || null
  });
  
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [notification, setNotification] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setForm({ ...form, avatar: reader.result });
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleSaveProfile = () => {
    onUpdateProfile(form);
    setIsEditing(false);
    showNotification('Perfil atualizado com sucesso!', 'success');
  };
  
  const handleUpdatePassword = () => {
    if (password.new !== password.confirm) {
      showNotification('As senhas não conferem', 'error');
      return;
    }
    
    if (password.new.length < 6) {
      showNotification('A senha deve ter pelo menos 6 caracteres', 'error');
      return;
    }
    
    // Simulando atualização de senha bem-sucedida
    showNotification('Senha atualizada com sucesso!', 'success');
    setPassword({
      current: '',
      new: '',
      confirm: ''
    });
  };
  
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {notification && (
        <div className={`p-4 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 
          notification.type === 'error' ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 relative">
                {form.avatar ? (
                  <img src={form.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={64} />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer text-white text-sm font-medium">
                      Alterar foto
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.role === 'admin' ? 'Administrador' : 
                user.role === 'collaborator' ? 'Colaborador' : 'Visualizador'}</p>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light transition-colors"
                >
                  Editar Perfil
                </button>
              )}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Menu</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center p-2 w-full rounded-md ${
                      activeTab === 'profile' ? 'bg-accent/10 text-accent' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <User size={18} className="mr-2" />
                    Perfil
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center p-2 w-full rounded-md ${
                      activeTab === 'security' ? 'bg-accent/10 text-accent' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Shield size={18} className="mr-2" />
                    Segurança
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-2/3">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Informações do Perfil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome completo</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-accent focus:border-accent sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-accent focus:border-accent sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefone</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Phone size={18} />
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-accent focus:border-accent sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Cargo</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={form.jobTitle}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
                    />
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light flex items-center"
                      >
                        <Save size={18} className="mr-2" />
                        Salvar Alterações
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Segurança</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Senha Atual</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Key size={18} />
                      </span>
                      <input
                        type="password"
                        name="current"
                        value={password.current}
                        onChange={handlePasswordChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-accent focus:border-accent sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Nova Senha</label>
                    <input
                      type="password"
                      name="new"
                      value={password.new}
                      onChange={handlePasswordChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      name="confirm"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handleUpdatePassword}
                      className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light"
                    >
                      Atualizar Senha
                    </button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Sessões Ativas</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-medium">Este dispositivo</p>
                        <p className="text-sm text-gray-500">São Paulo, BR • Chrome em Windows</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Atual</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;