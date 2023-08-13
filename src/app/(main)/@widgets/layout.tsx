import AdminPanel from "@/components/Widgets/AdminPanel";
import SearchBar from "@/components/Widgets/SearchBar";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <SearchBar />
      <div className="sticky top-1">
        <AdminPanel />
        {children}
      </div>
    </>
  );
};

export default layout;
