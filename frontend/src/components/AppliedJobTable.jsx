import React from 'react'
import { Table, TableHeader, TableHead, TableBody, TableCaption, TableRow, TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
  const allAppliedJobs = useSelector(store => store.job.allAppliedJobs);

  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableCaption className="text-gray-400">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-700/50 hover:bg-gray-700/50">
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300">Job Role</TableHead>
            <TableHead className="text-gray-300">Company</TableHead>
            <TableHead className="text-right text-gray-300">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-400">
                You haven't applied any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow 
                key={appliedJob?._id}
                className="hover:bg-gray-700/30 transition-colors"
              >
                <TableCell className="text-gray-300">{appliedJob.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-gray-300">{appliedJob.job.title}</TableCell>
                <TableCell className="text-gray-300">{appliedJob.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    className={`${
                      appliedJob.status === 'rejected' 
                        ? 'bg-red-900/50 text-red-300 hover:bg-red-900/70' 
                        : appliedJob.status === 'pending' 
                        ? 'bg-yellow-900/50 text-yellow-300 hover:bg-yellow-900/70' 
                        : 'bg-green-900/50 text-green-300 hover:bg-green-900/70'
                    } transition-colors duration-300`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;