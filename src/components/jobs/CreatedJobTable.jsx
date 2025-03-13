import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJob } from "@/redux/adminJobSlice";
import { timeAgo } from "@/utils/timeAgo";
import { Table, TableBody, TableHeader, TableCell, TableRow } from "../ui/table";
import { motion } from "framer-motion";
import { popoverVariants, rowVariants, tableVariants } from "@/styles/framerMotion";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { toast } from "sonner";


const CreatedJobTable = () => {
  const dispatch = useDispatch();
  const createdJobs = useSelector((state) => state.adminJob?.createdJob);
  const categories = useSelector((state) => state.category?.categories);
  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  const [deleteJobId, setDeleteJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs/${userId}`, {
          withCredentials: true
        });
        dispatch(setAllAdminJob(res.data.jobs));
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
      }
    };
    fetchJobs();
  }, [userId, dispatch]);

  const handleDeleteJob = async () => {
    if (!deleteJobId) return;
    const previousJobs = [...createdJobs];
    dispatch(setAllAdminJob(createdJobs.filter((job) => job._id !== deleteJobId)));

    try {
      const response = await axios.delete(`${JOB_API_END_POINT}/delete/${deleteJobId}`, {
        withCredentials: true
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message || "Failed to delete the job");
      dispatch(setAllAdminJob(previousJobs));
    }
    setDeleteJobId(null);
  };

  if (!Array.isArray(createdJobs) || createdJobs.length === 0) {
    return <p className="text-gray-500 text-center mt-4">You have not created any jobs yet.</p>;
  }

  return (
    <motion.div className="overflow-x-auto" variants={tableVariants} initial="hidden" animate="visible">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-gray-200 text-gray-700 text-left uppercase text-sm">
            <TableRow className="border-0">
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium">Job Title</TableCell>
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium hidden sm:block">Category</TableCell>
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium">Date Created</TableCell>
              <TableCell className="sm:px-6 p-3 sm:py-3 font-medium text-center">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {createdJobs.map((job, index) => (
              <motion.tr
                key={job._id || index}
                className="border-0 hover:bg-gray-50 "
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <TableCell className="sm:px-6 sm:py-4 text-gray-900 font-medium">{job.title}</TableCell>
                <TableCell className="sm:px-6 sm:py-4 text-gray-600 hidden sm:block mt-2">
                  {categories.find((cat) => cat._id === job.category)?.name || "N/A"}
                </TableCell>
                <TableCell className="sm:px-6 sm:py-4 text-gray-600">{timeAgo(job.createdAt)}</TableCell>
                <TableCell className="sm:px-6 sm:py-4 text-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-200 rounded-full">
                        <Ellipsis className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <motion.div variants={popoverVariants} initial="hidden" animate="visible">
                      <PopoverContent className="bg-white shadow-lg border-slate-300 rounded-md p-1 w-32 mr-4">
                        <Button
                          className="flex items-center w-full px-3 py-2 border-b border-slate-200 hover:bg-gray-100 rounded bg-transparent justify-between"
                          onClick={() => navigate(`/profile/update/${job._id}`)}
                        >
                          <Pencil className="h-4 w-4" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => navigate(`/profile/${job._id}/applicants`)}
                          className="flex justify-between items-center w-full px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-4 w-4" /> Applicants
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex justify-between items-center w-full px-3 py-2 hover:bg-gray-100 rounded"
                              onClick={() => setDeleteJobId(job._id)}
                            >
                              <Trash2 className="h-4 w-4" /> Remove
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>Are you sure you want to delete this job?</DialogHeader>
                            <DialogFooter>
                              <Button onClick={() => setDeleteJobId(null)} variant="secondary">Cancel</Button>
                              <Button className="bg-primary text-white" onClick={handleDeleteJob} variant="destructive">Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </PopoverContent>
                    </motion.div>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default CreatedJobTable;
