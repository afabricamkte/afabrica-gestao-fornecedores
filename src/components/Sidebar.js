import React from 'react';
import { Eye, Users, Filter, Calendar, FileText, Settings, User, DollarSign, Zap } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <Eye size={18} /> },
    { id: 'fornecedores', label: 'Fornecedores', icon: <Users size={18} /> },
    { id: 'servicos', label: 'Tipos de Serviço', icon: <Filter size={18} /> },
    { id: 'eventos', label: 'Eventos', icon: <Calendar size={18} /> },
    { id: 'relatorios', label: 'Relatórios', icon: <FileText size={18} /> },
    { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> }
  ];
  
  if (userRole === 'admin') {
    tabs.push(
      { id: 'users', label: 'Usuários', icon: <User size={18} /> },
      { id: 'subscription', label: 'Plano e Cobrança', icon: <DollarSign size={18} /> },
      { id: 'integrations', label: 'Integrações e API', icon: <Zap size={18} /> }
    );
  }
  
  return (
    <div className="bg-primary text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-secondary">Menu</h2>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id} className="mb-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-2 rounded ${
                  activeTab === tab.id ? 'bg-secondary text-primary' : 'hover:bg-opacity-10 hover:bg-secondary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;