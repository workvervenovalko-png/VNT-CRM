import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeamLeaderLayout from '../../components/TeamLeaderLayout';
import { Users, AlertCircle, PlusCircle, Calendar, Briefcase, Activity } from 'lucide-react';

const TeamLeaderDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Assign task modal state
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [taskData, setTaskData] = useState({ title: '', description: '', dueDate: '' });
  const [assigning, setAssigning] = useState(false);

  // View details modal state
  const [viewIntern, setViewIntern] = useState(null);
  const [internDetails, setInternDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    fetchInterns();
  }, []);

  const fetchInterns = async () => {
    try {
      setLoading(true);
      const res = await api.get('/team-leader/interns');
      if (res.data.success) {
        setInterns(res.data.data);
      }
    } catch (err) {
      setError('Failed to load interns');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!taskData.title) return alert('Task title is required');
    
    setAssigning(true);
    try {
      const res = await api.post(`/team-leader/interns/${selectedIntern._id}/assign-task`, taskData);
      if (res.data.success) {
        alert('Task assigned successfully!');
        setSelectedIntern(null);
        setTaskData({ title: '', description: '', dueDate: '' });
        fetchInterns(); // Refresh to update task count
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign task');
    } finally {
      setAssigning(false);
    }
  };

  const handleViewDetails = async (intern) => {
    setViewIntern(intern);
    setLoadingDetails(true);
    try {
      const res = await api.get(`/team-leader/interns/${intern._id}`);
      if (res.data.success) {
        setInternDetails(res.data.data);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load intern details');
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <TeamLeaderLayout>
      <div className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Team</h1>
            <p className="text-slate-500">Manage your assigned interns and track their progress</p>
          </div>
          <button
            onClick={() => {
              if (interns.length === 0) return alert('No interns to assign a task to.');
              setSelectedIntern(interns[0]);
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Create Task
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Interns</p>
              <h3 className="text-2xl font-bold text-slate-800">{interns.length}</h3>
            </div>
          </div>
        </div>

        {/* Interns List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Team Members</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="px-6 py-4 font-medium">Intern</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Attendance</th>
                  <th className="px-6 py-4 font-medium">Active Tasks</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading team data...</td>
                  </tr>
                ) : interns.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No interns assigned to your team yet.</td>
                  </tr>
                ) : (
                  interns.map((intern) => (
                    <tr key={intern._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                            {intern.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{intern.fullName}</p>
                            <p className="text-xs text-slate-500 font-mono">{intern.internId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-800">{intern.email}</p>
                        <p className="text-xs text-slate-500">{intern.mobile}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          {intern.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          intern.todayAttendance === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' :
                          intern.todayAttendance === 'ABSENT' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {intern.todayAttendance}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          <Briefcase size={16} className="text-indigo-500" />
                          {intern.assignedTasksCount} tasks
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(intern)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-semibold transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => setSelectedIntern(intern)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <PlusCircle size={16} />
                            Task
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Assign Task Modal */}
      {selectedIntern && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-800">Assign New Task</h3>
              <p className="text-sm text-slate-500 mt-1">To: {selectedIntern.fullName}</p>
            </div>
            
            <form onSubmit={handleAssignTask} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Intern</label>
                <select
                  value={selectedIntern?._id || ''}
                  onChange={(e) => {
                    const int = interns.find(i => i._id === e.target.value);
                    if (int) setSelectedIntern(int);
                  }}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  {interns.map(i => (
                    <option key={i._id} value={i._id}>{i.fullName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskData.title}
                  onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  placeholder="e.g. Build Login Component"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={taskData.description}
                  onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all min-h-[100px]"
                  placeholder="Task details..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Due Date</label>
                <input
                  type="date"
                  value={taskData.dueDate}
                  onChange={(e) => setTaskData({...taskData, dueDate: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedIntern(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-70 flex items-center gap-2"
                >
                  {assigning ? 'Assigning...' : 'Assign Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewIntern && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Intern Profile</h3>
                <p className="text-sm text-slate-500 mt-1">{viewIntern.fullName}</p>
              </div>
              <button onClick={() => setViewIntern(null)} className="text-slate-400 hover:text-slate-600">Close</button>
            </div>
            
            <div className="p-6">
              {loadingDetails ? (
                <p className="text-slate-500">Loading details...</p>
              ) : internDetails ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm font-medium text-slate-800">{internDetails.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile</p>
                      <p className="text-sm font-medium text-slate-800">{internDetails.mobile}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Department</p>
                      <p className="text-sm font-medium text-slate-800">{internDetails.department}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Internship Type</p>
                      <p className="text-sm font-medium text-slate-800">{internDetails.internDetails?.internship?.type || 'N/A'}</p>
                    </div>
                  </div>

                  {internDetails.internDetails?.education && (
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-slate-800 mb-3">Education</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">College</p>
                          <p className="text-sm font-medium text-slate-800">{internDetails.internDetails.education.collegeName || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Degree / Branch</p>
                          <p className="text-sm font-medium text-slate-800">{internDetails.internDetails.education.degree} - {internDetails.internDetails.education.branch}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Passout Year</p>
                          <p className="text-sm font-medium text-slate-800">{internDetails.internDetails.education.expectedPassoutYear || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-800 mb-3">Project Status</h4>
                    <p className="text-sm font-medium text-slate-800">
                      {internDetails.internDetails?.projectWork?.finalProjectSubmitted ? '✅ Submitted' : '⏳ Pending'}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500">Failed to load details.</p>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setViewIntern(null)}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </TeamLeaderLayout>
  );
};

export default TeamLeaderDashboard;
