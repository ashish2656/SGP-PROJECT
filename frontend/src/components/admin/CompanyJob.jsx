import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByTest } from '@/redux/jobSlice'
import { Search, Briefcase } from 'lucide-react'

function CompanyJob() {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const [input,setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchJobByTest(input));
    },[input]);
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                className="w-full pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                                placeholder="Filter jobs by title or company name"
                                value={input}
                                onChange={(e)=>setInput(e.target.value)}
                            />
                        </div>
                        <Button 
                            onClick={()=>navigate('/admin/jobs/create')}
                            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2"
                        >
                            <Briefcase className="w-4 h-4" />
                            Post New Job
                        </Button>
                    </div>
                    <AdminJobsTable/>
                </div>
            </div>
        </div>
    )
}

export default CompanyJob