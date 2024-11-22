import axios from 'axios';
import useAuthStore from '../stores/userAuthentication';


const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000
});

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;