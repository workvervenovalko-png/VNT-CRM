import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MapPin,
  Calendar,
  Settings,
  Bell,
  Menu,
  LogOut,
  ChevronDown,
  ArrowLeft,
  Download,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import NotificationDropdown from './ui/NotificationDropdown';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navigation = [
    { name: 'Analytics', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Team Hub', path: '/admin/users', icon: Users },
    { name: 'Attendance', path: '/admin/attendance', icon: Calendar },
    { name: 'Geo-Tracking', path: '/admin/geo-logs', icon: MapPin },
    { name: 'Export Center', path: '/admin/export', icon: Download },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex h-screen relative font-sans overflow-hidden bg-white">
      {/* Premium Mesh Background */}
      <div className="mesh-gradient opacity-60"></div>
      
      {/* Sidebar Overlay */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        ></div>
      )}

      {/* Modern Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 h-screen transition-all duration-500 ease-in-out 
                    ${isSidebarOpen ? 'w-80 p-6 translate-x-0' : '-translate-x-full lg:w-24 lg:p-4 lg:translate-x-0'}`}
      >
        <div className="h-full glass-morphic flex flex-col relative overflow-hidden border-indigo-500/10">
          <div className="vnt-noise-overlay"></div>
          
          <div className={`p-8 ${isSidebarOpen ? 'mb-8' : 'mb-8 justify-center'} flex items-center gap-4`}>
            <div className="w-12 h-12 bg-workspace-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-workspace-primary/40 relative group">
              <ShieldCheck className="text-white w-6 h-6" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
            {isSidebarOpen && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                    <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">VNT<span className="text-workspace-primary">Workspace.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Enterprise Core</p>
                </div>
            )}
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative
                   ${isActive
                      ? 'bg-workspace-primary text-white shadow-2xl shadow-workspace-primary/30 scale-[1.02]'
                      : 'text-slate-500 hover:bg-workspace-primary/5 hover:text-workspace-primary'
                    }
                   ${!isSidebarOpen ? 'justify-center px-0' : ''}`
                }
              >
                <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-500 group-hover:scale-110`} />
                {isSidebarOpen && <span className="text-[13px] font-black uppercase tracking-wider">{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 pt-6 border-t border-slate-100/50">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 group
                         ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
            >
              <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Modern Sticky Header */}
        <header className="px-10 py-5 flex items-center justify-between sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-slate-100">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all shadow-sm active:scale-95 group"
            >
              <Menu className="w-5 h-5 text-slate-600 group-hover:text-workspace-primary transition-colors" />
            </button>
            <div className="hidden md:block">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5 leading-none">Status</div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-slate-700">Systems Operational</span>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <NotificationDropdown />
            </div>

            <div className="h-8 w-px bg-slate-200/50 mx-1"></div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pr-2 pl-4 py-2 hover:bg-white/80 rounded-[1.25rem] transition-all border border-transparent hover:border-white hover:shadow-xl hover:shadow-indigo-500/5 group"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-[13px] font-[900] text-slate-800 leading-none group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{user?.name || user?.fullName || 'Admin'}</div>
                  <div className="text-[9px] text-indigo-500 font-bold uppercase mt-1 tracking-[0.2em]">Administrator</div>
                </div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-600/30 overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{(user?.name || user?.fullName || 'A').charAt(0)}</span>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] border border-white p-3 z-20 animate-in fade-in zoom-in-95 duration-500 slide-in-from-top-4">
                    <div className="p-6 bg-slate-50/50 rounded-[2rem] mb-2 border border-slate-100/50">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-600/20">
                          {(user?.name || user?.fullName || 'A').charAt(0)}
                        </div>
                        <div>
                          <div className="text-base font-black text-slate-800 leading-tight">{user?.name || user?.fullName}</div>
                          <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-0.5">Admin Access</div>
                        </div>
                      </div>
                      <div className="bg-white/60 p-3 rounded-xl border border-white/50">
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Email</div>
                        <div className="text-xs font-bold text-slate-600 truncate">{user?.email}</div>
                      </div>
                    </div>

                    <div className="px-2 space-y-1">
                      <div className="h-px bg-slate-100 mx-4 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-5 py-4 text-sm font-black text-rose-600 hover:bg-rose-50 rounded-2xl transition-all group/logout"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4" />
                          <span className="uppercase tracking-widest text-[11px]">Sign Out</span>
                        </div>
                        <ArrowLeft className="w-4 h-4 opacity-0 group-hover/logout:opacity-100 translate-x-2 group-hover/logout:translate-x-0 transition-all rotate-180" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 px-10 pt-10 pb-10">
          {children}
        </div> {/* Using children prop as per original code structure, though usually Layout wraps Routes in App.jsx */}
      </main>
    </div>
  );
};

export default AdminLayout;
