import React from 'react';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

const MobileSidebar = ({ isOpen, onClose, activeTab, setActiveTab, userRole }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-primary z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-white hover:text-secondary transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>
        
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            onClose();
          }}
          userRole={userRole}
        />
      </div>
    </>
  );
};

export default MobileSidebar;