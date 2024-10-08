"use client";

import AdminAddActivity from "@/app/components/Activities/AdminAddActivity";
import React, { useEffect, useState } from "react";
import { withAuth } from "../../components/HOC/withAuth";

interface EventType {
  id: number;
  title: string;
}
const Page = () => {
  return (
    <div>
      <AdminAddActivity />
    </div>
  );
};

export default withAuth(Page);
