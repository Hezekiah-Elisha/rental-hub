"use client";
import SideNav from "@/components/SideNav";
import React from "react";
import Breadcrumbs from "@/components/Breadcumbs";

export default function layout({ children }) {
  return (
    <div className="flex flex-row">
      <SideNav />
      <div className="p-5 w-full">
        <Breadcrumbs />
        {children}
      </div>
    </div>
  );
}
