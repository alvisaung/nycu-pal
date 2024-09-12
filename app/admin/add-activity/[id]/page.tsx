"use client";
import AdminAddActivity from "@/app/components/Activities/AdminAddActivity";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { withAuth } from "../../../components/HOC/withAuth";

const Page: FC = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  return (
    <div>
      <AdminAddActivity id={id} />
    </div>
  );
};
export default withAuth(Page);
