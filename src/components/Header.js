import React, { useState } from 'react';
import { ChevronDown, User, LogOut, Settings, DollarSign, Bell, CheckCircle } from 'lucide-react';

const Header = ({ user, organizations, currentOrg, onOrgChange, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light text-secondary py-4 px-6 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-2">AFÁBRICA</h1>
          
          {organizations && organizations.length > 1 && (
            <div className="relative ml-4">
              <button 
                onClick={() => setOrgMenuOpen(!orgMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none bg-opacity-20 bg-white px-3 py-1 rounded"
              >
                <span>{currentOrg.name}</span>
                <ChevronDown size={16} />
              </button>
              
              {orgMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <p className="font-medium">Trocar organização</p>
                  </div>
                  {organizations.map(org => (
                    <button
                      key={org.id}
                      onClick={() => {
                        onOrgChange(org.id);
                        setOrgMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                        currentOrg.id === org.id ? 'bg-gray-50 font-medium' : ''
                      }`}
                    >
                      {currentOrg.id === org.id && (
                        <CheckCircle size={16} className="mr-2 text-primary" />
                      )}
                      <span className={currentOrg.id === org.id ? 'ml-5' : 'ml-7'}>
                        {org.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <button className="mr-4 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2 focus:outline-none bg-primary-light/30 hover:bg-primary-light/50 px-3 py-2 rounded-full transition-all duration-300"
            >
              <div className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center font-medium">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span>{user.name || user.email}</span>
              <ChevronDown size={16} />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100 animate-fadeIn">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user.name || user.email}</p>
                  <p className="text-xs">{user.email}</p>
                  <p className="text-xs capitalize mt-1">{user.role}</p>
                </div>
                <a
                  href="#perfil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <User size={16} className="mr-2" />
                  Meu Perfil
                </a>
                <a
                  href="#configuracoes"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <Settings size={16} className="mr-2" />
                  Configurações
                </a>
                {user.role === 'admin' && (
                  <a
                    href="#assinatura"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <DollarSign size={16} className="mr-2" />
                    Planos e Cobrança
                  </a>
                )}
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center border-t"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;