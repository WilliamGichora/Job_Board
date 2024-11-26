import { useQuery } from '@tanstack/react-query';
import apiClient from './Axios';

const fetchJobs = async () => {
    const response = await apiClient.get('/jobs');
    return response.data;
};

export const useJobs = () => {
    return useQuery(['jobs'], fetchJobs, {
        staleTime: 5 * 60 * 1000, 
        refetchOnWindowFocus: false,
    });
};
