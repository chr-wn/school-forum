import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return (
    <div className="sticky top-0 py-1.5 bg-background z-50 w:11/12">
      <div className="flex items-center bg-widget p-3 rounded-full relative">
        <SearchIcon className="text-muted-foreground h-5 z-50" />
        <input
          type="text"
          className="bg-transparent placeholder-muted-foreground outline-none text-primary absolute inset-0 pl-11 border border-transparent w-full focus:border-brand rounded-full dark:focus:bg-black focus:bg-white focus:shadow-lg"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
