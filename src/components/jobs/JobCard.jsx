import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Bookmark,
  BookmarkMinus,
  BookmarkPlus,
  IndianRupee
} from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob, setAppliedJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { setSaveJobs } from "@/redux/saveJobsSlice";

function JobCard({ job }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { saveJobs } = useSelector((state) => state.saveJobs);
  const categories = useSelector((state) => state.category?.categories);

  const jobId = job._id;

  // Manage applied state dynamically
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (singleJob) {
      const isJobApplied = singleJob?.applications?.some(
        (app) => app.applicant === user?._id
      );
      setIsApplied(isJobApplied);
    }
  }, [singleJob, user]);

  const applyJobHandle = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        // Update Redux state
        const updatedJob = {
          ...singleJob,
          applications: [
            ...(singleJob.applications || []),
            { applicant: user?._id }
          ]
        };

        dispatch(setSingleJob(updatedJob));
        dispatch(setAppliedJob(updatedJob));

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      onClick={() => navigate(`/discription/${jobId}`)}
      className="cursor-pointer bg-white relative text-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 w-full max-w-sm mx-auto"
    >
      {/* Job Created Time */}
      <p className="text-xs absolute top-4 right-4 font-bold text-slate-400 mb-2">
        {timeAgo(job?.createdAt) === 0 ? "Today" : `${timeAgo(job?.createdAt)}`}
      </p>

      {/* Job Title */}
      <h2 className="text-xl font-semibold mt-4 mb-1 text-gray-800">
        {job.title}
      </h2>

      {/* Job Description */}
      <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>

      {/* User Info */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-slate-300">
            <AvatarImage
              src={job.userImage || "https://via.placeholder.com/150"}
              alt={job.userFullname}
            />
            <AvatarFallback className="bg-slate-100 text-slate-700">
              {job.userFullname?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="text-sm font-medium text-slate-700 block">
              {job.userFullname}
            </span>
            <span className="text-xs text-slate-500">
              {job.location.length > 20
                ? job.location.slice(0, 16) + "..."
                : job.location}
            </span>
          </div>
        </div>

        {/* save Jobs */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSaveJobs(job));
          }}
          className="text-gray-500 hover:text-gray-700 hover:bg-slate-100 rounded-full p-3 transition-colors duration-200 active:scale-95"
        >
          {saveJobs.some((savedJob) => savedJob._id === job._id) ? (
            <BookmarkMinus size={23} />
          ) : (
            <BookmarkPlus size={23} />
          )}
        </button>
      </div>

      {/* Job Details */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          {job.jobType}
        </Badge>
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 flex items-center gap-1">
          <IndianRupee size={13} /> {job.wage}
        </Badge>
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          {Array.isArray(categories)
            ? categories.find((cat) => cat._id === job.category)?.name || "N/A"
            : "N/A"}
        </Badge>
      </div>

      {/* Apply Button */}
      <button
        onClick={applyJobHandle}
        disabled={isApplied}
        className={`w-full mt-6 py-2 px-4 rounded-lg transition-colors duration-300 font-semibold ${
          isApplied
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isApplied ? "Already Applied" : "Apply Now"}
      </button>
    </div>
  );
}

export default JobCard;
