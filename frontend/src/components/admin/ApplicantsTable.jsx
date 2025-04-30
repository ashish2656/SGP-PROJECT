import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Check, X, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

function ApplicantsTable() {
  const applicants = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-800/50">
      <Table>
        <TableCaption className="text-gray-400">A list of your recent applicants</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800/50 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Full Name</TableHead>
            <TableHead className="text-gray-300">Email</TableHead>
            <TableHead className="text-gray-300">Contact</TableHead>
            <TableHead className="text-gray-300">Resume</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applicants?.applications?.map((item) => (
              <TableRow 
                key={item._id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <TableCell className="text-gray-200">{item?.applicant?.fullname}</TableCell>
                <TableCell className="text-gray-200">{item?.applicant?.email}</TableCell>
                <TableCell className="text-gray-200">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant.profile.resume ? (
                    <a
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{item?.applicant?.profile?.resumeOriginalName}</span>
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell className="text-gray-200">
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => statusHandler("accepted", item?._id)}
                      variant="outline"
                      className="flex items-center gap-2 text-green-300 border-green-600 hover:bg-green-900/20 hover:text-green-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => statusHandler("rejected", item?._id)}
                      variant="outline"
                      className="flex items-center gap-2 text-red-300 border-red-600 hover:bg-red-900/20 hover:text-red-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
