import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function job({job}) {
  const navigate = useNavigate(); 

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff/(1000*24*60*60));
  }

  return (
    <div className="h-full bg-gray-700 rounded-xl p-6 shadow-lg border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-300 bg-gray-600/50 px-3 py-1 rounded-full">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <Button 
          variant="ghost" 
          className="rounded-full hover:bg-gray-600/50 transition-colors" 
          size="icon"
        >
          <Bookmark className="w-5 h-5 text-gray-300" />
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Avatar className="w-12 h-12 border-2 border-gray-600 bg-gray-700">
            <AvatarImage src={job?.company?.logo} className="object-cover" />
          </Avatar>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">{job?.company?.name}</h2>
          <p className="text-sm text-gray-300">India</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">{job?.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-2">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="bg-blue-900/50 text-blue-300 hover:bg-blue-900/70">
          {job?.position} positions
        </Badge>
        <Badge className="bg-red-900/50 text-red-300 hover:bg-red-900/70">
          {job?.jobType}
        </Badge>
        <Badge className="bg-yellow-900/50 text-yellow-300 hover:bg-yellow-900/70">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600 hover:border-gray-500"
        >
          View Details
        </Button>
        <Button 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Job
        </Button>
      </div>
    </div>
  );
}

export default job;
