import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon, Plus, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, deleteEvent, fetchPublicHolidays, getEvents, reset } from '../../features/events/eventSlice';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales,
});

export default function EventCalendar() {
  const dispatch = useDispatch();
  const { dbEvents, publicHolidays } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  const canEdit = user?.role === 'consultancy_admin' || user?.subRole === 'manager';

  // --- CALENDAR STATE ---
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Form State
  const [newEvent, setNewEvent] = useState({ 
      title: '', 
      type: 'class', 
      start: '', 
      end: '' 
  });

  // Helper: Format Date for Input (YYYY-MM-DDTHH:mm)
  const toDateTimeLocal = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const offsetMs = d.getTimezoneOffset() * 60 * 1000;
    const localISOTime = new Date(d.getTime() - offsetMs).toISOString().slice(0, 16);
    return localISOTime;
  };

  // 1. Fetch Data
  useEffect(() => {
    dispatch(getEvents());
    dispatch(fetchPublicHolidays());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  // 2. Merge & Process Events
  const allEvents = useMemo(() => {
    const combined = [...dbEvents, ...publicHolidays];
    
    return combined.map(event => {
        // --- LOGIC: SHOW TIME ONLY FOR CLASS, EXAM, MEETING ---
        const isTimeBound = ['class', 'exam', 'meeting'].includes(event.type);

        return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            // If it is NOT a time-bound event, treat as All Day (Hides Time)
            allDay: !isTimeBound 
        };
    });
  }, [dbEvents, publicHolidays]);

  // --- HANDLERS ---
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const onView = useCallback((newView) => setView(newView), [setView]);

  const handleSelectSlot = (slotInfo) => {
    if (!canEdit) return;
    setSelectedSlot(slotInfo);
    setNewEvent({ 
        ...newEvent, 
        start: toDateTimeLocal(slotInfo.start), 
        end: toDateTimeLocal(slotInfo.end) 
    });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    if (event.isPublic) {
        alert("This is a public holiday. You cannot delete it.");
        return;
    }
    if (!canEdit) return;
    if(window.confirm(`Delete event "${event.title}"?`)) {
        dispatch(deleteEvent(event._id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newEvent.title || !newEvent.start || !newEvent.end) return;
    
    const eventData = {
        ...newEvent,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end)
    };

    dispatch(createEvent(eventData));
    setShowModal(false);
    setNewEvent({ title: '', type: 'class', start: '', end: '' });
  };

  // --- STYLING ---
  const eventStyleGetter = (event) => {
    let backgroundColor = '#3b82f6';
    let borderLeft = '4px solid #1d4ed8';
    let color = '#ffffff';

    if (event.type === 'exam') { backgroundColor = '#ef4444'; borderLeft = '4px solid #991b1b'; }
    if (event.type === 'holiday') { backgroundColor = '#10b981'; borderLeft = '4px solid #065f46'; }
    if (event.type === 'meeting') { backgroundColor = '#f59e0b'; borderLeft = '4px solid #b45309'; }
    if (event.type === 'class') { backgroundColor = '#6366f1'; borderLeft = '4px solid #4338ca'; }

    return {
      style: {
        backgroundColor,
        color,
        borderLeft,
        borderRadius: '4px',
        opacity: 0.9,
        border: '0px',
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        padding: '2px 4px'
      }
    };
  };

  const dayPropGetter = (date) => {
    const day = date.getDay();
    if (day === 6) return { className: 'bg-red-50', style: { backgroundColor: '#fef2f2' } };
    return {};
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 h-full flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <CalendarIcon className="text-emerald-600"/> Event Calendar
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span> Exam</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> Class</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Meeting</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Holiday</span>
            </div>
        </div>
        {canEdit && (
            <button 
                onClick={() => { 
                    const now = new Date();
                    const end = new Date(); end.setHours(now.getHours() + 1);
                    setNewEvent({ ...newEvent, start: toDateTimeLocal(now), end: toDateTimeLocal(end) });
                    setShowModal(true); 
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm text-sm"
            >
                <Plus size={16} /> Add Event
            </button>
        )}
      </div>

      {/* Main Calendar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 min-h-[600px] calendar-container">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable={canEdit}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          view={view}
          date={date}
          onView={onView}
          onNavigate={onNavigate}
          popup
        />
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Add New Event</h3>
                    <button onClick={() => setShowModal(false)}><X size={20} className="text-slate-400 hover:text-slate-600"/></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Title</label>
                        <input 
                            autoFocus
                            className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                            placeholder="e.g. JLPT Exam"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start Time</label>
                            <input 
                                type="datetime-local"
                                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
                                value={newEvent.start}
                                onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">End Time</label>
                            <input 
                                type="datetime-local"
                                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm"
                                value={newEvent.end}
                                onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Type</label>
                        <select 
                            className="w-full border border-slate-300 rounded-lg p-2.5 bg-white"
                            value={newEvent.type}
                            onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                        >
                            <option value="class">Class (Shows Time)</option>
                            <option value="exam">Exam (Shows Time)</option>
                            <option value="meeting">Meeting (Shows Time)</option>
                            <option value="holiday">Holiday (All Day)</option>
                            <option value="deadline">Deadline (All Day)</option>
                            <option value="other">Other (All Day)</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium text-sm">Cancel</button>
                        <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 text-sm shadow-sm">Save Event</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* CSS Overrides */}
      <style>{`
        .rbc-header:nth-child(7) { color: #ef4444 !important; background-color: #fef2f2; }
        .rbc-month-row .rbc-date-cell:nth-child(7) { color: #ef4444; font-weight: bold; }
        .rbc-today { background-color: #f0fdf4 !important; }
        .rbc-event { box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .rbc-toolbar button { font-size: 13px; font-weight: 600; color: #475569; }
        .rbc-toolbar button.rbc-active { background-color: #e2e8f0; color: #0f172a; box-shadow: none; }
      `}</style>

    </div>
  );
}