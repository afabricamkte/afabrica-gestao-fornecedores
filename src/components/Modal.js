import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showFooter = true,
  okText = 'Confirmar',
  cancelText = 'Cancelar',
  onOk = null,
  variant = 'default' // default, danger, warning
}) => {
  useEffect(() => {
    // Desativar scroll do body quando o modal estiver aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup ao desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Impedir propagação do clique dentro do modal
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };
  
  // Determinar classe de tamanho do modal
  const sizeClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }[size];
  
  // Determinar classes para variantes
  const getVariantClasses = () => {
    switch (variant) {
      case 'danger':
        return {
          header: 'bg-red-50 text-red-800 border-red-200',
          okButton: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case 'warning':
        return {
          header: 'bg-yellow-50 text-yellow-800 border-yellow-200',
          okButton: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      default:
        return {
          header: 'bg-gray-50 text-primary border-gray-200',
          okButton: 'bg-accent hover:bg-accent-light text-white'
        };
    }
  };
  
  const variantClasses = getVariantClasses();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
        {/* Overlay de fundo */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>
        
        {/* Conteúdo do modal */}
        <div 
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClass} w-full animate-fadeIn`}
          onClick={handleModalContentClick}
        >
          {/* Cabeçalho */}
          <div className={`px-6 py-4 flex justify-between items-center border-b ${variantClasses.header}`}>
            <h3 className="text-lg font-medium" id="modal-title">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Corpo */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Rodapé com botões */}
          {showFooter && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={onClose}
              >
                {cancelText}
              </button>
              {onOk && (
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md focus:outline-none ${variantClasses.okButton}`}
                  onClick={onOk}
                >
                  {okText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;