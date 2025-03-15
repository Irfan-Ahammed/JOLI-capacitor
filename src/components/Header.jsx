import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textVariants } from "@/styles/framerMotion";
import { Bell, Search } from "lucide-react";

import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileInputFocused, setIsMobileInputFocused] = useState(false);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const transitionTexts = [
    "Search for jobs near you...",
    "What type of work are you looking for?",
    "Enter job title, skills, or location...",
    "Find opportunities in your area today!",
    "Type a job category or city to get started...",
    "Discover your next job opportunity here!"
  ];

  const handleSearch = (e) => {
    setQuery(e.target.value);
    dispatch(setSearchedQuery(e.target.value));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimationEnabled) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % transitionTexts.length
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnimationEnabled]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-30 px-3"
    >
      <div className="flex mt-4 items-center">
        <motion.div
          className="w-full h-12 border  border-light-border dark:border-dark-border  bg-white dark:bg-light-primary/20 rounded-full flex items-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Search className="size-6 text-gray-600" />
          <AnimatePresence>
            <motion.input
              type="text"
              key={transitionTexts[currentIndex]}
              value={query}
              onChange={handleSearch}
              placeholder={
                isMobileInputFocused ? "" : transitionTexts[currentIndex]
              }
              onFocus={() => {
                setIsMobileInputFocused(true);
                setIsAnimationEnabled(false);
              }}
              onBlur={() => {
                setIsMobileInputFocused(false);
                setIsAnimationEnabled(true);
              }}
              className="absolute left-10  ml-6 h-full bg-transparent text-gray-400 text- font-medium outline-none border-none 
              focus:outline-none focus:ring-0 focus:border-transparent 
              active:outline-none active:ring-0 active:border-transparent"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              md
              exit="exit"
            />
          </AnimatePresence>
        </motion.div>
        <div
          className="ml-3 rounded-full border cursor-pointer h-10 w-10 flex items-center justify-center dark:border-dark-border text-slate-400"
          onClick={() => navigate("/notification")}
        >
          <Bell/>
        </div>
      </div>
    </motion.div>
  );
}

export default Header;
