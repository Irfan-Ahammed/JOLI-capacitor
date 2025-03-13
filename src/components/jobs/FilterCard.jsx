import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { filters } from "@/config";

function FilterCard() {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center md:text-start">
        Filters
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {filters.map(({ label, options }) => (
          <div key={label}>
            <h3 className="text-md font-bold mb-2">{label}</h3>
            <RadioGroup className="space-y-2">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem id={option} value={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterCard;
