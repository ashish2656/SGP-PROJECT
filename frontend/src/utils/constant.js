const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE = isDevelopment 
    ? 'http://localhost:8000/api/v1'
    : 'https://job-portal-backend-3io2.onrender.com/api/v1';

export const USER_API_END_POINT = `${API_BASE}/user`;
export const JOB_API_END_POINT = `${API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/company`;

// Axios default config
export const axiosConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000 // 15 second timeout for production
};
