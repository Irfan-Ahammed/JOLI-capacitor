import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

function SaveJobs() {
  const { saveJobs } = useSelector((state) => state.saveJobs);

  return (
    <Button
      className="fixed z-40 top-4 right-24 sm:top-[90vh] sm:right-6 bg-black text-white rounded-full sm:shadow-lg hover:bg-slate-600 transition-all"
      size="icon"
    >
      <Bookmark size={23} />
      <span className="absolute -top-1 -right-1 w-5 text-sm flex items-center justify-center font-bold rounded-full bg-red-500 text-white">
        {saveJobs.length}
      </span>
    </Button>
  );
}

export default SaveJobs;
