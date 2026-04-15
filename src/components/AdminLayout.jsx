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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    <div className="flex h-screen relative font-sans overflow-hidden bg-[#f4f7f9] selection:bg-indigo-500 selection:text-white">
      {/* Ultra Premium Ambient Spatial Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 mix-blend-multiply filter blur-[100px] animate-pulse"></div>
         <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-emerald-500/10 mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
         <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      <div className="vnt-noise-overlay opacity-[0.04] z-0"></div>
      
      {/* Sidebar Overlay */}
      {!isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden transition-all duration-500"
          onClick={() => setIsSidebarOpen(true)}
        ></div>
      )}

      {/* Floating Spatial Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 h-screen transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] 
                    ${isSidebarOpen ? 'w-[320px] translate-x-0' : '-translate-x-full lg:w-32 lg:translate-x-0'} flex`}
      >
        <div className={`flex-1 m-4 sm:my-6 sm:ml-6 flex flex-col relative overflow-hidden bg-white/70 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 transition-all duration-500
                        ${isSidebarOpen ? 'rounded-[2.5rem]' : 'rounded-[2rem]'}`}>
          
          <div className={`p-8 ${isSidebarOpen ? 'mb-4' : 'mb-8 justify-center p-6'} flex items-center gap-4 relative z-10`}>
            <div className={`shrink-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 relative group transition-all duration-500 ${isSidebarOpen ? 'w-12 h-12' : 'w-14 h-14 rounded-3xl'}`}>
              <ShieldCheck className="text-white w-6 h-6" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
            {isSidebarOpen && (
                <div className="animate-in fade-in slide-in-from-left-2 duration-500 overflow-hidden">
                    <h1 className="text-2xl font-[900] text-slate-800 tracking-tighter leading-none">VNT<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Space.</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 whitespace-nowrap">Enterprise Core</p>
                </div>
            )}
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar relative z-10">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                   ${isActive
                      ? 'bg-white text-indigo-700 shadow-xl shadow-indigo-900/5 scale-[1.02] border border-indigo-50/50'
                      : 'text-slate-500 hover:bg-white/50 hover:text-indigo-600'
                    }
                   ${!isSidebarOpen ? 'justify-center px-0 py-5 mx-2' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-50 transition-transform duration-1000 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></div>
                    <item.icon className={`w-5 h-5 shrink-0 transition-all duration-500 relative z-10 ${isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-110'}`} />
                    {isSidebarOpen && <span className="text-[13px] font-black uppercase tracking-widest relative z-10">{item.name}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 pt-6 relative z-10">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50/80 hover:border-rose-100/50 border border-transparent transition-all duration-300 group
                         ${!isSidebarOpen ? 'justify-center px-0' : ''}`}
            >
              <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1 duration-300" />
              {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest transition-colors duration-300">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto no-scrollbar relative z-10">
        
        {/* Floating Header */}
        <div className="pt-4 sm:pt-6 px-4 sm:px-8 lg:px-10 sticky top-0 z-50">
          <header className="px-6 sm:px-8 py-4 bg-white/80 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 rounded-[2rem] flex items-center justify-between transition-all">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl border border-transparent hover:border-indigo-100 transition-all shadow-sm active:scale-95 group text-slate-500"
              >
                <Menu className="w-5 h-5 transition-colors" />
              </button>
              <div className="hidden md:flex flex-col">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5 leading-none">Global Status</div>
                  <div className="flex items-center gap-2">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </div>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Systems Operational</span>
                  </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <NotificationDropdown />
              </div>

              <div className="h-8 w-px bg-slate-200/50 hidden sm:block"></div>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center sm:gap-3 pr-2 sm:pl-4 py-2 hover:bg-slate-50 rounded-[1.25rem] transition-all border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-indigo-500/5 group"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-[13px] font-[900] text-slate-800 leading-none group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{user?.name || user?.fullName || 'Admin'}</div>
                    <div className="text-[9px] text-indigo-500 font-bold uppercase mt-1 tracking-[0.2em]">Administrator</div>
                  </div>
                  <div className="relative w-10 h-10 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/20 overflow-hidden ring-2 ring-white ml-2 sm:ml-0 group-hover:ring-indigo-100 transition-all">
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span>{(user?.name || user?.fullName || 'A').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 ml-1 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] border border-white/50 p-3 z-20 animate-in fade-in zoom-in-95 duration-500 slide-in-from-top-4 origin-top-right">
                      <div className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-[2rem] mb-2 border border-slate-100/50">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-600/20">
                            {(user?.name || user?.fullName || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-base font-black text-slate-800 leading-tight">{user?.name || user?.fullName}</div>
                            <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mt-0.5">Admin Access</div>
                          </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-white shadow-sm">
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Email Node</div>
                          <div className="text-xs font-bold text-slate-600 truncate">{user?.email}</div>
                        </div>
                      </div>

                      <div className="px-2 space-y-1">
                        <div className="h-px bg-slate-100 mx-4 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-between px-5 py-4 text-sm font-black text-rose-600 hover:bg-rose-50 hover:shadow-inner rounded-2xl transition-all group/logout"
                        >
                          <div className="flex items-center gap-3">
                            <LogOut className="w-4 h-4" />
                            <span className="uppercase tracking-widest text-[11px]">Secure Checkout</span>
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
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 px-4 sm:px-8 lg:px-10 pb-12 pt-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-12 duration-[1000ms]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
