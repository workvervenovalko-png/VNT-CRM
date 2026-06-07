import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeamLeaderLayout from '../../components/TeamLeaderLayout';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';

const TeamAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, [startDate, endDate]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      let url = '/team-leader/attendance';
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const res = await api.get(url);
      if (res.data.success) {
        setAttendance(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PRESENT': return 'bg-emerald-100 text-emerald-800';
      case 'ABSENT': return 'bg-rose-100 text-rose-800';
      case 'HALF_DAY': return 'bg-amber-100 text-amber-800';
      case 'LATE': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <TeamLeaderLayout>
      <div className="p-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Team Attendance</h1>
            <p className="text-slate-500">View historical attendance records for your team</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <Filter size={18} className="text-slate-400 ml-2" />
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 outline-none"
            />
            <span className="text-slate-400">to</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 outline-none"
            />
            <button 
              onClick={() => { setStartDate(''); setEndDate(''); }}
              className="text-xs text-indigo-600 font-semibold px-2 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Intern</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Check In</th>
                  <th className="px-6 py-4 font-medium">Check Out</th>
                  <th className="px-6 py-4 font-medium">Work Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">Loading attendance...</td>
                  </tr>
                ) : attendance.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">No attendance records found.</td>
                  </tr>
                ) : (
                  attendance.map((record) => (
                    <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-800">
                        {record.user?.fullName || 'Unknown User'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {record.checkIn?.time ? new Date(record.checkIn.time).toLocaleTimeString() : '--:--'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {record.checkOut?.time ? new Date(record.checkOut.time).toLocaleTimeString() : '--:--'}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        {record.workHours ? `${Math.floor(record.workHours / 60)}h ${record.workHours % 60}m` : '0h'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TeamLeaderLayout>
  );
};

export default TeamAttendance;
