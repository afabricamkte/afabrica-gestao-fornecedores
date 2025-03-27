import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, MapPin, Clock, ClipboardList, Plus, Trash2, CheckCircle, Circle, Edit } from 'lucide-react';
import Modal from './Modal';
import EventService from '../services/EventService';

const EventoDetails = ({ evento, fornecedores, onUpdateEvento, onClose }) => {
  const [fornecedoresEvento, setFornecedoresEvento] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    titulo: '',
    responsavel: '',
    prazo: '',
    status: 'Pendente'
  });
  
  const [tarefas, setTarefas] = useState(evento.tarefas || []);
  const [timeline, setTimeline] = useState(evento.timeline || []);
  
  useEffect(() => {
    if (evento.fornecedoresIds && fornecedores) {
      const fornecedoresFiltrados = fornecedores.filter(f => 
        evento.fornecedoresIds.includes(f.id)
      );
      setFornecedoresEvento(fornecedoresFiltrados);
    }
  }, [evento.fornecedoresIds, fornecedores]);
  
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };
  
  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      ...taskForm,
    };
    
    const updatedTarefas = [...tarefas, newTask];
    setTarefas(updatedTarefas);
    
    // Adicionar ao timeline
    const updatedTimeline = [...timeline, {
      data: new Date().toISOString().split('T')[0],
      descricao: `Tarefa adicionada: ${taskForm.titulo}`
    }];
    setTimeline(updatedTimeline);
    
    // Atualizar evento
    onUpdateEvento({
      ...evento,
      tarefas: updatedTarefas,
      timeline: updatedTimeline
    });
    
    // Resetar formulário e fechar modal
    setTaskForm({
      titulo: '',
      responsavel: '',
      prazo: '',
      status: 'Pendente'
    });
    setShowTaskModal(false);
  };
  
  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTarefas = tarefas.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    
    setTarefas(updatedTarefas);
    
    // Adicionar ao timeline
    const task = tarefas.find(t => t.id === taskId);
    const updatedTimeline = [...timeline, {
      data: new Date().toISOString().split('T')[0],
      descricao: `Status da tarefa "${task.titulo}" alterado para ${newStatus}`
    }];
    setTimeline(updatedTimeline);
    
    // Atualizar evento
    onUpdateEvento({
      ...evento,
      tarefas: updatedTarefas,
      timeline: updatedTimeline
    });
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluída':
        return 'bg-green-100 text-green-800';
      case 'Em andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-primary text-white p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{evento.nome}</h2>
          <span className={`px-3 py-1 rounded-full text-sm ${
            evento.status === 'Confirmado' ? 'bg-green-500' : 
            evento.status === 'Em planejamento' ? 'bg-blue-500' : 
            evento.status === 'Proposta enviada' ? 'bg-yellow-500' :
            evento.status === 'Em execução' ? 'bg-purple-500' :
            evento.status === 'Concluído' ? 'bg-gray-500' :
            'bg-red-500'
          }`}>
            {evento.status}
          </span>
        </div>
        <p className="mt-2 text-secondary">{evento.cliente}</p>
      </div>
      
      {/* Conteúdo */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data</h3>
                <p className="font-medium">
                  {formatDate(evento.dataInicio)} 
                  {evento.dataFim && evento.dataFim !== evento.dataInicio ? 
                    ` a ${formatDate(evento.dataFim)}` : 
                    ''}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Local</h3>
                <p className="font-medium">{evento.local}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 text-gray-500 mt-0.5 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Orçamento</h3>
                <p className="font-medium">R$ {evento.orcamentoTotal?.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descrição</h3>
            <p className="text-gray-700">{evento.descricao}</p>
          </div>
        </div>
        
        {/* Fornecedores */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Fornecedores
            </h3>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            {fornecedoresEvento && fornecedoresEvento.length > 0 ? (
              <div className="space-y-3">
                {fornecedoresEvento.map((fornecedor) => (
                  <div key={fornecedor.id} className="bg-white p-3 rounded border flex justify-between items-center">
                    <div>
                      <p className="font-medium">{fornecedor.nome}</p>
                      <p className="text-sm text-gray-500">{fornecedor.tipoServico} - R$ {fornecedor.valor?.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded-full mr-2 ${
                        fornecedor.statusPagamento === 'Pago' ? 'bg-green-100 text-green-800' :
                        fornecedor.statusPagamento === 'Parcial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {fornecedor.statusPagamento}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhum fornecedor atribuído a este evento.
              </p>
            )}
          </div>
        </div>
        
        {/* Tarefas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <ClipboardList className="w-5 h-5 mr-2" />
              Tarefas
            </h3>
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center text-sm bg-accent text-white px-3 py-1 rounded-md hover:bg-accent-light transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Nova Tarefa
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            {tarefas && tarefas.length > 0 ? (
              <div className="space-y-3">
                {tarefas.map((tarefa) => (
                  <div key={tarefa.id} className="bg-white p-3 rounded border">
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <button
                            onClick={() => {
                              const newStatus = tarefa.status === 'Concluída' ? 'Pendente' : 'Concluída';
                              handleTaskStatusChange(tarefa.id, newStatus);
                            }}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            {tarefa.status === 'Concluída' ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        <div className="ml-3">
                          <p className={`font-medium ${tarefa.status === 'Concluída' ? 'line-through text-gray-500' : ''}`}>
                            {tarefa.titulo}
                          </p>
                          <div className="text-sm text-gray-500">
                            <span>Responsável: {tarefa.responsavel}</span>
                            {tarefa.prazo && (
                              <span className="ml-3">Prazo: {formatDate(tarefa.prazo)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tarefa.status)}`}>
                          {tarefa.status}
                        </span>
                        <button
                          onClick={() => {
                            const statusOptions = ['Pendente', 'Em andamento', 'Concluída'];
                            const currentIndex = statusOptions.indexOf(tarefa.status);
                            const nextIndex = (currentIndex + 1) % statusOptions.length;
                            handleTaskStatusChange(tarefa.id, statusOptions[nextIndex]);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Nenhuma tarefa criada para este evento.
              </p>
            )}
          </div>
        </div>
        
        {/* Timeline */}
        <div>
          <h3 className="text-lg font-bold flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2" />
            Timeline
          </h3>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="border-l-2 border-primary ml-3 pl-6 space-y-6">
              {timeline && timeline.length > 0 ? (
                timeline.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-10 bg-primary w-4 h-4 rounded-full mt-1"></div>
                    <div className="bg-white p-3 rounded border shadow-sm">
                      <p className="text-xs text-gray-500 mb-1">{formatDate(item.data)}</p>
                      <p className="font-medium">{item.descricao}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Sem registros na timeline.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Rodapé */}
      <div className="bg-gray-50 px-6 py-3 flex justify-end border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
        >
          Fechar
        </button>
      </div>
      
      {/* Modal de Nova Tarefa */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title="Adicionar Nova Tarefa"
        okText="Adicionar"
        onOk={handleAddTask}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título da Tarefa</label>
            <input
              type="text"
              name="titulo"
              value={taskForm.titulo}
              onChange={handleTaskChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Responsável</label>
            <input
              type="text"
              name="responsavel"
              value={taskForm.responsavel}
              onChange={handleTaskChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Prazo</label>
            <input
              type="date"
              name="prazo"
              value={taskForm.prazo}
              onChange={handleTaskChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={taskForm.status}
              onChange={handleTaskChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Pendente">Pendente</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventoDetails;