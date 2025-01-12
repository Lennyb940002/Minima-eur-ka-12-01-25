import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  category: 'work' | 'personal' | 'meeting';
}

export function MarketingView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    category: 'work',
  });

  // Helpers pour la gestion des dates
  const startOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  };

  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const getHourSlots = () => {
    return Array.from({ length: 24 }, (_, i) => i);
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };

  const categoryColors = {
    work: 'bg-blue-500',
    personal: 'bg-green-500',
    meeting: 'bg-purple-500'
  };

  const handlePrevWeek = () => {
    setSelectedDate(addDays(selectedDate, -7));
  };

  const handleNextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start && newEvent.end) {
      if (editingEvent) {
        setEvents(prev => prev.map(event =>
          event.id === editingEvent.id ? { ...newEvent, id: event.id } as Event : event
        ));
      } else {
        setEvents(prev => [...prev, { ...newEvent, id: Date.now().toString() } as Event]);
      }
      setShowEventModal(false);
      setNewEvent({ category: 'work' });
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowEventModal(false);
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Calendrier mensuel compact */}
      <div className="w-64 bg-white p-4 border-r border-gray-200">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold">
            {new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(selectedDate)}
          </h2>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => (
            <div key={day} className="text-center text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(selectedDate).map(({ date, isCurrentMonth }, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const hasEvents = getEventsForDay(date).length > 0;

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`
                  p-2 text-sm rounded-full
                  ${isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-400'}
                  ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                `}
              >
                {date.getDate()}
                {hasEvents && !isSelected && (
                  <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vue hebdomadaire détaillée */}
      <div className="flex-1 bg-white">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={handlePrevWeek} className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold">
              Semaine du {formatDate(startOfWeek(selectedDate))}
            </h2>
            <button onClick={handleNextWeek} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setNewEvent({ category: 'work', start: selectedDate, end: selectedDate });
              setShowEventModal(true);
            }}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            Événement
          </button>
        </div>

        <div className="flex h-[calc(100vh-9rem)] overflow-hidden">
          {/* Colonne des heures */}
          <div className="w-16 border-r border-gray-200">
            <div className="h-12" /> {/* Espace pour l'en-tête */}
            <div className="overflow-y-auto h-full">
              {getHourSlots().map(hour => (
                <div key={hour} className="h-20 border-b border-gray-100 text-sm text-gray-500 px-2">
                  {formatHour(hour)}
                </div>
              ))}
            </div>
          </div>

          {/* Grille des jours */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex min-w-full">
              {getWeekDays(selectedDate).map(date => (
                <div key={date.toISOString()} className="flex-1 min-w-[200px]">
                  <div className="h-12 border-b border-gray-200 px-2 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-medium">
                        {new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {date.getDate()}
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[calc(100%-3rem)]">
                    {getHourSlots().map(hour => (
                      <div
                        key={hour}
                        className="h-20 border-b border-gray-100"
                        onClick={() => {
                          const newDate = new Date(date);
                          newDate.setHours(hour);
                          setNewEvent({
                            category: 'work',
                            start: newDate,
                            end: new Date(newDate.getTime() + 3600000)
                          });
                          setShowEventModal(true);
                        }}
                      />
                    ))}
                    {getEventsForDay(date).map(event => {
                      const start = new Date(event.start);
                      const end = new Date(event.end);
                      const top = (start.getHours() * 60 + start.getMinutes()) * (80 / 60);
                      const height = ((end.getTime() - start.getTime()) / (1000 * 60)) * (80 / 60);

                      return (
                        <div
                          key={event.id}
                          className={`absolute left-0 right-0 mx-1 rounded px-2 py-1 cursor-pointer ${categoryColors[event.category]}`}
                          style={{ top: `${top}px`, height: `${height}px` }}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="text-white text-sm font-medium truncate">
                            {event.title}
                          </div>
                          <div className="text-white text-xs">
                            {start.getHours()}:{start.getMinutes().toString().padStart(2, '0')} -
                            {end.getHours()}:{end.getMinutes().toString().padStart(2, '0')}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'événement */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}
              </h2>
              <button onClick={() => {
                setShowEventModal(false);
                setEditingEvent(null);
              }} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newEvent.title || ''}
                  onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Début</label>
                  <input
                    type="datetime-local"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newEvent.start ? new Date(newEvent.start).toISOString().slice(0, 16) : ''}
                    onChange={e => setNewEvent(prev => ({ ...prev, start: new Date(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fin</label>
                  <input
                    type="datetime-local"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={newEvent.end ? new Date(newEvent.end).toISOString().slice(0, 16) : ''}
                    onChange={e => setNewEvent(prev => ({ ...prev, end: new Date(e.target.value) }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={newEvent.category}
                  onChange={e => setNewEvent(prev => ({ ...prev, category: e.target.value as Event['category'] }))}
                >
                  <option value="work">Professionnel</option>
                  <option value="personal">Personnel</option>
                  <option value="meeting">Rendez-vous</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                {editingEvent && (
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(editingEvent.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEvent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                >
                  {editingEvent ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingEvent ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketingView;