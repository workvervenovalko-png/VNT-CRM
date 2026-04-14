import api from './api';

const internApi = {
    // Profile
    getProfile: async () => {
        const response = await api.get('/intern/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await api.put('/intern/profile', data);
        return response.data;
    },

    // Tasks
    getTasks: async () => {
        const response = await api.get('/intern/tasks');
        return response.data;
    },
    submitTask: async (taskData) => {
        const response = await api.post('/intern/tasks', taskData);
        return response.data;
    },

    // Assigned Tasks
    getAssignedTasks: async () => {
        const response = await api.get('/intern/assigned-tasks');
        return response.data;
    },
    updateAssignedTaskStatus: async (taskId, status) => {
        const response = await api.patch(`/intern/assigned-tasks/${taskId}`, { status });
        return response.data;
    },

    // Reports
    submitReport: async (reportData) => {
        const response = await api.post('/intern/reports', reportData);
        return response.data;
    },

    // Attendance
    checkIn: async (checkInData) => {
        const response = await api.post('/attendance/check-in', checkInData);
        return response.data;
    },
    checkOut: async (checkOutData) => {
        const response = await api.post('/attendance/check-out', checkOutData);
        return response.data;
    },
    getAttendanceHistory: async () => {
        const response = await api.get('/attendance/my-history');
        return response.data;
    }
};

export default internApi;
