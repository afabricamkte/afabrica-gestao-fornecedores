import React, { useState } from 'react';
import { Star } from 'lucide-react';
import FornecedorService from '../services/FornecedorService';

const AvaliacaoFornecedor = ({ fornecedorId, avaliacaoAtual = 0, onAvaliacaoChange, readOnly = false }) => {
  const [avaliacao, setAvaliacao] = useState(avaliacaoAtual);
  const [tempAvaliacao, setTempAvaliacao] = useState(0);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);
  
  const handleMouseEnter = (estrela) => {
    if (readOnly) return;
    setTempAvaliacao(estrela);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setTempAvaliacao(0);
  };
  
  const handleClick = async (estrela) => {
    if (readOnly) return;
    
    setLoading(true);
    setErro(null);
    setMensagem(null);
    
    try {
      // Chamar serviço para salvar avaliação
      const resultado = await FornecedorService.rateFornecedor(fornecedorId, estrela);
      
      setAvaliacao(estrela);
      setMensagem('Avaliação salva com sucesso!');
      
      // Callback para componente pai
      if (onAvaliacaoChange) {
        onAvaliacaoChange(estrela);
      }
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      setErro('Não foi possível salvar a avaliação. Tente novamente.');
    } finally {
      setLoading(false);
      
      // Limpar mensagem após alguns segundos
      if (!erro) {
        setTimeout(() => {
          setMensagem(null);
        }, 3000);
      }
    }
  };
  
  // Determinar qual avaliação mostrar (temporária ao passar o mouse ou a salva)
  const avaliacaoExibida = tempAvaliacao || avaliacao;
  
  // Textos baseados na avaliação
  const textoAvaliacao = () => {
    if (avaliacaoExibida === 0) return '';
    if (avaliacaoExibida === 1) return 'Ruim';
    if (avaliacaoExibida === 2) return 'Regular';
    if (avaliacaoExibida === 3) return 'Bom';
    if (avaliacaoExibida === 4) return 'Muito Bom';
    if (avaliacaoExibida === 5) return 'Excelente';
  };
  
  return (
    <div>
      <div className="flex items-center">
        {/* Estrelas de 1 a 5 */}
        <div className="flex">
          {[1, 2, 3, 4, 5].map((estrela) => (
            <button
              key={estrela}
              type="button"
              className={`focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
              onMouseEnter={() => handleMouseEnter(estrela)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(estrela)}
              disabled={readOnly || loading}
            >
              <Star
                size={readOnly ? 16 : 24}
                className={`${
                  estrela <= avaliacaoExibida
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                } ${loading ? 'opacity-50' : ''}`}
              />
            </button>
          ))}
        </div>
        
        {/* Texto da avaliação */}
        {!readOnly && (
          <span className="ml-2 text-sm font-medium text-gray-700">
            {textoAvaliacao()}
          </span>
        )}
        
        {/* Indicador de carregamento */}
        {loading && (
          <div className="ml-2">
            <div className="h-4 w-4 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {/* Mensagens de erro ou sucesso */}
      {erro && <p className="mt-1 text-xs text-red-500">{erro}</p>}
      {mensagem && <p className="mt-1 text-xs text-green-500">{mensagem}</p>}
    </div>
  );
};

export default AvaliacaoFornecedor;