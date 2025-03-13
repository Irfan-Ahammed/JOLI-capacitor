import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/utils/timeAgo";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const shortListingStatus = [
  { labal: "Accepted", color: "bg-[#06D001]",focusColor:"hover:bg-green-400" },
  { labal: "Rejected", color: "bg-[#FF2929]",focusColor:"hover:bg-red-400" }
];

const ApplicantsTable = () => {
  const applicants = useSelector((state) => state.application.applicants) || [];
  const [expandedRow, setExpandedRow] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      className="overflow-x-auto p-4 bg-white max-w-[800px] rounded-xl shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table className="">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>Full Name</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.length > 0 ? (
            applicants.map((app, index) => (
              <React.Fragment key={app._id || index}>
                <motion.tr
                  className="cursor-pointer border-b border-slate-300 hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() =>
                    setExpandedRow(expandedRow === index ? null : index)
                  }
                >
                  <TableCell className="font-medium">
                    {app.applicant?.fullname || "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {app.applicant?.phoneNumber || "N/A"}
                  </TableCell>
                  <TableCell className="border-0">
                    <Badge variant="outline">{timeAgo(app.appliedAt)}</Badge>
                  </TableCell>
                  <TableCell className="flex sm:hidden justify-end mr-2">
                    {expandedRow === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </TableCell>
                  <TableCell className="text-right hidden md:table-cell">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-36 p-2 bg-white border-slate-200">
                        {shortListingStatus.map((status, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className={`w-full mb-2 border-slate-300 shadow-sm ${status.color} ${status.focusColor} text-white font-poppins`}
                            onClick={() => statusHandler(status.labal, app._id)}
                          >
                            {status.labal}
                          </Button>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </motion.tr>
                {expandedRow === index && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="sm:hidden"
                  >
                    <TableCell
                      colSpan="3"
                      className="p-4 bg-slate-100 rounded-md "
                    >
                      <p className="text-gray-700">
                        Email: {app.applicant?.email || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        Contact: {app.applicant?.phoneNumber || "N/A"}
                      </p>
                      <div className="mt-2 flex gap-2">
                      {shortListingStatus.map((status, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className={` mb-2 border-slate-300 shadow-sm ${status.color} ${status.focusColor} text-white font-poppins`}
                            onClick={() => statusHandler(status.labal, app._id)}
                          >
                            {status.labal}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </motion.tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="3" className="text-center py-4">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ApplicantsTable;
