import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Contact, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetApliedjobs";

// const skills = ["Html","Css","javaScript","ReactJs"];
const isResume = true;

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="max-w-4xl px-4 pt-20 pb-12 mx-auto">
        {/* Profile Card */}
        <div className="mb-8 overflow-hidden transition-all duration-300 border shadow-xl bg-gray-800/50 backdrop-blur-sm rounded-xl border-gray-700/50 hover:border-gray-600/50">
          <div className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Avatar className="w-24 h-24 transition-all duration-300 ring-4 ring-blue-500/20 group-hover:ring-blue-500/40 group-hover:scale-105">
                    <AvatarImage 
                      src={user?.profile?.profilePhoto || "https://imgs.search.brave.com/68f9Ql2VSS1Jq1s4cg-w6La7HZnxeMfJHy-QZHqsVeM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzI3Lzk5LzQ4/LzM2MF9GXzMyNzk5/NDgwNV8xRzBiQkVp/TXg5eVR6MFZCNXZF/elFyOWRFVWcwVGxC/TC5qcGc"} 
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </Avatar>
                  <div className="absolute inset-0 transition-colors duration-300 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10" />
                </div>
                <div>
                  <h1 className="mb-2 text-2xl font-bold text-white">{user?.fullname}</h1>
                  <p className="text-gray-400">{user?.profile?.bio || "No bio available"}</p>
                </div>
              </div>
              <Button 
                onClick={() => setOpen(true)} 
                variant="outline" 
                className="text-gray-300 transition-all duration-300 border-gray-600 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-400"
              >
                <Pen className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 transition-colors duration-300 hover:text-blue-400">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300 transition-colors duration-300 hover:text-green-400">
                <Contact className="w-5 h-5 text-green-400" />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-semibold text-white">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((item, index) => (
                    <Badge 
                      key={index}
                      className="text-blue-300 transition-colors duration-300 bg-blue-900/30 hover:bg-blue-900/50"
                    >
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400">No skills added yet</span>
                )}
              </div>
            </div>
            <div className="mt-8">
              <Label className="flex items-center gap-2 mb-2 text-lg font-semibold text-white">
                <FileText className="w-5 h-5 text-yellow-400" />
                Resume
              </Label>
              {isResume ? (
                <a 
                  target="blank" 
                  href={user?.profile?.resume} 
                  className="flex items-center gap-2 text-blue-400 transition-colors duration-300 hover:text-blue-300 group"
                >
                  <FileText className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  {user?.profile?.resumeOriginalName}
                </a>
                
              ) : (
                <span className="text-gray-400">No resume uploaded</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="overflow-hidden transition-all duration-300 border shadow-xl bg-gray-800/50 backdrop-blur-sm rounded-xl border-gray-700/50 hover:border-gray-600/50">
          <div className="p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Applied Jobs</h2>
            <AppliedJobTable />
          </div>
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
