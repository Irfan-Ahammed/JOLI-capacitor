import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy, SlidersHorizontal } from "lucide-react";
import FilterCard from "./FilterCard";
import { filters } from "@/config";

function FilterCardMobail() {
  return (
    <div className="px-4 flex items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-primary/60 text-primary ">
            <SlidersHorizontal />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm rounded-lg">
          <FilterCard />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex">
        {filters.slice(0, 3).map((item, i) => (
          <div key={i} className="ml-3">
            <Button variant="outline" className="border-black/70 bg-[#f7faff]">
              {item.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCardMobail;
