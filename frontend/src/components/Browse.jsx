import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQurey } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

// const randomJobs = [1, 2, 3];

function Browse() {
  useGetAllJobs();
  const navigate = useNavigate();
  const allJobs = useSelector(store => store.job.allJobs);
  const searchQuery = useSelector(store => store.job.searchQurey);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQurey(""));
    }
  }, [dispatch]);

  // Filter jobs based on search query
  const filteredJobs = allJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Search Results ({filteredJobs.length})
              </h1>
              {searchQuery && (
                <p className="text-gray-400 text-lg">
                  Showing results for "<span className="text-blue-400 font-medium">{searchQuery}</span>"
                </p>
              )}
            </div>
            {filteredJobs.length === 0 && (
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <p className="text-gray-300 text-lg">No jobs found matching your search</p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job._id} className="h-full">
                <Job job={job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Browse;
