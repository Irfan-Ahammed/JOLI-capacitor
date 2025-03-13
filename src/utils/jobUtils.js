import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setSingleJob, setAppliedJob } from "@/redux/jobSlice";
import { toast } from "sonner";

export const applyJob = async (jobId, user, dispatch) => {
  try {
    const res = await axios.post(
      `${APPLICATION_API_END_POINT}/apply/${jobId}`,
      {},
      { withCredentials: true }
    );

    if (res.data.success) {
      dispatch(setAppliedJob({ jobId, applicant: user._id }));
      toast.success(res.data.message);
      return true;
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
  return false;
};