 


import { Bell, Check, Info, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import io from 'socket.io-client';

// Initialize Socket once
const socket = io.connect("http://localhost:5000");

export default function NotificationBell() {
    const { user } = useSelector((state) => state.auth);
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    
    // Ref for detecting clicks outside
    const dropdownRef = useRef(null);

    // 1. Socket Listener
    useEffect(() => {
        const userId = user?.id || user?._id;

        if (!userId) return;

        console.log("[NOTIFICATIONS] Connected to room:", userId);
        socket.emit("join_room", userId);

        socket.on("receive_notification", (data) => {
            setNotifications((prev) => [data, ...prev]);
            setUnreadCount((prev) => prev + 1);
            toast.info(data.message, { position: "bottom-right" });
            
            try {
                const audio = new Audio('/notification.mp3');
                audio.play();
            } catch(e) { console.error("Audio error", e); }
        });

        return () => {
            socket.off("receive_notification");
        };
    }, [user]);

    // 2. Click Outside to Close
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setUnreadCount(0);
    };

    const clearNotification = (id, e) => {
        e.stopPropagation();
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
        setIsOpen(false);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon */}
            <button 
                onClick={handleOpen} 
                className={`relative p-2.5 rounded-full transition-all duration-200 ${isOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel - High Z-Index to float above everything */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
                            <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md">{notifications.length}</span>
                        </div>
                        {notifications.length > 0 && (
                            <button onClick={clearAll} className="text-[10px] text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                                <Trash2 size={12}/> Clear All
                            </button>
                        )}
                    </div>

                    {/* List */}
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                        {notifications.length === 0 ? (
                            <div className="p-10 text-center flex flex-col items-center text-slate-400">
                                <div className="bg-slate-50 p-3 rounded-full mb-3">
                                    <Bell size={24} className="opacity-20" />
                                </div>
                                <p className="text-sm font-medium">All caught up!</p>
                                <p className="text-xs mt-1 opacity-70">No new notifications.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="p-4 hover:bg-slate-50 transition-colors relative group cursor-default">
                                        <div className="flex gap-3 items-start">
                                            {/* Icon Badge */}
                                            <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                                                notif.type === 'success' 
                                                    ? 'bg-green-50 border-green-100 text-green-600' 
                                                    : 'bg-blue-50 border-blue-100 text-blue-600'
                                            }`}>
                                                {notif.type === 'success' ? <Check size={14} /> : <Info size={14} />}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 pr-4">
                                                <div className="flex justify-between items-start">
                                                    <p className="text-sm font-semibold text-slate-800">{notif.title}</p>
                                                    <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                                                        {new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                                            </div>

                                            {/* Delete Action */}
                                            <button 
                                                onClick={(e) => clearNotification(notif.id, e)}
                                                className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                                                title="Dismiss"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}