import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { setCompanies, setSearchCompanyByText } from '@/redux/companySlice'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Search, Building2 } from 'lucide-react'

function Companies() {
    useGetAllCompanies();
    const navigate = useNavigate();
    const [input,setInput] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(setSearchCompanyByText(input));
    },[input]);
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            className="w-full pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                            placeholder="Filter companies by name"
                            onChange={(e)=>setInput(e.target.value)}
                        />
                    </div>
                    <Button 
                        onClick={()=>navigate('/admin/companies/create')}
                        className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center gap-2"
                    >
                        <Building2 className="w-4 h-4" />
                        New Company
                    </Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
    </div>
  )
}

export default Companies