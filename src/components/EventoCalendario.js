import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const EventoCalendario = ({ eventos, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [eventsByDay, setEventsByDay] = useState({});
  
  // Definir dias do mês atual
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Número total de dias no mês
    const daysInMonth = lastDay.getDate();
    
    // Array para armazenar todos os dias a serem exibidos no calendário
    const days = [];
    
    // Adicionar dias do mês anterior para completar a primeira semana
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }
    
    // Adicionar dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Adicionar dias do próximo mês para completar a última semana
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false
        });
      }
    }
    
    setCalendarDays(days);
  }, [currentDate]);
  
  // Organizar eventos por dia
  useEffect(() => {
    if (!eventos) return;
    
    const eventMap = {};
    
    eventos.forEach(evento => {
      const startDate = new Date(evento.dataInicio);
      const endDate = new Date(evento.dataFim || evento.dataInicio);
      
      // Para cada dia entre a data de início e fim, adicionar o evento
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateKey = currentDate.toISOString().split('T')[0];
        
        if (!eventMap[dateKey]) {
          eventMap[dateKey] = [];
        }
        
        eventMap[dateKey].push(evento);
        
        // Avançar para o próximo dia
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    setEventsByDay(eventMap);
  }, [eventos]);
  
  // Navegar para o mês anterior
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Navegar para o próximo mês
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Ir para o mês atual
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Formatação de data para exibição
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  // Obter nome do mês
  const getMonthName = (date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long' });
  };
  
  // Obter cores baseadas no status do evento
  const getEventStatusColor = (status) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-500';
      case 'Em planejamento':
        return 'bg-blue-500';
      case 'Proposta enviada':
        return 'bg-yellow-500';
      case 'Em execução':
        return 'bg-purple-500';
      case 'Concluído':
        return 'bg-gray-500';
      case 'Cancelado':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  // Verificar se um dia é hoje
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cabeçalho do calendário */}
      <div className="bg-primary text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <CalendarIcon className="mr-2" />
            Calendário de Eventos
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-1 rounded-full hover:bg-primary-light"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg capitalize">
              {getMonthName(currentDate)} {currentDate.getFullYear()}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 rounded-full hover:bg-primary-light"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={goToToday}
              className="ml-2 px-3 py-1 bg-primary-light rounded-md text-sm hover:bg-opacity-80"
            >
              Hoje
            </button>
          </div>
        </div>
      </div>
      
      {/* Dias da semana */}
      <div className="grid grid-cols-7 bg-gray-50 border-b">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
          <div 
            key={index} 
            className="py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Dias do mês */}
      <div className="grid grid-cols-7 divide-x divide-y">
        {calendarDays.map((day, index) => {
          const dateKey = formatDateKey(day.date);
          const dayEvents = eventsByDay[dateKey] || [];
          
          return (
            <div 
              key={index} 
              className={`min-h-24 p-1 ${
                day.isCurrentMonth 
                  ? 'bg-white' 
                  : 'bg-gray-50 text-gray-400'
              } ${
                isToday(day.date) 
                  ? 'ring-2 ring-inset ring-accent' 
                  : ''
              }`}
            >
              <div className="flex justify-between">
                <span className={`text-sm font-medium p-1 ${
                  isToday(day.date) ? 'bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                }`}>
                  {day.date.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              
              <div className="mt-1 space-y-1 overflow-y-auto max-h-20">
                {dayEvents.slice(0, 3).map((evento, eventIdx) => (
                  <div
                    key={eventIdx}
                    onClick={() => onEventClick(evento)}
                    className={`px-2 py-1 text-xs rounded truncate cursor-pointer ${getEventStatusColor(evento.status)} text-white`}
                  >
                    {evento.nome}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-center text-gray-500">
                    +{dayEvents.length - 3} mais
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventoCalendario;