/**
 * CRM Sidebar Navigation
 * Premium Emerald Glass theme
 */
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    BarChart3,
    Briefcase,
    Building2,
    Calendar,
    Contact,
    Home,
    LogOut,
    Package,
    Target,
    TrendingUp,
    Phone,
    FileText,
    ClipboardList,
    ShoppingCart,
    ChevronRight,
    Sparkles,
    ArrowLeft
} from 'lucide-react';


const CRMSidebar = ({ isCollapsed }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = (user.role || '').trim().toUpperCase();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const allMenuItems = [
        { path: '/crm', name: 'Dashboard', icon: Home, exact: true, roles: ['ALL'] },
        { path: '/crm/leads', name: 'Clients (Leads)', icon: Target, roles: ['ALL'] },
        { path: '/crm/meetings', name: 'Meetings', icon: Calendar, roles: ['ALL'] },
        { path: '/crm/work-queue', name: 'Work Queue', icon: ClipboardList, roles: ['ALL'] },
        { path: '/crm/orders', name: 'Orders (Sales)', icon: ShoppingCart, roles: ['ADMIN', 'PARTNER'] },
        { path: '/crm/reports', name: 'Reports', icon: BarChart3, roles: ['ALL'] }
    ];

    const menuItems = allMenuItems.filter(item => 
        item.roles.includes('ALL') || item.roles.includes(userRole)
    );

    return (
        <aside 
            className={`fixed inset-y-0 left-0 z-50 transition-all duration-500 ease-in-out hidden lg:flex flex-col
                        ${isCollapsed ? 'w-24 p-4' : 'w-72 p-6'}`}
        >
            <div className="h-full glass-morphic rounded-[2.5rem] flex flex-col relative overflow-hidden border-teal-500/20">
                <div className="vnt-noise-overlay"></div>
                
                {/* Logo Section */}
                <div className={`p-8 ${isCollapsed ? 'items-center' : ''} flex flex-col`}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md relative group">
                            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                        </div>
                        {!isCollapsed && (
                            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">VNT<span className="text-sales-primary">CRM.</span></h1>
                                <p className="text-[10px] font-black text-sales-primary/60 uppercase tracking-[0.2em] mt-1">Growth Engine</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar py-2">
                    {menuItems.map((item) => {
                        const isActive = item.exact
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);
                        
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                                    ${isActive 
                                        ? 'bg-sales-primary text-white shadow-xl shadow-sales-primary/20 scale-[1.02]' 
                                        : 'text-slate-500 hover:bg-sales-primary/5 hover:text-sales-primary'
                                    }
                                    ${isCollapsed ? 'justify-center px-0' : ''}
                                `}
                            >
                                <div className={`relative ${isActive ? 'animate-bounce-subtle' : ''}`}>
                                    <item.icon size={20} className="shrink-0" />
                                </div>
                                {!isCollapsed && (
                                    <span className="text-sm font-bold tracking-tight flex-1">{item.name}</span>
                                )}
                                {!isCollapsed && isActive && (
                                    <ChevronRight size={14} className="opacity-50" />
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 mt-auto">
                    <div className={`glass-morphic bg-slate-900/5 border-white/40 p-3 rounded-3xl mb-4 ${isCollapsed ? 'p-2' : ''}`}>
                        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sales-primary to-teal-700 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-sales-primary/20">
                                {(user?.fullName || user?.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-black text-slate-800 truncate">{user?.fullName || user?.name || 'User'}</p>
                                    <p className="text-[9px] font-black text-sales-primary uppercase tracking-widest">{user?.role || 'Partner'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {['ADMIN', 'HR', 'PARTNER'].includes(userRole) && (
                        <button
                            onClick={() => navigate('/admin')}
                            className={`flex items-center gap-4 w-full px-5 py-3 mb-2 rounded-2xl text-slate-500 hover:text-sales-primary hover:bg-sales-primary/10 transition-all duration-300 group
                                       ${isCollapsed ? 'justify-center px-0' : ''}`}
                        >
                            <ArrowLeft size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
                            {!isCollapsed && <span className="text-sm font-bold tracking-tight text-[12px]">Back to Admin</span>}
                        </button>
                    )}
                    
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 group
                                   ${isCollapsed ? 'justify-center px-0' : ''}`}
                    >
                        <LogOut size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
                        {!isCollapsed && <span className="text-sm font-black uppercase tracking-widest text-[11px]">Sign Out</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default CRMSidebar;
