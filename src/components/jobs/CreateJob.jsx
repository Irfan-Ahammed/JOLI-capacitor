import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { CreatingJob } from "@/redux/jobSlice";
import { fetchLocations, updateLocation } from "@/redux/locationSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateJob = () => {
  const { loading } = useSelector((state) => state.job);
  const { locations } = useSelector((state) => state.location);
  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    category: "",
    wage: "",
    location: "",
    jobType: "",
  });

  const [query, setQuery] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      dispatch(fetchLocations(e.target.value));
      setOpenLocation(true);
    }
  };

  const handleSelectLocation = (location) => {
    setQuery(location.display_name);
    setOpenLocation(false);
    setFormData((prev) => ({ ...prev, location: location.display_name }));
    dispatch(updateLocation(location));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${JOB_API_END_POINT}/post`,
        { ...formData },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(CreatingJob(response.data.job));
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
        requirements: "",
        category: "",
        wage: "",
        location: "",
        jobType: "",
      });
      setQuery("");
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error(error.response?.data?.message || "Failed to create job.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Create a Job</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter job title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        
        <Textarea
          placeholder="Enter job description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <Textarea
          placeholder="Enter job requirements"
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
        />

        <Input
          type="number"
          placeholder="Enter salary"
          value={formData.wage}
          onChange={(e) => setFormData({ ...formData, wage: e.target.value })}
        />

        <Input
          type="text"
          placeholder="Enter job location"
          value={query}
          onChange={handleSearch}
        />
        {openLocation && (
          <ul className="border p-2 bg-white dark:bg-gray-800 rounded-md">
            {locations.map((loc) => (
              <li
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
              >
                {loc.display_name}
              </li>
            ))}
          </ul>
        )}

        <Select
          onValueChange={(value) => setFormData({ ...formData, jobType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem className="bg-white border my-[2px] border-slate-200 shadow-sm" value="Full-Time">Full-Time</SelectItem>
              <SelectItem className="bg-white border my-[2px] border-slate-200 shadow-sm" value="Part-Time">Part-Time</SelectItem>
              <SelectItem className="bg-white border my-[2px] border-slate-200 shadow-sm" value="Contract">Contract</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup >
              {categories.map((item) => (
                <SelectItem className="bg-white border my-[2px] border-slate-200 shadow-sm" key={item._id} value={item._id}>
                  {item.icon} {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Job"}
        </Button>
      </form>
    </div>
  );
};

export default CreateJob;