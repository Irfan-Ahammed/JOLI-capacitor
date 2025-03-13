import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapPin } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { motion } from "framer-motion";
import { fetchLocations, updateLocation } from "@/redux/locationSlice";

function SearchLocation() {
  const [query, setQuery] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.location.locations);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      dispatch(fetchLocations(e.target.value));
    }
  };

  const handleSelectLocation = (location) => {
    setQuery(location.display_name);
    setOpenLocation(false);
    dispatch(updateLocation(location));
  };

  return (
    <div className="relative flex w-[50%] items-center">
      <motion.div
        className="flex items-center border w-full border-gray-300 rounded-lg text-sm text-slate-400 h-12 relative cursor-pointer hover:border-primary focus-within:border-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MapPin className="size-4 bottom-4 left-2 absolute text-slate-400" />
        <input
          type="text"
          placeholder="Location"
          value={query}
          onChange={handleSearch}
          onFocus={() => setOpenLocation(true)}
          onBlur={() => setTimeout(() => setOpenLocation(false), 200)}
          className="flex-1 bg-transparent border-none ml-7 focus:outline-none focus:ring-0"
        />
      </motion.div>

      {openLocation && locations.length > 0 && (
        <Command className="rounded-lg border shadow-md md:max-w-80 absolute h-auto top-12 bg-white z-10">
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.place_id}
                  onSelect={() => handleSelectLocation(location)}
                  className="cursor-pointer px-3 text-sm py-2 hover:bg-gray-100"
                >
                  {location.display_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </div>
  );
}

export default SearchLocation;
