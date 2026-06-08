import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeamLeaderLayout from '../../components/TeamLeaderLayout';
import { Video, Calendar, Plus, Users, Link as LinkIcon, Clock } from 'lucide-react';

const TeamMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [colleagues, setColleagues] = useState({ interns: [], adminsAndPartners: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    meetLink: '',
    scheduledAt: '',
    attendees: []
  });
  const [scheduling, setScheduling] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [meetingsRes, colleaguesRes] = await Promise.all([
        api.get('/meetings'),
        api.get('/team-leader/colleagues')
      ]);

      if (meetingsRes.data.success) {
        setMeetings(meetingsRes.data.data);
      }
      if (colleaguesRes.data.success) {
        setColleagues(colleaguesRes.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendeeToggle = (userId) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.includes(userId)
        ? prev.attendees.filter(id => id !== userId)
        : [...prev.attendees, userId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.attendees.length === 0) {
      return alert('Please select at least one attendee');
    }
    
    try {
      setScheduling(true);
      const res = await api.post('/team-leader/meetings', formData);
      if (res.data.success) {
        alert('Meeting scheduled and invitations sent!');
        setShowForm(false);
        setFormData({ title: '', description: '', meetLink: '', scheduledAt: '', attendees: [] });
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to schedule meeting');
    } finally {
      setScheduling(false);
    }
  };

  return (
    <TeamLeaderLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Meetings</h1>
            <p className="text-slate-500">Schedule meetings with interns, admins, and partners</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus size={20} /> Schedule Meeting
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center sticky top-0 z-10">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Video className="text-indigo-600" /> Schedule New Meeting</h3>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">Close</button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Meeting Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g. Weekly Progress Review"
                    />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.scheduledAt}
                      onChange={e => setFormData({...formData, scheduledAt: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Meeting Link (GMeet/Zoom)</label>
                    <input
                      type="url"
                      required
                      value={formData.meetLink}
                      onChange={e => setFormData({...formData, meetLink: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="https://meet.google.com/..."
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description (Optional)</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                      placeholder="Agenda..."
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Attendees</label>
                    
                    <div className="space-y-4">
                      {/* Admins & Partners */}
                      {colleagues.adminsAndPartners.length > 0 && (
                        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
                          <h4 className="text-sm font-bold text-amber-800 mb-3">Management (Admins/Partners)</h4>
                          <div className="flex flex-wrap gap-2">
                            {colleagues.adminsAndPartners.map(user => (
                              <label key={user._id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${formData.attendees.includes(user._id) ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                <input type="checkbox" className="hidden" checked={formData.attendees.includes(user._id)} onChange={() => handleAttendeeToggle(user._id)} />
                                <span className="text-sm font-semibold">{user.fullName}</span>
                                <span className="text-[10px] uppercase tracking-wider opacity-70 bg-black/5 px-1.5 rounded">{user.role}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interns */}
                      {colleagues.interns.length > 0 && (
                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                          <h4 className="text-sm font-bold text-indigo-800 mb-3">Your Team (Interns)</h4>
                          <div className="flex flex-wrap gap-2">
                            {colleagues.interns.map(user => (
                              <label key={user._id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${formData.attendees.includes(user._id) ? 'bg-indigo-100 border-indigo-300 text-indigo-900' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                <input type="checkbox" className="hidden" checked={formData.attendees.includes(user._id)} onChange={() => handleAttendeeToggle(user._id)} />
                                <span className="text-sm font-semibold">{user.fullName}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={scheduling} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors disabled:opacity-70">
                    {scheduling ? 'Scheduling...' : 'Schedule & Send Invites'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-slate-500">Loading meetings...</p>
          ) : meetings.length === 0 ? (
            <div className="col-span-full bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12 text-center">
              <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700 mb-1">No Meetings Scheduled</h3>
              <p className="text-slate-500">Click the button above to schedule your first meeting.</p>
            </div>
          ) : (
            meetings.map(meeting => (
              <div key={meeting._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">{meeting.title}</h3>
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                    new Date(meeting.scheduledAt) > new Date() ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {new Date(meeting.scheduledAt) > new Date() ? 'Upcoming' : 'Past'}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Clock size={16} className="text-indigo-500" />
                    <span className="font-semibold">{new Date(meeting.scheduledAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <Users size={16} className="text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">Attendees</p>
                      <div className="flex flex-wrap gap-1">
                        {meeting.attendees.map(a => (
                          <span key={a._id} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {a.fullName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <a 
                  href={meeting.meetLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl font-bold transition-colors mt-auto"
                >
                  <LinkIcon size={18} /> Join Meeting
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </TeamLeaderLayout>
  );
};

export default TeamMeetings;
