import { setAllJobs } from '@/redux/jobSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import store from '@/redux/store';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

function useGetAllJobs() {
    const searchedQuery = useSelector(store => store.job.searchQurey);
    const dispatch = useDispatch();
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get`, { 
                    params: {
                        keyword: searchedQuery || ''
                    },
                    withCredentials: true,
                    timeout: 30000 // Increased timeout for production
                });
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                    if (retryCount > 0) {
                        toast.success("Successfully loaded jobs");
                    }
                } else {
                    toast.error(res.data.message || "Failed to fetch jobs");
                    if (retryCount < 3) {
                        setTimeout(() => setRetryCount(prev => prev + 1), 2000);
                    }
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                const errorMessage = error.response?.data?.message || "Failed to fetch jobs. Please try again.";
                toast.error(errorMessage);
                dispatch(setAllJobs([]));
                
                // Retry logic
                if (retryCount < 3) {
                    setTimeout(() => setRetryCount(prev => prev + 1), 2000);
                }
            }
        };

        fetchAllJobs();
    }, [searchedQuery, dispatch, retryCount]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            setRetryCount(0);
        };
    }, []);
}

export default useGetAllJobs;