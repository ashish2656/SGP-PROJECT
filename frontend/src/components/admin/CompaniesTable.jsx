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
import { MoreHorizontal } from "lucide-react";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const companies = useSelector((store) => store.company.companies);
  const searchCompanyByText = useSelector((store)=>store.company.searchCompanyByText);
  const [filterCompany,setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(()=>{
    const filterdCompany = companies.length >= 0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      }
      return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase());
    })
    setFilterCompany(filterdCompany);
  },[companies,searchCompanyByText])

  return (
    <div className="rounded-lg overflow-hidden">
      <Table>
        <TableCaption className="text-gray-400">List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-800/50 hover:bg-gray-800/50">
            <TableHead className="text-gray-300">Logo</TableHead>
            <TableHead className="text-gray-300">Name</TableHead>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-right text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <p className="text-gray-400 text-lg">You haven't registered any company yet.</p>
                  <p className="text-gray-500 text-sm mt-2">Click "New Company" to get started</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow 
                key={company._id}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <TableCell>
                  <Avatar className="border-2 border-gray-700">
                    <AvatarImage className="h-16 w-16 rounded-full" src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="text-gray-200 font-medium">{company.name}</TableCell>
                <TableCell className="text-gray-400">{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-gray-400 hover:text-gray-200 cursor-pointer transition-colors" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 bg-gray-800 border-gray-700">
                      <div 
                        onClick={()=>navigate(`/admin/companies/${company._id}`)} 
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700/50 cursor-pointer text-gray-200 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit Company</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
