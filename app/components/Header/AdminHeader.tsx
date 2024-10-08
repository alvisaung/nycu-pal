"use client";
import { useFetchData } from "@/src/hooks/useFetchData";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = (): boolean => {
    let currentPath = pathname;
    return currentPath == "/admin" || currentPath == "/admin/login";
  };
  useEffect(() => {
    if (!localStorage) return;
    if (localStorage.getItem("authToken")) {
      router.replace("/admin");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.replace("/admin/login");
  };
  return (
    <div className="flex justify-between items-center mb-4">
      {isHome() ? (
        <h1 className="text-2xl font-bold">Dashboard</h1>
      ) : (
        <div className="flex flex-row items-center cursor-pointer" onClick={() => router.replace("/admin#Activities")}>
          <img src="/imgs/down-arrow.png" className="rotate-90 w-4 h-4 " />
          <h5 className="text-base font-medium ml-1 mt-1 underline">{`Back`}</h5>
        </div>
      )}

      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Log Out
      </button>
    </div>
  );
};

export default AdminHeader;
