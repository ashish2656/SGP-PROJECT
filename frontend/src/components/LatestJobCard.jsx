import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Avatar } from './ui/avatar'
import { AvatarImage } from './ui/avatar'
import React from 'react'

function LatestJobCard({job}) {   
  const navigate = useNavigate(); 

  return (
    <div 
      onClick={()=>navigate(`/description/${job._id}`)} 
      className='p-6 cursor-pointer rounded-xl shadow-lg bg-gray-800 border border-gray-700 hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 hover:shadow-xl group'
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Avatar className="w-12 h-12 border-2 border-gray-600 bg-gray-700">
            <AvatarImage src={job?.company?.logo} className="object-cover" />
          </Avatar>
        </div>
        <div>
          <h1 className='font-semibold text-lg text-gray-200 group-hover:text-white transition-colors'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-400'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-xl text-white my-2 group-hover:text-blue-400 transition-colors line-clamp-1'>{job?.title}</h1>
        <p className='text-sm text-gray-300 line-clamp-2'>{job?.description}</p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/20' variant="ghost">{job?.position} positions</Badge>
        <Badge className='bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/20' variant="ghost">{job?.jobType}</Badge>
        <Badge className='bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/20' variant="ghost">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard