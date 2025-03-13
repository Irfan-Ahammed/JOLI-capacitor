import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/categorySlice";
import { Button } from "@/components/ui/button";

function CategorySection({ setSelectedCategory }) {

  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoriesToShow = Array.isArray(categories) 
  ? (showMore ? categories : categories.slice(0, 13)) 
  : [];


  return (
    <div className="container mx-auto px-4 mt-36 sm:mt-20 lg:px-28 pt-6 pb-2">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-5 text-center md:text-start text-gray-800 dark:text-white"
      >
        🔎 Explore Job Categories
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : (
        <div 
          className={`flex ${
            !showMore ? "md:flex-wrap overflow-x-auto" : "flex-wrap justify-center"
          } gap-3 py-2`}
        >
          <AnimatePresence>
            {categoriesToShow.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center min-w-max md:px-4 px-0.5 py-0.5 bg-[#f7faff] border border-slate-200 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition-all"
                onClick={() => setSelectedCategory({ name: item.name, icon: item.icon })}
                whileHover={{ scale: 1.05, backgroundColor: "#E0F2FE", transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                
              >
                <span className="text-lg md:text-xl mr-2 text-gray-700 dark:text-gray-300">
                  {item.icon}
                </span>
                <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-200">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-3 text-center md:text-start"
      >
        <Button
          variant="outline"
          className="px-4 py-2 text-primary border-primary hover:bg-primary hover:text-white transition-all"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less ▲" : "Show More ▼"}
        </Button>
      </motion.div>
    </div>
  );
}

export default CategorySection;