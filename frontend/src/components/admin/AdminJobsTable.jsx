import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreHorizontal, Calendar, Building2, Briefcase } from "lucide-react";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function AdminJobsTable() {
  const companies = useSelector((store) => store.company.companies);
  const allAdminJobs = useSelector((store) => store.job.allAdminJobs);
  const searchJobByTest = useSelector((store) => store.job.searchJobByTest);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

//   console.log(filterJobs);
  

  useEffect(() => {
    const filterdJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByTest) {
          return true;
        }

        return job?.title.toLowerCase().includes(searchJobByTest.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByTest.toLowerCase());
      });
    setFilterJobs(filterdJobs);
  }, [allAdminJobs, searchJobByTest]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800/50">
      <Table>
        <TableCaption className="text-gray-400">List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800/50 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Company Name</TableHead>
            <TableHead className="text-gray-300">Role</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAdminJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <p className="text-gray-400 text-lg">No jobs posted yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Create a company first to post jobs</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow 
                key={job._id}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-gray-700">
                      <AvatarImage 
                        className="h-10 w-10 rounded-full" 
                        src={job?.company?.logo} 
                      />
                    </Avatar>
                    <span className="text-gray-200 font-medium">{job?.company?.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-200 font-medium">{job?.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">{job?.company?.createdAt.split("T")[0]}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => navigate(`/admin/jobs/update/${job._id}`)}
                      variant="outline"
                      className="flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-gray-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Job
                    </Button>
                    <Button
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      variant="outline"
                      className="flex items-center gap-2 text-gray-300 border-gray-600 hover:bg-gray-700/50 hover:text-gray-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View Applicants
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
