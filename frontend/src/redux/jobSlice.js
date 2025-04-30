import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByTest: "",
        allAppliedJobs: [],
        searchQurey: "",
        filters: {
            keyword: "",    // generic text search
            location: "all",
            industry: "all",
            salaryRange: "all" // e.g. "30-50" or "50+"
        }
    },
    reducers: {
        // actions ->dispatch
        setAllJobs: ((state, action) => {
            state.allJobs = action.payload;
        }),
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: ((state, action) => {
            state.allAdminJobs = action.payload;
        }),
        setSearchJobByTest: ((state, action) => {
            state.searchJobByTest = action.payload;
        }),
        setAllAppliedJobs: ((state, action) => {
            state.allAppliedJobs = action.payload;
        }),
        setSearchQurey: ((state, action) => {
            state.searchQurey = action.payload;
        }),
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            };
        }
    }
});

export const { setAllJobs, setSingleJob, setSearchQurey, setAllAdminJobs, setSearchJobByTest, setAllAppliedJobs ,setFilters} = jobSlice.actions;


// Selector for filtered jobs
export const selectFilteredJobs = (state) => {
    const { allJobs, filters } = state.job;
    return allJobs.filter((job) => {
        // keyword filter
        if (filters.keyword) {
            const q = filters.keyword.toLowerCase();
            if (
                !job.title.toLowerCase().includes(q) &&
                !job.description.toLowerCase().includes(q)
            ) return false;
        }
        // location filter
        if (filters.location !== 'all' && job.location !== filters.location) {
            return false;
        }
        // industry filter
        let jobIndustry = '';
        const t = job.title.toLowerCase();
        if (t.includes('frontend')) jobIndustry = 'Frontend Developer';
        else if (t.includes('backend')) jobIndustry = 'Backend Developer';
        else if (t.includes('full stack')) jobIndustry = 'Full Stack Developer';
        else if (t.includes('data')) jobIndustry = 'Data Science';
        else jobIndustry = job.title.split(' ')[0];
        if (filters.industry !== 'all' && jobIndustry !== filters.industry) {
            return false;
        }
        // salary range filter
        if (filters.salaryRange !== 'all') {
            const [minStr, maxStr] = filters.salaryRange.split('-');
            const min = parseFloat(minStr);
            const max = maxStr?.endsWith('L+') ? Infinity : parseFloat(maxStr);
            if (job.salary < min || job.salary > max) return false;
        }
        return true;
    });
};

export default jobSlice.reducer;