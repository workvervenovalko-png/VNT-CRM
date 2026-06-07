import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeamLeaderLayout from '../../components/TeamLeaderLayout';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';

const TeamLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await api.get('/team-leader/leaves');
      if (res.data.success) {
        setLeaves(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (leaveId, status) => {
    try {
      const reviewComments = window.prompt(`Enter review comments for ${status}:`);
      if (reviewComments === null) return; // cancelled

      const res = await api.patch(`/team-leader/leaves/${leaveId}`, { status, reviewComments });
      if (res.data.success) {
        fetchLeaves();
      }
    } catch (err) {
      alert('Failed to update leave status');
    }
  };

  return (
    <TeamLeaderLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Leave Requests</h1>
          <p className="text-slate-500">Review and approve leave requests from your team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-slate-500 col-span-full">Loading leave requests...</p>
          ) : leaves.length === 0 ? (
            <p className="text-slate-500 col-span-full">No leave requests found.</p>
          ) : (
            leaves.map(leave => (
              <div key={leave._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800">{leave.user?.fullName}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{leave.type} Leave</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                    leave.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {leave.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-indigo-500" />
                    {new Date(leave.startDate).toLocaleDateString()}
                  </div>
                  <span className="text-slate-300">→</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-indigo-500" />
                    {new Date(leave.endDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Reason</p>
                  <p className="text-sm text-slate-700">{leave.reason}</p>
                  {leave.isHalfDay && (
                    <p className="text-xs text-amber-600 font-semibold mt-2">({leave.halfDayType} Half Day)</p>
                  )}
                </div>

                {leave.status === 'PENDING' && (
                  <div className="flex gap-3 pt-4 border-t border-slate-100 mt-auto">
                    <button 
                      onClick={() => handleReview(leave._id, 'REJECTED')}
                      className="flex-1 py-2 flex items-center justify-center gap-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-sm transition-colors"
                    >
                      <XCircle size={18} /> Reject
                    </button>
                    <button 
                      onClick={() => handleReview(leave._id, 'APPROVED')}
                      className="flex-1 py-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-semibold text-sm transition-colors"
                    >
                      <CheckCircle size={18} /> Approve
                    </button>
                  </div>
                )}
                {leave.reviewComments && (
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Your Comments</p>
                    <p className="text-sm text-slate-600 italic">{leave.reviewComments}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </TeamLeaderLayout>
  );
};

export default TeamLeaves;
