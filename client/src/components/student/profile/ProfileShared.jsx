import { CheckCircle2 } from 'lucide-react';

export function SectionHeader({ title, subtitle, icon }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
                {icon}
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            </div>
            <p className="text-slate-500 font-medium pl-9">{subtitle}</p>
        </div>
    );
}

export function InfoCard({ title, icon: Icon, color, children }) {
    return (
        <div className={`bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative overflow-hidden group hover:border-${color}-300 transition-all`}>
            <div className={`absolute top-0 left-0 w-1.5 bg-gradient-to-b from-${color}-500 to-${color}-600 h-full`}></div>
            <h3 className="font-bold text-slate-800 flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className={`p-2 bg-${color}-100 rounded-lg text-${color}-600`}><Icon size={20}/></div>
                <span className="text-lg">{title}</span>
            </h3>
            {children}
        </div>
    );
}

export function InputGroup({ label, type = "text", placeholder, value, onChange, as, children, icon }) {
    return (
        <div className="w-full group">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-emerald-600 transition-colors">{label}</label>
            {as === 'select' ? (
                <div className="relative">
                    <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl appearance-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium shadow-sm" value={value || ''} onChange={onChange}>
                        {children}
                    </select>
                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    {icon && <div className="absolute left-3 top-3 text-slate-400">{icon}</div>}
                    <input 
                        type={type} 
                        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all placeholder-slate-400 text-slate-700 font-medium shadow-sm`}
                        placeholder={placeholder} 
                        value={value || ''} 
                        onChange={onChange} 
                    />
                </div>
            )}
        </div>
    );
}

export function TabButton({ id, label, icon, active, set, highlight, color = 'green' }) {
    const isActive = active === id;
    
    let activeClass = '';
    let inactiveClass = 'text-slate-500 hover:text-slate-800 hover:bg-slate-50';

    if (highlight) {
        activeClass = 'text-blue-700 bg-gradient-to-br from-blue-50 to-blue-100/50 border-b-2 border-blue-500';
        inactiveClass = 'text-blue-600/70 hover:text-blue-700 hover:bg-blue-50/50';
    } else if (color === 'purple') {
        activeClass = 'text-purple-700 border-b-2 border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100/50';
    } else if (color === 'red') {
        activeClass = 'text-red-700 border-b-2 border-red-500 bg-gradient-to-br from-red-50 to-red-100/50';
    } else {
        activeClass = 'text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50/50';
    }

    return (
        <button 
            onClick={() => set(id)} 
            className={`
                py-3 px-5 text-sm font-bold flex items-center justify-center gap-2 transition-all whitespace-nowrap rounded-t-xl
                ${isActive ? activeClass : inactiveClass}
            `}
        >
            {icon} <span className="hidden sm:inline">{label}</span><span className="sm:hidden">{label.split(' ')[0]}</span>
        </button>
    );
}

export function GenerationCard({ title, desc, icon: Icon, onClick }) {
    return (
        <button onClick={onClick} className="flex flex-col text-left h-full bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group hover:-translate-y-1">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-2xl w-fit shadow-sm mb-4 border border-slate-200 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:border-emerald-50 transition-colors duration-300">
                <Icon size={24} className="text-slate-600 group-hover:text-white" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{desc}</p>
        </button>
    );
}

export function ReviewItem({ label, value, icon }) {
    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/30 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md">
            <div className="flex items-center gap-2 mb-2">
                <div className="text-slate-400">{icon}</div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</p>
            </div>
            <p className="text-base text-slate-900 font-bold break-words pl-6">{value || <span className="text-slate-400 font-normal italic">Not set</span>}</p>
        </div>
    );
}