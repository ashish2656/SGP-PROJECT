import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';

// const randomJob = [1,2,3,4,5,6,7,8];

function LatestJobs() {
    const {allJobs} = useSelector(store => store.job);
    // console.log(allJobs);

  return (
    <div className='max-w-7xl mx-auto my-20'>
        <div className="text-center mb-12">
          <h1 className='text-4xl font-bold mb-4'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>Latest & Top</span> Job Openings
          </h1>
          <p className="text-gray-400">Discover the most recent opportunities from leading companies</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {
            allJobs.length <= 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
                  <p className="text-gray-400 text-lg">No Job Available</p>
                  <p className="text-gray-500 text-sm mt-2">Check back later for new opportunities</p>
                </div>
              </div>
            ) : (
              allJobs?.slice(0,6).map((job) => (
                <LatestJobCard key={job._id} job={job}/>
              ))
            )
        }
        </div>
    </div>
  )
}

export default LatestJobs