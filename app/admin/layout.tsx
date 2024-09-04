// "use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { helveticaNeue } from "../ui/fonts";
import "style/globals.css";
import Head from "next/head";
import AdminHeader from "../components/Header/AdminHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NYCU Admin",
  description: "Photonics Lab",
};
const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html className={helveticaNeue.className}>
      <Head>
        <title>Admin</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <div className="w-11/12 p-4 mx-auto">
          <AdminHeader />
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
