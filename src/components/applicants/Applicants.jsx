import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { motion } from "framer-motion";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success && res.data.applications) {
          dispatch(setAllApplicants(res.data.applications));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <motion.div
      className=" px-4 md:py-5 py-3 lg:mx-44  flex-col mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-bold text-2xl mb-5 text-gray-900 dark:text-white">
        Applicants
      </h1>
      <p>A list of your recent applicants</p>
      <ApplicantsTable />
    </motion.div>
  );
}

export default Applicants;
