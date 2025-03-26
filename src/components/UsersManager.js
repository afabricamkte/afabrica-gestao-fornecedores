// Componente de Gerenciamento de Usuários e Organizações
const UsersManager = ({ userRole, users, onAddUser, onUpdateUser, onDeleteUser }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    
    const handleEdit = (user) => {
      setEditingUser(user);
      setShowForm(true);
    };
    
    const handleSave = (user) => {
      if (editingUser) {
        onUpdateUser({ ...user, id: editingUser.id });
      } else {
        onAddUser({ ...user, id: Date.now() });
      }
      setShowForm(false);
      setEditingUser(null);
    };
    
    const handleCancel = () => {
      setShowForm(false);
      setEditingUser(null);
    };
    
    const UserForm = ({ user, onSave, onCancel }) => {
      const [form, setForm] = useState({
        name: '',
        email: '',
        role: 'viewer',
        isActive: true,
        ...user
      });
      
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ 
          ...form, 
          [name]: type === 'checkbox' ? checked : value 
        });
      };
      
      const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
      };
      
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Função</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="admin">Administrador</option>
                  <option value="collaborator">Colaborador</option>
                  <option value="viewer">Visualizador</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Usuário ativo</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Usuários da Organização</h2>
          {userRole === 'admin' && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              <PlusCircle size={18} className="mr-2" />
              Adicionar Usuário
            </button>
          )}
        </div>
        
        {showForm ? (
          <UserForm
            user={editingUser}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  {userRole === 'admin' && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize">{user.role}</span>
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
                    {userRole === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-primary hover:text-primary-dark mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDeleteUser(user.id)}
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
          </div>
        )}
      </div>
    );
  };