import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";
import { Building2, ArrowLeft } from "lucide-react";

function CompanayCreate() {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () =>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            
            if(res?.data.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data?.company?._id
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    } 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Create New Company</h1>
              <p className="text-gray-400">
                Enter your company name to get started with job posting
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-200">Company Name</Label>
                <Input
                  type="text"
                  className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                  placeholder="e.g., JobHunt, Microsoft, Google"
                  onChange={(e)=>setCompanyName(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  onClick={()=>navigate('/admin/companies')} 
                  variant="outline"
                  className="flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Companies
                </Button>
                <Button 
                  onClick={registerNewCompany}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                >
                  Create Company
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanayCreate;
