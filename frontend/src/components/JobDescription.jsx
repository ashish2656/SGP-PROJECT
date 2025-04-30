import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const user = useSelector((store) => store.auth.user);
  
  const { singleJob } = useSelector((store) => store.job);
  const isInitiallyAplied =
    singleJob?.applications?.some(application => application.applicant === singleJob._id
    ) || false;

    // console.log(isInitiallyAplied);
    
  
    const [isApplied,setIsApplied] = useState(isInitiallyAplied);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios(
        `http://localhost:8000/api/v1/application/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.status) {
        setIsApplied(true); // update the local state
        const updatedSingleJob = {...singleJob,applications:[...singleJob.applications,{applicant : user?._id}]};
        dispatch(setSingleJob(updatedSingleJob)); // for real time ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/job/get/${jobId}`,
          { withCredentials: true }
        );
        // console.log(res);
        
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          res.data.job.applications.map((e)=>{
              if(e.applicant === user?._id){
                setIsApplied(true);
              }
          });      
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 pt-20">
        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-4">{singleJob?.title}</h1>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-blue-900/50 text-blue-300 px-4 py-1">
                    {singleJob?.position} position
                  </Badge>
                  <Badge className="bg-red-900/50 text-red-300 px-4 py-1">
                    {singleJob?.jobType}
                  </Badge>
                  <Badge className="bg-yellow-900/50 text-yellow-300 px-4 py-1">
                    {singleJob?.salary} LPA
                  </Badge>
                </div>
              </div>

              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`px-8 py-6 text-lg rounded-lg transition-all ${
                  isApplied
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                  Job Description
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-400 font-medium">Role</h3>
                      <p className="text-white">{singleJob?.title}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-medium">Location</h3>
                      <p className="text-white">{singleJob?.location}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-medium">Experience</h3>
                      <p className="text-white">{singleJob?.experience} yrs</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gray-400 font-medium">Salary</h3>
                      <p className="text-white">{singleJob?.salary} LPA</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-medium">Total Applicants</h3>
                      <p className="text-white">{singleJob?.applications.length}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-400 font-medium">Posted Date</h3>
                      <p className="text-white">{singleJob?.createdAt.split("T")[0]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-700">
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed">{singleJob?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
