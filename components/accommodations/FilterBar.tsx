"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaStar, FaTimes, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useAccommodations } from "@/context/AccommodationsContext";
import { Filter } from "lucide-react";

const FilterBar = () => {
  const {
    accommodations,
    filters,
    setFilters,
    filteredAccommodations,
    setSortBy,
    search,
    setSearch,
  } = useAccommodations();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const locations = [...new Set(accommodations.map((a) => a.location))];
  const types = [...new Set(accommodations.map((a) => a.type))];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    filters.category
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    filters.location || []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    filters.type || []
  );

  const isFilterActive =
    search ||
    selectedLocations.length > 0 ||
    selectedTypes.length > 0 ||
    selectedCategory !== null ||
    filters.athlos_stamp !== null;

  const resetAllFilters = () => {
    setSelectedLocations([]);
    setSelectedTypes([]);
    setSelectedCategory(null);
    setSearch("");
    setFilters({
      location: [],
      type: [],
      athlos_stamp: null,
      category: null,
    });
  };

  const handleFilterChange = (
    filterType: string,
    value: string[] | number | boolean | null
  ) => {
    setFilters({ [filterType]: value });
  };

  const resetFilters = (filterType: string) => {
    if (filterType === "athlos_stamp") {
      setFilters({ athlos_stamp: null });
    } else if (filterType === "category") {
      setSelectedCategory(null);
      setFilters({ category: null });
    } else if (filterType === "location") {
      setSelectedLocations([]);
      setFilters({ location: [] });
    } else if (filterType === "type") {
      setSelectedTypes([]);
      setFilters({ type: [] });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <div className="flex flex-col md:flex-row gap-4 mb-0 md:mb-4 justify-between items-start md:items-end flex-grow">
        <div className="flex flex-row md:flex-col-reverse flex-grow gap-4 justify-between items-start w-full">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=""
          />
          <p className="hidden md:flex text-xs font-semibold">
            {filteredAccommodations.length} accommodations
          </p>
          <Button
            className="flex md:hidden"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter />
          </Button>
        </div>
        <div
          className={`
          ${
            showMobileFilters
              ? "fixed inset-0 bg-white z-50 p-4 flex items-center gap-4"
              : "hidden"
          }
          md:flex md:flex-row md:relative md:gap-4 flex-col md:p-0
        `}
        >
          <Button
            className="md:hidden self-end"
            variant="outline"
            onClick={() => setShowMobileFilters(false)}
          >
            <FaTimes />
          </Button>
          <Select>
            <SelectTrigger
              className={`w-40 flex gap-2 items-center ${
                selectedLocations.length > 0
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}
            >
              <SelectValue
                placeholder={
                  selectedLocations.length > 0
                    ? `${selectedLocations[0]}${
                        selectedLocations.length > 1
                          ? `,+${selectedLocations.length - 1}`
                          : ""
                      }`
                    : "Location"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <div className="p-4 min-w-64 h-84 flex flex-col">
                <div className="h-48 overflow-y-scroll">
                  {locations.map((location) => (
                    <label key={location} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedLocations.includes(location)}
                        onChange={(e) => {
                          const newLocations = e.target.checked
                            ? [...selectedLocations, location]
                            : selectedLocations.filter((l) => l !== location);
                          setSelectedLocations(newLocations);
                        }}
                      />
                      {location}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => resetFilters("location")}
                    className="w-1/4"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() =>
                      handleFilterChange("location", selectedLocations)
                    }
                    className="w-3/4"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger
              className={`w-40 flex gap-2 items-center ${
                selectedTypes.length > 0 ? "bg-primary text-white" : "bg-white"
              }`}
            >
              <SelectValue
                placeholder={
                  selectedTypes.length > 0
                    ? `${selectedTypes[0]}${
                        selectedTypes.length > 1
                          ? `,+${selectedTypes.length - 1}`
                          : ""
                      }`
                    : "Type of stay"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <div className="p-4 min-w-64 min-h-84 flex flex-col">
                <div className="max-h-48 overflow-y-scroll">
                  {types.map((type) => (
                    <label key={type} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedTypes.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...selectedTypes, type]
                            : selectedTypes.filter((t) => t !== type);
                          setSelectedTypes(newTypes);
                        }}
                      />
                      {type}
                    </label>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => resetFilters("type")}
                    className="w-1/4"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => handleFilterChange("type", selectedTypes)}
                    className="w-3/4"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </SelectContent>
          </Select>

          <div className="relative w-40">
            <Select>
              <SelectTrigger
                className={`w-40 flex gap-2 items-center ${
                  selectedCategory ? "bg-primary text-white" : "bg-white"
                }`}
              >
                <SelectValue
                  placeholder={
                    selectedCategory
                      ? `${selectedCategory}+ class`
                      : "Hotel Class"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <div className="p-4">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        className={`flex items-center gap-1 px-2 py-1 text-xs rounded border ${
                          selectedCategory === stars
                            ? "border-primary text-primary"
                            : "border-gray-300 text-gray-600"
                        }`}
                        onClick={() => setSelectedCategory(stars)}
                      >
                        <FaStar key={stars} className="text-yellow-500" />+{" "}
                        {stars}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCategory(null);
                        resetFilters("category");
                      }}
                      className="w-1/4"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={() =>
                        handleFilterChange("category", selectedCategory)
                      }
                      className="w-3/4"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant={filters.athlos_stamp ? "default" : "outline"}
            className="flex items-center"
            onClick={() =>
              filters.athlos_stamp
                ? resetFilters("athlos_stamp")
                : handleFilterChange("athlos_stamp", true)
            }
          >
            {filters.athlos_stamp ? (
              <>
                Verified by Athlos <FaTimes className="ml-2" />
              </>
            ) : (
              "Verified by Athlos"
            )}
          </Button>

          <Button
            onClick={resetAllFilters}
            variant="default"
            className="flex items-center"
            disabled={!isFilterActive}
          >
            <FaTrash className="" />
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center md:items-end mb-4">
        <p className="flex md:hidden text-xs font-semibold">
          {filteredAccommodations.length} accommodations
        </p>
        <Select
          onValueChange={(value) => setSortBy(value)}
          defaultValue="recommended"
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="category_high_low">
              Category: High to Low
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
