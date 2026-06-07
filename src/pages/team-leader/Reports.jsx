import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeamLeaderLayout from '../../components/TeamLeaderLayout';
import { FileText, Clock, Calendar } from 'lucide-react';

const TeamReports = () => {
  const [reports, setReports] = useState({ daily: [], weekly: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/team-leader/reports');
      if (res.data.success) {
        setReports(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeamLeaderLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Progress Reports</h1>
          <p className="text-slate-500">Review daily task updates and weekly progress reports from your team</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'daily' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Daily Task Updates
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === 'weekly' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Weekly Progress Reports
          </button>
        </div>

        <div className="space-y-6">
          {loading ? (
            <p className="text-slate-500">Loading reports...</p>
          ) : activeTab === 'daily' ? (
            reports.daily.length === 0 ? (
              <p className="text-slate-500">No daily task updates found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.daily.map((report, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{report.internName}</h3>
                        <p className="text-xs text-slate-400 font-semibold">{new Date(report.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{report.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            reports.weekly.length === 0 ? (
              <p className="text-slate-500">No weekly progress reports found.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reports.weekly.map((report, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{report.internName}</h3>
                          <p className="text-sm text-slate-500">Week {report.weekNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Submitted</p>
                        <p className="text-sm font-semibold text-slate-700">{new Date(report.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Summary</h4>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <p className="text-sm text-slate-700">{report.summary}</p>
                        </div>
                      </div>
                      
                      {report.challenges && (
                        <div>
                          <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Challenges</h4>
                          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100/50">
                            <p className="text-sm text-amber-800">{report.challenges}</p>
                          </div>
                        </div>
                      )}
                      
                      {report.nextWeekPlan && (
                        <div>
                          <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Next Week Plan</h4>
                          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100/50">
                            <p className="text-sm text-emerald-800">{report.nextWeekPlan}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </TeamLeaderLayout>
  );
};

export default TeamReports;
