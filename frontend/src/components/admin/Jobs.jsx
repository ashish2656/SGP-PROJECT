import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Briefcase, Plus, Filter } from 'lucide-react'

function Jobs() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setInput(e.target.value);
        dispatch(setSearchJobByText(e.target.value));
    };
    
    return (
        <div className="min-h-screen bg-black">
            <Navbar/>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-black/90 backdrop-blur-md rounded-2xl border border-zinc-800 p-8 shadow-2xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Manage Jobs</h1>
                        <p className="text-zinc-400">
                            View and manage all your job postings
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
                            <Input
                                className="w-full pl-10 bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all duration-200"
                                placeholder="Filter jobs by title or company name"
                                value={input}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Button 
                            onClick={()=>navigate('/admin/jobs/post')}
                            className="w-full md:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-100 shadow-lg hover:shadow-zinc-900/20 transition-all duration-200 flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Post New Job
                        </Button>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg p-4 mb-6 border border-zinc-700/50">
                        <div className="flex items-center gap-2 text-zinc-400 mb-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">Active Filters</span>
                        </div>
                        {input && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-zinc-300">Search:</span>
                                <span className="text-sm text-zinc-200">{input}</span>
                            </div>
                        )}
                    </div>

                    <AdminJobsTable/>
                </div>
            </div>
        </div>
    )
}

export default Jobs 