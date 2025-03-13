import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { UpdatingJob, setSingleJob } from "@/redux/jobSlice";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((state) => state.job);
    const { categories } = useSelector((state) => state.category);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    category: "",
    wage: "",
    location: "",
    jobType: "Full-Time"
  });

  const jobTypes = ["Full-Time", "Part-Time", "Contract", "Temporary"];

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true
        });
        dispatch(setSingleJob(response.data.job));
        setInput(response.data.job);
      } catch (error) {
        toast.error("Failed to fetch job details.");
      }
    };

    if (!singleJob || singleJob._id !== id) {
      fetchJob();
    } else {
      setInput(singleJob);
    }
  }, [id, singleJob, dispatch]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        { ...input },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      dispatch(UpdatingJob(response.data.job));
      toast.success("Job updated successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="max-w-lg w-full p-8 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Update Job
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} className="space-y-6">
            {["title", "description", "requirements", "wage", "location"].map((field) => (
              <div key={field} className="space-y-1">
                <Label htmlFor={field} className="text-gray-800 dark:text-gray-300 font-semibold">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={field === "wage" ? "number" : "text"}
                  value={input[field] || ""}
                  onChange={changeEventHandler}
                  className="mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            ))}

            <div className="space-y-1">
              <Label htmlFor="jobType" className="text-gray-800 dark:text-gray-300 font-semibold">
                Job Type
              </Label>
              <Select onValueChange={(value) => setInput({ ...input, jobType: value })}>
                <SelectTrigger className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 transition-all">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <SelectGroup>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="category" className="text-gray-800 dark:text-gray-300 font-semibold">
                Category
              </Label>
              <Select onValueChange={(value) => setInput({ ...input, category: value })}>
                <SelectTrigger className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 transition-all">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <SelectGroup>
                    {categories.map((item) => (
                      <SelectItem key={item._id} value={item._id} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md flex items-center gap-2">
                        {item.icon} {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center">
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Update Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpdateJob;
