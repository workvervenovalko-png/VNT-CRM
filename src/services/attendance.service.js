import api from "./api";

export const getMyAttendanceHistory = (page = 1, limit = 10) =>
  api.get(`/attendance/my-history?page=${page}&limit=${limit}`);

export const requestAttendanceCorrection = (data) =>
  api.post('/attendance/correction', data);
