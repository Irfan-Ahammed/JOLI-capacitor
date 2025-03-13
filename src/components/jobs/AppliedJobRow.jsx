import React, { useState } from "react";
import { TableRow, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";
import { timeAgo } from "@/utils/timeAgo";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";


const AppliedJobRow = ({ job, getStatusClass, index }) => {
  const MotionTableRow = motion(TableRow);
  const [showDateOnMobile, setShowDateOnMobile] = useState(false);

  return (
    <MotionTableRow
      layout
      className="cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      onClick={() => setShowDateOnMobile((prev) => !prev)}
    >
      <TableCell className="hidden sm:px-6 p-3 sm:py-3 sm:table-cell text-gray-600">
        {timeAgo(job.createdAt)}
      </TableCell>

      <TableCell className="sm:hidden">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{job.title}</span>
            {showDateOnMobile ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: showDateOnMobile ? "auto" : 0,
              opacity: showDateOnMobile ? 1 : 0
            }}
            className="overflow-hidden"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {timeAgo(job.createdAt)}
            </span>
          </motion.div>
        </div>
      </TableCell>

      <TableCell className="hidden sm:px-6 p-3 sm:py-3 sm:table-cell text-gray-800 font-medium">
        {job.title}
      </TableCell>

      <TableCell className="text-gray-700 sm:px-6 p-3 sm:py-3">
        {job.wage}
      </TableCell>

      <TableCell className="text-right sm:px-6 p-3 sm:py-3">
        <Badge
          className={`${getStatusClass(
            job.applications[0]?.status
          )} hover:bg-transparent`}
        >
          {job.applications[0]?.status || "Pending"}
        </Badge>
      </TableCell>
    </MotionTableRow>
  );
};

export default AppliedJobRow;
