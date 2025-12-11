import { Bell, Search } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default function Header({ user, isOpen }) {
    return (
        <header 
            className={`fixed top-0 right-0 z-30 h-16 bg-white border-b border-slate-200 transition-all duration-300 flex items-center justify-between px-6 md:px-8`}
            style={{ width: `calc(100% - ${isOpen ? '256px' : '80px'})` }} // Adjust width based on sidebar
        >
            {/* Search Bar (Optional Widget Area) */}
            <div className="flex-1 max-w-xl">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search anything..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* Real-time Date (Mini) */}
                <div className="hidden lg:block text-xs font-medium text-slate-500 text-right leading-tight">
                    <div>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="text-emerald-600 font-bold">System Active</div>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <NotificationBell />
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-800">{user?.name}</div>
                        <div className="text-xs text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full inline-block">
                            {(user?.subRole || user?.role)?.replace(/_/g, ' ')}
                        </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    );
}