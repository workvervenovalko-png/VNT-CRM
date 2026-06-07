import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminLayout from '../../components/AdminLayout';
import { Users, AlertCircle, Save } from 'lucide-react';

const TeamAssignment = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedTL, setSelectedTL] = useState('');
  const [selectedInterns, setSelectedInterns] = useState([]);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Fetch users with no limits for admin assignment
      const [tlRes, intRes] = await Promise.all([
        api.get('/admin/users?role=TEAM_LEADER&limit=100'),
        api.get('/admin/users?role=INTERN&limit=500')
      ]);
      
      if (tlRes.data.success) {
        setTeamLeaders(tlRes.data.data.filter(u => u.role === 'TEAM_LEADER'));
      }
      
      // Wait, admin /users might not be the best, but we'll try
      if (intRes.data.success) {
        setInterns(intRes.data.data.filter(u => u.role === 'INTERN'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (internId) => {
    if (selectedInterns.includes(internId)) {
      setSelectedInterns(selectedInterns.filter(id => id !== internId));
    } else {
      setSelectedInterns([...selectedInterns, internId]);
    }
  };

  const handleAssign = async () => {
    if (!selectedTL) return alert('Please select a Team Leader');
    if (selectedInterns.length === 0) return alert('Please select at least one intern');
    
    setAssigning(true);
    try {
      const res = await api.post('/admin/assign-team', {
        teamLeaderId: selectedTL,
        internIds: selectedInterns
      });
      if (res.data.success) {
        alert(res.data.message);
        setSelectedTL('');
        setSelectedInterns([]);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign team');
    } finally {
      setAssigning(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Team Assignment</h1>
          <p className="text-slate-500">Map Interns to specific Team Leaders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step 1: Select Team Leader */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
            <h2 className="text-lg font-bold text-slate-800 mb-4">1. Select Team Leader</h2>
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : (
              <div className="space-y-3">
                {teamLeaders.map(tl => (
                  <label key={tl._id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedTL === tl._id ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-300'}`}>
                    <input
                      type="radio"
                      name="teamLeader"
                      value={tl._id}
                      checked={selectedTL === tl._id}
                      onChange={(e) => setSelectedTL(e.target.value)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{tl.fullName}</p>
                      <p className="text-xs text-slate-500">{tl.email}</p>
                    </div>
                  </label>
                ))}
                {teamLeaders.length === 0 && (
                  <p className="text-sm text-slate-500">No Team Leaders found. Create one from the Users tab.</p>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Select Interns */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">2. Select Interns</h2>
              <button
                onClick={handleAssign}
                disabled={assigning || !selectedTL || selectedInterns.length === 0}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                {assigning ? 'Assigning...' : 'Assign Team'}
              </button>
            </div>
            
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                {interns.map(intern => (
                  <label key={intern._id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedInterns.includes(intern._id) ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-300'}`}>
                    <input
                      type="checkbox"
                      checked={selectedInterns.includes(intern._id)}
                      onChange={() => handleCheckboxChange(intern._id)}
                      className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{intern.fullName}</p>
                      <p className="text-xs text-slate-500">{intern.email}</p>
                      <p className="text-xs text-slate-400 mt-1">Dep: {intern.department || 'N/A'}</p>
                    </div>
                  </label>
                ))}
                {interns.length === 0 && (
                  <p className="text-sm text-slate-500">No Interns found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TeamAssignment;
