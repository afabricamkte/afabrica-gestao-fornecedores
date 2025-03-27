import React, { useState } from 'react';
import { Edit, Trash2, PlusCircle, Mail, UserPlus } from 'lucide-react';
import Modal from './Modal';

const OrganizationSettings = ({ organization, users, onUpdateOrg, onInviteUser, onRemoveUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orgForm, setOrgForm] = useState({
    name: organization.name || '',
    industry: organization.industry || '',
    website: organization.website || '',
    address: organization.address || '',
    logo: organization.logo || null
  });
  
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'viewer'
  });
  
  const [confirmRemove, setConfirmRemove] = useState(null);
  
  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setOrgForm({ ...orgForm, [name]: value });
  };
  
  const handleInviteInputChange = (e) => {
    const { name, value } = e.target;
    setInviteForm({ ...inviteForm, [name]: value });
  };
  
  const handleSaveOrg = () => {
    onUpdateOrg(orgForm);
    setIsEditing(false);
  };
  
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setOrgForm({ ...orgForm, logo: reader.result });
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleInviteSubmit = () => {
    onInviteUser(inviteForm);
    setShowInviteModal(false);
    setInviteForm({ email: '', role: 'viewer' });
  };
  
  const handleRemoveConfirm = () => {
    if (confirmRemove) {
      onRemoveUser(confirmRemove.id);
      setConfirmRemove(null);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Detalhes da Organização */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Detalhes da Organização</h3>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-accent text-white rounded-md hover:bg-accent-light transition-colors text-sm flex items-center"
            >
              <Edit size={16} className="mr-1" />
              Editar
            </button>
          )}
        </div>
        
        <div className="p-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden relative">
                  {orgForm.logo ? (
                    <img src={orgForm.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-3xl font-bold">{orgForm.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer text-white text-sm font-medium">
                      Alterar logo
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleLogoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nome da Organização</label>
                <input
                  type="text"
                  name="name"
                  value={orgForm.name}
                  onChange={handleOrgInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Setor/Indústria</label>
                <select
                  name="industry"
                  value={orgForm.industry}
                  onChange={handleOrgInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
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
              
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <input
                  type="url"
                  name="website"
                  value={orgForm.website}
                  onChange={handleOrgInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://www.seudominio.com.br"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Endereço</label>
                <textarea
                  name="address"
                  value={orgForm.address}
                  onChange={handleOrgInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveOrg}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-light"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                  {organization.logo ? (
                    <img src={organization.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-3xl font-bold">{organization.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Nome da Organização</h4>
                  <p className="text-lg">{organization.name}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Setor/Indústria</h4>
                  <p className="text-lg">{organization.industry || 'Não definido'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Website</h4>
                  <p className="text-lg">
                    {organization.website ? (
                      <a 
                        href={organization.website} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {organization.website}
                      </a>
                    ) : (
                      'Não definido'
                    )}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Endereço</h4>
                  <p className="text-lg">{organization.address || 'Não definido'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Usuários da Organização */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Usuários da Organização</h3>
          <button 
            onClick={() => setShowInviteModal(true)}
            className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-light transition-colors text-sm flex items-center"
          >
            <UserPlus size={16} className="mr-1" />
            Convidar Usuário
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Função
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="h-10 w-10 rounded-full" />
                        ) : (
                          <span className="text-lg font-medium text-gray-600">{user.name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.role === 'admin' ? 'Administrador' : 
                       user.role === 'collaborator' ? 'Colaborador' : 'Visualizador'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="text-accent hover:text-accent-light"
                        title="Enviar email"
                      >
                        <Mail size={18} />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-gray-900"
                        title="Editar usuário"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        title="Remover usuário"
                        onClick={() => setConfirmRemove(user)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de Convite */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Convidar Usuário"
        okText="Enviar Convite"
        onOk={handleInviteSubmit}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inviteForm.email}
              onChange={handleInviteInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="email@exemplo.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Função</label>
            <select
              name="role"
              value={inviteForm.role}
              onChange={handleInviteInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="admin">Administrador</option>
              <option value="collaborator">Colaborador</option>
              <option value="viewer">Visualizador</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Administradores têm acesso completo ao sistema. Colaboradores podem criar e editar recursos. Visualizadores só podem ver recursos.
            </p>
          </div>
        </div>
      </Modal>
      
      {/* Modal de Confirmação de Remoção */}
      <Modal
        isOpen={!!confirmRemove}
        onClose={() => setConfirmRemove(null)}
        title="Remover Usuário"
        okText="Remover"
        cancelText="Cancelar"
        onOk={handleRemoveConfirm}
        variant="danger"
      >
        <div>
          <p>
            Tem certeza que deseja remover o usuário <strong>{confirmRemove?.name}</strong>?
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Esta ação não pode ser desfeita e o usuário perderá todo o acesso à plataforma.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default OrganizationSettings;