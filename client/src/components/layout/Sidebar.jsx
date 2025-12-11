import {
    Award,
    BookOpen,
    Building2,
    Calendar,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    FileText,
    GraduationCap,
    LogOut,
    MapPin,
    Settings,
    Shield,
    User,
    Users
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, activeView, setActiveView, role, onLogout }) {
    
    // Define Menu Items per Role
    const getMenuItems = () => {
        switch (role) {
            case 'super_admin':
                return [
                    { id: 'consultancies', label: 'Consultancies', icon: Building2 },
                    { id: 'holidays', label: 'Global Holidays', icon: Calendar },
                ];
            case 'consultancy_admin':
            case 'consultancy_staff': // Manager/Counselor see subsets, handled in logic or simplified here
                return [
                    { id: 'students', label: 'Students', icon: GraduationCap },
                    { id: 'universities', label: 'Universities', icon: Building2 },
                    { id: 'staff', label: 'Staff Management', icon: Shield },
                    { id: 'settings', label: 'Settings', icon: Settings },
                ];
            case 'student':
                return [
                    { id: 'personal', label: 'Personal Info', icon: User },
                    { id: 'address', label: 'Address', icon: MapPin },
                    { id: 'family', label: 'Family', icon: Users },
                    { id: 'academics', label: 'Academics', icon: Award },
                    { id: 'financial', label: 'Financial', icon: DollarSign },
                    { id: 'documents', label: 'Documents', icon: FileText },
                    { id: 'applications', label: 'Applications', icon: Building2 },
                    { id: 'sop', label: 'SOP Writer', icon: BookOpen },
                ];
            default:
                return [];
        }
    };

    const menuItems = getMenuItems();

    return (
        <aside 
            className={`fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300 border-r border-slate-800 ${isOpen ? 'w-64' : 'w-20'}`}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-center border-b border-slate-800 relative">
                <div className={`flex items-center gap-3 ${!isOpen && 'justify-center w-full'}`}>
                    <div className="bg-emerald-500 p-1.5 rounded-lg">
                        <span className="font-bold text-lg">JP</span>
                    </div>
                    {isOpen && <span className="font-bold text-xl tracking-tight">Visa SaaS</span>}
                </div>
                
                {/* Toggle Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-6 bg-slate-800 text-slate-400 p-1 rounded-full border border-slate-700 hover:text-white transition-colors"
                >
                    {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)] custom-scrollbar">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                            ${activeView === item.id 
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            } ${!isOpen && 'justify-center'}`}
                        title={!isOpen ? item.label : ''}
                    >
                        <item.icon size={20} className={`${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                        {isOpen && <span className="font-medium text-sm">{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Bottom Section (User/Logout) */}
            <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
                <button 
                    onClick={onLogout}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${!isOpen && 'justify-center'}`}
                >
                    <LogOut size={20} />
                    {isOpen && <span className="font-medium text-sm">Logout</span>}
                </button>
            </div>
        </aside>
    );
}