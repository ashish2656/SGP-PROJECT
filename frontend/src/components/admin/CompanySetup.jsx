import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Building2, Globe, MapPin, FileText } from "lucide-react";

function CompanySetup() {
  const params = useParams();
  const { singleCompany } = useSelector((store) => store.company);

  useGetCompanyById(params.id);


  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  // console.log(singleCompany);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Companies
              </Button>
              <h1 className="text-2xl font-bold text-gray-100">Company Setup</h1>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-200">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="website"
                      value={input.website}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="Enter website URL"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      name="location"
                      value={input.location}
                      onChange={changeEventHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-200">Logo</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-200">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                    placeholder="Enter company description"
                  />
                </div>
              </div>

              <div className="pt-4">
                {loading ? (
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                  >
                    Update Company
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySetup;
