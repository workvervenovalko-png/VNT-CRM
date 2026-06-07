import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TeamLeaderLayout from '../../components/TeamLeaderLayout';
import { Kanban, Clock, CheckCircle2, MoreHorizontal } from 'lucide-react';

const TeamTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/team-leader/tasks');
      if (res.data.success) {
        setTasks(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (internId, taskId, newStatus) => {
    try {
      const res = await api.patch(`/team-leader/tasks/${internId}/${taskId}`, { status: newStatus });
      if (res.data.success) {
        fetchTasks();
      }
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const getTasksByStatus = (status) => tasks.filter(t => t.status === status);

  const Column = ({ title, status, icon: Icon, colorClass }) => (
    <div className="flex-1 min-w-[300px] bg-slate-50/50 rounded-2xl border border-slate-100 p-4 flex flex-col h-[calc(100vh-250px)]">
      <div className={`flex items-center gap-2 mb-4 pb-4 border-b border-slate-200 ${colorClass}`}>
        <Icon size={20} />
        <h3 className="font-bold">{title}</h3>
        <span className="ml-auto bg-white px-2 py-0.5 rounded-full text-xs shadow-sm border border-slate-100">
          {getTasksByStatus(status).length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-2">
        {getTasksByStatus(status).map(task => (
          <div key={task._id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-grab">
            <h4 className="font-bold text-slate-800 text-sm mb-1">{task.title}</h4>
            <p className="text-xs text-slate-500 mb-3 line-clamp-2">{task.description}</p>
            
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold tracking-wider uppercase mb-3">
              <span>{task.internName}</span>
              <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'}</span>
            </div>

            <div className="flex gap-2">
              {status !== 'Pending' && (
                <button onClick={() => updateStatus(task.internId, task._id, 'Pending')} className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-200">
                  Pending
                </button>
              )}
              {status !== 'In Progress' && (
                <button onClick={() => updateStatus(task.internId, task._id, 'In Progress')} className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100">
                  Start
                </button>
              )}
              {status !== 'Completed' && (
                <button onClick={() => updateStatus(task.internId, task._id, 'Completed')} className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100">
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <TeamLeaderLayout>
      <div className="p-8 h-full flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Task Board</h1>
          <p className="text-slate-500">Track and manage your team's assigned tasks</p>
        </div>

        {loading ? (
          <p className="text-slate-500">Loading tasks...</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 flex-1">
            <Column title="Pending" status="Pending" icon={MoreHorizontal} colorClass="text-slate-600" />
            <Column title="In Progress" status="In Progress" icon={Clock} colorClass="text-indigo-600" />
            <Column title="Completed" status="Completed" icon={CheckCircle2} colorClass="text-emerald-600" />
          </div>
        )}
      </div>
    </TeamLeaderLayout>
  );
};

export default TeamTasks;
