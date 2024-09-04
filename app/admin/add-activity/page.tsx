"use client";

import AdminAddActivity from "@/app/components/Activities/AdminAddActivity";
import { fetchData } from "@/src/services/dataService";
import React, { useEffect, useState } from "react";

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

export default Page;
