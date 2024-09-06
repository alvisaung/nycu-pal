"use client";
import React, { useEffect, useState } from "react";

import AdminActivities from "@/app/components/Activities/AdminActivities";
import UploadImgComponent from "@/app/components/AdminHome/UploadImgComponent";
import AdminPublications from "@/app/components/Publications/AdminPublications";
import AdminMember from "@/app/components/Member/AdminMember";
import AdminResearch from "@/app/components/Research/AdminResearch";
import { ActivityData } from "@/app/components/Activities";
import { fetchData } from "@/src/services/dataService";
import AdminGeneral from "../components/AdminGeneral/AdminGeneral";

const Dashboard = () => {
  const [currentNav, setCurrentNav] = useState("General");
  useEffect(() => {
    // Set initial state based on hash in URL
    const hash = window.location.hash.replace("#", "");
    if (["General", "Activities", "Publications", "Member", "Research"].includes(hash)) {
      setCurrentNav(hash);
    }
  }, []);

  const handleNavClick = (item: string) => {
    setCurrentNav(item);
    window.location.hash = item;
  };
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Banner</h2>
        <UploadImgComponent setImages={() => {}} />
      </div>
      <nav className="mb-8">
        <ul className="flex space-x-6">
          {["General", "Activities", "Publications", "Member", "Research"].map((item) => (
            <li key={item} className={`cursor-pointer ${currentNav === item ? "font-bold border-b-2 border-blue-500" : ""}`} onClick={() => handleNavClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {currentNav === "General" && <AdminGeneral />}
        {currentNav === "Activities" && <AdminActivities />}
        {currentNav === "Publications" && <AdminPublications />}
        {currentNav === "Member" && <AdminMember />}
        {currentNav === "Research" && <AdminResearch />}
      </div>
    </div>
  );
};

export default Dashboard;
