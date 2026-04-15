import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import KPICard from '../../components/KPICard';
import * as api from '../../services/adminApi';
import {
  Users,
  UserCheck,
  UserX,
  FileText,
  TrendingUp,
  Shield,
  Activity,
  Clock
} from 'lucide-react';
// Recharts removed
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await api.getDashboardStats();
      setStats(response.data.data);
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Error Loading Dashboard</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Live Telemetry
            </div>
            <h1 className="text-5xl md:text-[3.5rem] font-[900] text-slate-800 tracking-tighter leading-none mb-3">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-500">Console.</span>
            </h1>
            <div className="text-slate-400 font-bold uppercase tracking-widest text-[11px] flex items-center gap-3">
              <span>System Operations Overview</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Employees"
            value={stats?.counts?.totalEmployees || 0}
            icon={Users}
            trend="+12%"
            trendType="up"
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50"
          />
          <KPICard
            title="Active Users"
            value={stats?.counts?.activeUsers || 0}
            icon={UserCheck}
            trend="+5%"
            trendType="up"
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
          />
          <KPICard
            title="Pending Reports"
            value={stats?.pendingReports || 0}
            icon={FileText}
            trend={stats?.pendingReports > 0 ? "Action Needed" : "All Clear"}
            trendType={stats?.pendingReports > 0 ? "down" : "up"}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
          />
          <KPICard
            title="System Status"
            value="99.9%"
            icon={Activity}
            trend="Stable"
            trendType="up"
            iconColor="text-cyan-600"
            iconBg="bg-cyan-50"
          />
        </div>

        <div className="grid grid-cols-1 mt-6">
          {/* Today's Attendance Snapshot - Premium Version */}
          <div className="relative p-10 bg-white/60 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-[900] text-slate-800 tracking-tight">Today's Pulse</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Real-time attendance metric</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:border-emerald-200 transition-all flex items-center justify-between group/card hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-50 text-emerald-600 flex items-center justify-center ring-4 ring-emerald-50/50">
                    <UserCheck className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Present</div>
                </div>
                <div className="text-4xl font-[900] text-slate-800 group-hover/card:text-emerald-600 transition-colors relative z-10">{stats?.todayAttendance?.present || 0}</div>
              </div>

              <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:border-rose-200 transition-all flex items-center justify-between group/card hover:shadow-xl hover:shadow-rose-500/5 hover:-translate-y-1 duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-[1.25rem] bg-rose-50 text-rose-600 flex items-center justify-center ring-4 ring-rose-50/50">
                    <UserX className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Absent</div>
                </div>
                <div className="text-4xl font-[900] text-slate-800 group-hover/card:text-rose-600 transition-colors relative z-10">{stats?.todayAttendance?.absent || 0}</div>
              </div>

              <div className="p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:border-amber-200 transition-all flex items-center justify-between group/card hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-[1.25rem] bg-amber-50 text-amber-600 flex items-center justify-center ring-4 ring-amber-50/50">
                    <Clock className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Late</div>
                </div>
                <div className="text-4xl font-[900] text-slate-800 group-hover/card:text-amber-600 transition-colors relative z-10">{stats?.todayAttendance?.late || 0}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white/60 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-[900] text-slate-800 tracking-tight">Recent Registrations</h3>
            <button className="px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/60">
                  <th className="text-left py-5 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">User</th>
                  <th className="text-left py-5 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Role</th>
                  <th className="text-left py-5 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="text-right py-5 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentUsers?.map((user) => (
                  <tr key={user._id} className="group hover:bg-white transition-colors border-b border-slate-50 last:border-0">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 flex items-center justify-center font-black text-sm border border-indigo-100/50 shadow-inner group-hover:scale-105 transition-transform">
                          {(user.name || user.fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-[900] text-slate-800">{user.name || user.fullName}</div>
                          <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4">
                      <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100/50 shadow-sm">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 w-max rounded-full border border-slate-100">
                        <div className={`w-2 h-2 rounded-full shadow-sm ${user.isActive ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-rose-500 shadow-rose-500/50'}`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {user.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <button className="px-4 py-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-indigo-100">Manage</button>
                    </td>
                  </tr>
                ))}
                {(!stats?.recentUsers || stats.recentUsers.length === 0) && (
                  <tr>
                    <td colSpan="4" className="text-center py-12 text-slate-400 font-bold text-sm">No recent users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;