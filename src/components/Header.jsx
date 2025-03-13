import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import playstore from "../assets/playstore.png";
import AppStore from "../assets/App-Store.svg";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { textVariants } from "@/styles/framerMotion";
import ProfileDialog from "./ProfileDialog";
import { Search } from "lucide-react";
import Logo from "./logo/Logo";
import SearchLocation from "@/components/jobs/SearchLocation";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

function Header({ selectedCategory }) {
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
      className="fixed top-0 left-0 w-full bg-white z-30 shadow-lg sm:shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between px-4 md:px-6 lg:px-28 py-3">
        {/* Logo */}
        <Logo />

        {/* Desktop Search Section */}
        <div className="hidden md:flex w-full md:w-[55%] items-center space-x-3">
          <div className="relative flex items-center w-full">
            <Input
              type="text"
              placeholder={selectedCategory?.name ?? "Search jobs"}
              onChange={handleSearch}
              className={`w-full h-12 border border-gray-300 text-lg rounded-md focus:outline-none focus:border-gray-400 px-4`}
            />
          </div>

          <SearchLocation />
        </div>

        {/* Buttons Section */}
        <div className="flex items-center space-x-3">
          <Button className="hidden md:flex items-center border text-black hover:bg-gray-100 bg-white px-4 h-12 rounded-lg">
            <span>Get the app:</span>
            <div className="flex items-center ml-2">
              <img src={AppStore} className="w-7 h-8" alt="App Store" />
              <img
                src={playstore}
                className="w-5 ml-2"
                alt="Google Play Store"
              />
            </div>
          </Button>
          <ProfileDialog />
        </div>
      </div>

      {/* Mobile Search Section */}
      <div className="md:hidden px-4 pb-3">
        <motion.div
          className="w-full h-12 border border-gray-300 bg-white rounded-md flex items-center px-4"
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
              className="absolute left-10 w-full ml-6 h-full bg-transparent text-gray-500 text- font-medium outline-none border-none 
              focus:outline-none focus:ring-0 focus:border-transparent 
              active:outline-none active:ring-0 active:border-transparent"
              variants={textVariants}
              initial="hidden"
              animate="visible"md
              exit="exit"
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Header;
