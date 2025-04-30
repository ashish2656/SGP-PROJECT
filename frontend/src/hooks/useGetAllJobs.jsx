import { setAllJobs } from '@/redux/jobSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import store from '@/redux/store';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

function useGetAllJobs() {
    const searchedQuery = useSelector(store => store.job.searchQurey);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { 
                    withCredentials: true,
                    timeout: 10000
                });
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    toast.error(res.data.message || "Failed to fetch jobs");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                toast.error(error.response?.data?.message || "Failed to fetch jobs. Please try again.");
                dispatch(setAllJobs([]));
            }
        };
        fetchAllJobs();
    }, [searchedQuery, dispatch]);
}

export default useGetAllJobs;