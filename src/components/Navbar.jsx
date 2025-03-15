import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Briefcase,
  ChevronRight,
  CircleUserRound,
  Plus,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const buttons = [
  { label: "Jobs", href: "/", icon: <Briefcase /> },
  { label: "Explore", href: "/explore", icon: <Search /> },
  { label: "", href: "", icon: "" },
  { label: "Profile", href: "/profile", icon: <CircleUserRound /> },
  { label: "More", href: "/more", icon: <ChevronRight /> }
];

function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="h-16 border-t border-slate-700 fixed w-full bottom-0 bg-background shadow-lg flex items-center justify-around p-2 backdrop-blur-md"
    >
      {buttons.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center cursor-pointer dark:text-dark-foreground "
          onClick={() => navigate(item.href)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="focus:bg-dark-primary/30 rounded-full transition-all duration-300"
          >
            {item.icon}
          </Button>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </motion.div>
      ))}
      <button
        variant="ghost"
        className="focus:bg-dark-primary/30 p-2 absolute dark:text-white rounded-full transition-all duration-300 "
      >
        <Plus className="size-7" />
      </button>
    </motion.nav>
  );
}

export default Navbar;
