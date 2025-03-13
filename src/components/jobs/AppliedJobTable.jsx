import React, { useEffect } from "react";
import {
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  Table,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAppliedJob } from "@/redux/jobSlice";
import AppliedJobRow from "./AppliedJobRow"; 
import { timeAgo } from "@/utils/timeAgo";

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const appliedJobs = useSelector((state) => state.job?.appliedJobs || []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/appliedJobsProfile/${userId}`,
          { withCredentials: true }
        );
        dispatch(setAppliedJob(Array.isArray(res.data.appliedJobs) ? res.data.appliedJobs : []));
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch, userId]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="hidden sm:table-cell px-0 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Role
            </TableHead>
            <TableHead className="sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salary
            </TableHead>
            <TableHead className="sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, index) => (
              <AppliedJobRow key={job._id || index} job={job} getStatusClass={getStatusClass} index={index} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No jobs applied yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
